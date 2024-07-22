// netlify/functions/adduser.js

exports.handler = async (event, context) => {
    console.log('Received event:', event); // Log the event object for debugging
    
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
  
        // Log the data to ensure it's being parsed correctly
        console.log('Parsed data:', { email, date, telegramId });
  
        // Your existing code to handle adding the user
        const result = await addUserToDatabase(email, date, telegramId);
  
        // Log the result to verify the output
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
        console.error('Error occurred:', error); // Log the error for debugging
  
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
  