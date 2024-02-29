const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const sellerRoutes = require('./routes/sellerRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017/authdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Mount routes
app.use('/admin', adminRoutes);
app.use('/seller', sellerRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
