const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken library
const Seller = require('../models/sellerModel');
const secretKey = 'your-secret-key'; // Make sure to use the same secret key as in your adminController.js
const saltRounds = 10;

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const seller = await Seller.findOne({ username, role: 'seller' });

    if (!seller) {
      console.log('Invalid credentials: seller not found');
      return res.status(401).send('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, seller.password);

    if (!passwordMatch) {
      console.log('Invalid credentials: password not match');
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ username, role: 'seller' }, secretKey);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
