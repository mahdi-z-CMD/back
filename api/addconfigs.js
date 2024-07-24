const { MongoClient } = require('mongodb');

exports.handler = async function (event, context) {
  const uri = 'mongodb+srv://hassan:KRgWqofng5lMtGgw@vpn-customers.g7s1zv1.mongodb.net/?retryWrites=true&w=majority&appName=vpn-customers';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { email, config, used } = JSON.parse(event.body);

    await client.connect();
    const database = client.db('vpn-customers'); // Replace with your database name
    const collection = database.collection('configs');

    const newConfig = {
      email,
      config,
      used,
    };

    const result = await collection.insertOne(newConfig);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: result.insertedId }),
    };
  } catch (error) {
    console.error('Error adding config:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to add config' }),
    };
  } finally {
    await client.close();
  }
};
