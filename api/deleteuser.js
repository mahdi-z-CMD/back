// netlify/functions/deleteuser.js

exports.handler = async (event, context) => {
    // Handle OPTIONS request for CORS preflight
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      };
    }
  
    if (event.httpMethod === 'DELETE') {
      try {
        const { id } = JSON.parse(event.body);
  
        // Replace this with your actual database logic
        const result = await deleteUserFromDatabase(id);
        return {
          statusCode: 200,
          body: JSON.stringify({ deletedId: result.deletedId }),
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        };
      } catch (error) {
        console.error('Error:', error); // Log errors
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Internal Server Error' }),
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        };
      }
    }
  
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  };
  
  // Example function to simulate database deletion
  const deleteUserFromDatabase = async (id) => {
    // Replace with actual database logic
    return { deletedId: id };
  };
  