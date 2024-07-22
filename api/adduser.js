// netlify/functions/adduser.js

exports.handler = async (event, context) => {
    // Handle preflight OPTIONS request
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
  
    // Handle POST request
    if (event.httpMethod === 'POST') {
      try {
        const { email, date, telegramId } = JSON.parse(event.body);
  
        // Your existing code to handle adding the user
        const result = await addUserToDatabase(email, date, telegramId);
  
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
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'An error occurred' }),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        };
      }
    }
  
    // Default response for unsupported HTTP methods
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
  