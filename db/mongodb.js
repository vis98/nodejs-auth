

const mongoose = require('mongoose');

//@Todo this is jst for assignement purpose in real project mongo and sql uri should be in secure value 
mongoose.connect('mongodb+srv://mishravishal958:2Ny5B9T4zPmwwCJD@cluster0.vfhxfv2.mongodb.net/'+'test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
