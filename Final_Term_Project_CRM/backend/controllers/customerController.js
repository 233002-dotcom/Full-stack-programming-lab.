const Customer = require('../models/Customer');

// @desc    Get all customers (with search & filter)
// @route   GET /api/customers
// @access  Private
const getCustomers = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 50 } = req.query;

    let query = {};

    // Status filter
    if (status && ['Lead', 'Active', 'Inactive'].includes(status)) {
      query.status = status;
    }

    // Search by name, email, or company
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Customer.countDocuments(query);
    const customers = await Customer.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: customers.length,
      total,
      customers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single customer
// @route   GET /api/customers/:id
// @access  Private
const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    res.status(200).json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new customer
// @route   POST /api/customers
// @access  Private
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, company, status, address, notes } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Name, email, and phone are required' });
    }

    const existing = await Customer.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A customer with this email already exists' });
    }

    const customer = await Customer.create({
      name, email, phone, company, status, address, notes,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, message: 'Customer created successfully', customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update customer
// @route   PUT /api/customers/:id
// @access  Private
const updateCustomer = async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: 'Customer updated successfully', customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete customer
// @route   DELETE /api/customers/:id
// @access  Private
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    await customer.deleteOne();
    res.status(200).json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get customer stats
// @route   GET /api/customers/stats
// @access  Private
const getCustomerStats = async (req, res) => {
  try {
    const total = await Customer.countDocuments();
    const leads = await Customer.countDocuments({ status: 'Lead' });
    const active = await Customer.countDocuments({ status: 'Active' });
    const inactive = await Customer.countDocuments({ status: 'Inactive' });

    res.status(200).json({
      success: true,
      stats: { total, leads, active, inactive },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer, getCustomerStats };
