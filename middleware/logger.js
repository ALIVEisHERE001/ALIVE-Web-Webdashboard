// Logging Middleware
const fs = require('fs');
const path = require('path');

function logger(req, res, next) {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        const log = {
            method: req.method,
            path: req.path,
            status: res.statusCode,
            duration: `${duration}ms`,
            timestamp: new Date().toISOString()
        };
        
        console.log(JSON.stringify(log));
        
        // Optional: Write to file
        const logFile = path.join(__dirname, '..', 'logs', 'access.log');
        fs.appendFileSync(logFile, JSON.stringify(log) + '\n');
    });
    
    next();
}

module.exports = logger;
