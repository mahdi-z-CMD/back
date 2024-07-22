const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = 'YOUR_MONGODB_CONNECTION_STRING';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async (event, context) => {
    console.log('Received event:', event); // Log the entire event

    // Handle OPTIONS request for CORS preflight
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      };
    }

    if (event.httpMethod === 'POST') {
      try {
        const { email, date, telegramId } = JSON.parse(event.body);
        console.log('Parsed data:', { email, date, telegramId });

        await client.connect();
        const database = client.db('yourDatabaseName');
        const collection = database.collection('yourCollectionName');

        // Insert the user data into the database
        const result = await collection.insertOne({ email, date, telegramId });
        console.log('Database result:', result);

        return {
          statusCode: 200,
          body: JSON.stringify({ insertedId: result.insertedId }),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        };
      } catch (error) {
        console.error('Error:', error); // Log errors
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Internal Server Error' }),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        };
      } finally {
        await client.close(); // Ensure the client is closed
      }
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  };
