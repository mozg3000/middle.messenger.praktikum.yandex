const express = require('express');
const PORT = process.env.PORT || 3000;
const server = express();

server.use(express.static('./dist'));

server.listen(PORT, (req, res) => {
    console.log('Start listening on port 3000')
})
