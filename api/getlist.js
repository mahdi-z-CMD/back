// /api/getUsers.js

const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://hassan:KRgWqofng5lMtGgw@vpn-customers.g7s1zv1.mongodb.net/?retryWrites=true&w=majority&appName=vpn-customers";
const client = new MongoClient(uri);

exports.handler = async function(event, context) {
  try {
    await client.connect();
    const database = client.db('customers');
    const collection = database.collection('vpn');
    
    const users = await collection.find({}).toArray();
    
    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch users' }),
    };
  } finally {
    await client.close();
  }
};
