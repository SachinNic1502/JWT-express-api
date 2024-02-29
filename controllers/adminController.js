const User = require('../models/userModel');
const Seller = require('../models/sellerModel');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log('Attempting to find user:', username);
        const user = await User.findOne({ username, role: 'admin' });

        console.log('User found:', user);

        if (!user) {
            console.log('Invalid credentials: user not found');
            return res.status(401).send('Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            console.log('Invalid credentials: password not match');
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ username, role: 'admin' }, secretKey);
        console.log('Login successful');
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
exports.addSeller = async (req, res) => {
    try {
      const {
        username, password,
        shopName, ownerName, mobileNo, altMobile, email,
        place, tal, dist, state, pinCode, country,
        gstNo, shopActLicense, bankDetails,
        panCardNo, udyamAadhar, udyogAadhar, aadharDetails
      } = req.body;
  
      // Ensure only admins can add sellers
      if (req.user.role !== 'admin') {
        return res.sendStatus(403); // Forbidden
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newSeller = new Seller({
        username,
        password: hashedPassword,
        role: 'seller',
        shopName, ownerName, mobileNo, altMobile, email,
        place, tal, dist, state, pinCode, country,
        gstNo, shopActLicense, bankDetails,
        panCardNo, udyamAadhar, udyogAadhar, aadharDetails
      });
  
      await newSeller.save();
  
      res.json({ message: 'Seller added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
exports.addAdmin = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newAdmin = new User({ username, password: hashedPassword, role: 'admin' });
      await newAdmin.save();
  
      res.json({ message: 'Admin added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
