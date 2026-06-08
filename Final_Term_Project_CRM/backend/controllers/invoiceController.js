const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate('customer', 'name email company')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: invoices.length, invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single invoice
// @route   GET /api/invoices/:id
// @access  Private
const getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('customer', 'name email company phone address');
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    res.status(200).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create invoice
// @route   POST /api/invoices
// @access  Private
const createInvoice = async (req, res) => {
  try {
    const { customerId, services, tax, dueDate, notes } = req.body;

    if (!customerId || !services || services.length === 0) {
      return res.status(400).json({ success: false, message: 'Customer and at least one service are required' });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    // Calculate totals
    const servicesWithTotal = services.map((s) => ({
      ...s,
      total: s.quantity * s.unitPrice,
    }));
    const subtotal = servicesWithTotal.reduce((sum, s) => sum + s.total, 0);
    const taxAmount = (subtotal * (tax || 0)) / 100;
    const totalAmount = subtotal + taxAmount;

    const invoice = await Invoice.create({
      customer: customerId,
      services: servicesWithTotal,
      subtotal,
      tax: tax || 0,
      totalAmount,
      dueDate,
      notes,
      createdBy: req.user._id,
    });

    // Update customer totalSpent
    await Customer.findByIdAndUpdate(customerId, { $inc: { totalSpent: totalAmount } });

    const populated = await invoice.populate('customer', 'name email company');
    res.status(201).json({ success: true, message: 'Invoice created successfully', invoice: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update invoice status
// @route   PUT /api/invoices/:id
// @access  Private
const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    }).populate('customer', 'name email company');
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    res.status(200).json({ success: true, message: 'Invoice updated', invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
// @access  Private
const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    await invoice.deleteOne();
    res.status(200).json({ success: true, message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get invoice stats
// @route   GET /api/invoices/stats
// @access  Private
const getInvoiceStats = async (req, res) => {
  try {
    const total = await Invoice.countDocuments();
    const paid = await Invoice.countDocuments({ status: 'Paid' });
    const pending = await Invoice.countDocuments({ status: 'Sent' });
    const overdue = await Invoice.countDocuments({ status: 'Overdue' });
    const revenueResult = await Invoice.aggregate([
      { $match: { status: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;
    res.status(200).json({ success: true, stats: { total, paid, pending, overdue, totalRevenue } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getInvoices, getInvoice, createInvoice, updateInvoice, deleteInvoice, getInvoiceStats };
