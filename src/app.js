const express = require('express');
const port = 3000;
const router = require('./router.js');

const app = express();

// Body parsing
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

// Routes
app.use('/api/v1', router);

// Run the app
app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 
