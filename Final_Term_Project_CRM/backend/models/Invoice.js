const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true },
});

const InvoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      unique: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Customer is required'],
    },
    services: {
      type: [ServiceSchema],
      validate: {
        validator: (v) => v.length > 0,
        message: 'At least one service is required',
      },
    },
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Draft', 'Sent', 'Paid', 'Overdue'],
      default: 'Draft',
    },
    dueDate: { type: Date },
    notes: { type: String, default: '' },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// Auto-generate invoice number before saving
InvoiceSchema.pre('save', async function (next) {
  if (!this.invoiceNumber) {
    const count = await mongoose.model('Invoice').countDocuments();
    this.invoiceNumber = `INV-${String(count + 1001).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
