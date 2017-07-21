if (process.env.NODE_ENV === 'dev') require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');
const mailer = require('nodemailer').createTransport({
  pool: true,
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/', (req, res) => {
  const { email, message } = req.body;
  if (typeof email !== 'string') return res.status(422).json({ message: 'Invalid Email' });
  if (typeof message !== 'string') return res.status(422).json({ message: 'Invalid Message' });
  mailer.sendMail({
    from: process.env.EMAIL,
    to: 'wassup@orende.io',
    subject: 'Message from orende.io Contact Form',
    text: `
      Email: ${email}
      Message: ${message}
    `
  }, (err) => {
    if (err) return res.status(500).json({ message: 'Mailer Error! Try Again Later!' });
    res.status(200).json({});
  });
});

app.use('*', (req, res) => {
  res.status(404).send('Page not found!');
});

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log('UP AND RUNNING @', process.env.PORT);
});