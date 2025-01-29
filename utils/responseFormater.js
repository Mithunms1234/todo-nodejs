module.exports = ( message, error, data) => {
    return {
        message: message || 'Something went wrong',
        error: error || '',
        data: data || null
    };
  
};