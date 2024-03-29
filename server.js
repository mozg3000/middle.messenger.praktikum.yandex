const express = require('express');
const PORT = process.env.PORT || 3000;
const server = express();

server.use(express.static('./dist'));
server.get("/:slug", function(req,res) {
  res.sendFile(__dirname + '/dist/index.html');
})

server.listen(PORT, (req, res) => {
    console.log('Start listening on port 3000')
})
