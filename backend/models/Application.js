const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, enum: ['Applied', 'Interview', 'Offer', 'Rejected'], required: true },
  dateOfApplication: { type: Date, required: true },
  link: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);