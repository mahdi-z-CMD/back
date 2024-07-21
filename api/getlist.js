const express = require('express');
const { MongoClient } = require('mongodb');

// Connection URI
const uri = "mongodb+srv://hassan:KRgWqofng5lMtGgw@vpn-customers.g7s1zv1.mongodb.net/vpn-customers?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = process.env.PORT || 3000;

// Middleware to handle JSON requests
app.use(express.json());

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

// API endpoint to get all users
app.get('/api/users', async (req, res) => {
  try {
    const database = client.db('vpn-customers');
    const collection = database.collection('vpn');
    const users = await collection.find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectToDatabase();
});
