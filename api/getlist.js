// api/getlist.js

const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://hassan:KRgWqofng5lMtGgw@vpn-customers.g7s1zv1.mongodb.net/?retryWrites=true&w=majority&appName=vpn-customers";

exports.handler = async function(event, context) {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const collection = client.db('customers').collection('vpn');
    
    const users = await collection.find({}).toArray();
    
    await client.close();
    
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allow specific methods
        "Access-Control-Allow-Headers": "Content-Type" // Allow specific headers
      },
      body: JSON.stringify(users)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ error: 'Failed to fetch data' })
    };
  }
};
