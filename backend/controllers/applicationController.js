const Application = require('../models/Application');

exports.createApplication = async (req, res) => {
  const application = new Application({ ...req.body, userId: req.user.id });
  await application.save();
  res.status(201).json(application);
};

exports.getApplications = async (req, res) => {
  const applications = await Application.find({ userId: req.user.id });
  res.json(applications);
};

exports.updateApplication = async (req, res) => {
  const application = await Application.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  if (!application) return res.status(404).json({ message: 'Application not found' });
  res.json(application);
};

exports.deleteApplication = async (req, res) => {
  const application = await Application.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!application) return res.status(404).json({ message: 'Application not found' });
  res.json({ message: 'Application deleted' });
};