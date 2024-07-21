const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const cardSchema = new mongoose.Schema({
  name: String,
  date: String,
});

const Card = mongoose.model('Card', cardSchema);

const mongoURI = "mongodb+srv://hassan:KRgWqofng5lMtGgw@vpn-customers.g7s1zv1.mongodb.net/?retryWrites=true&w=majority&appName=vpn-customers"; // Replace with your actual connection string

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.get('/cards', async (req, res) => {
  const cards = await Card.find();
  res.json(cards);
});

app.post('/cards', async (req, res) => {
  const newCard = new Card(req.body);
  await newCard.save();
  res.json(newCard);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
