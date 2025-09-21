const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) =>{
    res.send("Hello depuis mon serveur Node.js en Docker");
});

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});