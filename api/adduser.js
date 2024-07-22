const { MongoClient } = require('mongodb');

// Replace with your MongoDB URI
const uri = 'mongodb+srv://hassan:KRgWqofng5lMtGgw@vpn-customers.g7s1zv1.mongodb.net/?retryWrites=true&w=majority&appName=vpn-customers';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  const { email, date, telegramId } = JSON.parse(event.body);

  if (!email || !date) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Email and Date are required' }),
    };
  }

  try {
    await client.connect();
    const database = client.db('customers'); // Updated database name
    const collection = database.collection('vpn');

    const newUser = {
      email,
      date,
      telegramId: telegramId || null,
    };

    const result = await collection.insertOne(newUser);

    return {
      statusCode: 201,
      body: JSON.stringify(result),
      headers: {
        'Content-Type': 'application/json',
      },
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
