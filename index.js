const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passport = require('passport');
const User = require('./model/user');
const session=require('express-session');
const errorHandler=require('./exceptions/errorHandling.middleware');
const InvalidCreds=require('./exceptions/invalidCreds.exception');
const MissingDataException = require('./exceptions/missingData.exception');
const authenticateMiddleware =require('./authentication.middleware')
require('./db/mongodb')
require('./auth')

const app = express();
app.use(express.json());
app.use(session({secret:'cats'}))
app.use(passport.initialize());
app.use(passport.session());







// User Registration
app.post('/register', async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log("Error",error)
    throw error;
  }
});

// User Login
app.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new MissingDataException('No such user');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new InvalidCreds('Invalid Credentials');
    }
    console.log("user._id",user._id)
    const token = jwt.sign({ userId: user._id }, 'secret@1998', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    next(error)
  }
});

// Authentication Middleware


// Protected Route Example
app.get('/profile', authenticateMiddleware, async (req, res) => {
  try {
    console.log("requId",req.Id)
    const user = await User.findById(req.userId);
    if (!user) {
        throw new MissingDataException('No such user');
    }

    res.json({ user: { email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/demoauth/:keyword',(req,res)=>{
    res.send(`<a href="/auth/${req.params.keyword}">Authenticate with ${req.params.keyword}</a?`)
})


app.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/success', failureRedirect: '/failure' }));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/success');
    }
);

app.get('/success',(req,res)=>{
    res.send('<p>success </p>')
})
app.get('/failure',(req,res)=>{
    res.send('<p>failure </p>')
})
app.use(errorHandler.errorHandlingMiddleware);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
