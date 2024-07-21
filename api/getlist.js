const { MongoClient } = require('mongodb');

// Replace with your MongoDB URI
const uri = "mongodb+srv://hassan:KRgWqofng5lMtGgw@vpn-customers.g7s1zv1.mongodb.net/?retryWrites=true&w=majority&appName=vpn-customers";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async (event) => {
  try {
    await client.connect();
    const database = client.db('customers'); // Replace with your database name
    const collection = database.collection('vpn'); // Replace with your collection name
    const users = await collection.find({}).toArray();
    
    return {
      statusCode: 200,
      body: JSON.stringify(users),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve users' }),
    };
  } finally {
    await client.close();
  }
};
