// Error Handling Middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(status).json({
        error: {
            message,
            status,
            timestamp: new Date().toISOString()
        }
    });
}

function notFoundHandler(req, res, next) {
    res.status(404).json({
        error: {
            message: 'Route not found',
            status: 404,
            path: req.path
        }
    });
}

module.exports = { errorHandler, notFoundHandler };
