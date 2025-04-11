const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log('Registered user:', username, 'Token:', token); // Debug
    res.status(201).json({ token });
  } catch (error) {
    console.error('Registration error:', error); // Debug
    res.status(400).json({ message: 'Username already taken' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      console.log('Invalid credentials for username:', username); // Debug
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log('Logged in user:', username, 'Token:', token); // Debug
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error); // Debug
    res.status(400).json({ message: 'Invalid credentials' });
  }
};