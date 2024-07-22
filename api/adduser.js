// netlify/functions/adduser.js
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

        // Replace this with your actual database logic
        const result = await addUserToDatabase(email, date, telegramId);
        console.log('Database result:', result); // Log database result

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

// Example function to simulate database insertion
const addUserToDatabase = async (email, date, telegramId) => {
    // Replace with actual database logic
    return { insertedId: 'exampleId' }; // Simulate an inserted ID
};
