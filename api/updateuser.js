// netlify/functions/edituser.js

const { MongoClient, ObjectId } = require('mongodb'); // Adjust based on your database client

let database; // Database instance

// Connect to the database
const connectToDatabase = async () => {
  if (database) return database;
  
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    database = client.db(process.env.MONGODB_DB_NAME);
    return database;
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw new Error('Database connection error');
  }
};

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*', // Allow requests from any origin
    'Access-Control-Allow-Methods': 'PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204, // No content
      headers,
    };
  }

  if (event.httpMethod === 'PUT') {
    try {
      const { id, email, date, telegramId } = JSON.parse(event.body);
      const db = await connectToDatabase();

      const result = await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        { $set: { email, date, telegramId } }
      );

      if (result.modifiedCount > 0) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true }),
        };
      } else {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ success: false, message: 'User not found' }),
        };
      }
    } catch (error) {
      console.error('Error updating user:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, error: error.message }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ success: false, message: 'Method not allowed' }),
  };
};
