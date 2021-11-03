const express = require('express');
const ClientController = require('./routes/ClientController');
const DiscountController = require('./routes/DiscountController');
const InvoiceController = require('./routes/InvoiceController');
const router = express.Router();

// All controller routes
new ClientController(router);
new DiscountController(router);
new InvoiceController(router);


module.exports = router;