const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://hassan:KRgWqofng5lMtGgw@vpn-customers.g7s1zv1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const { email, data, telegramId } = JSON.parse(event.body);

  try {
    await client.connect();
    const database = client.db('customers');
    const collection = database.collection('vpn');

    const newUser = { email, data, telegramId };
    await collection.insertOne(newUser);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User added successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to add user' }),
    };
  } finally {
    await client.close();
  }
};
