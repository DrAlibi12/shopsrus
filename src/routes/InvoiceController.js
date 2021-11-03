const InvoiceService = require('../services/InvoiceService');


class InvoiceController {
    router;
    invoicesPath = '/invoices';
    
    constructor(routes) {
        this.router = routes;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post(`${this.invoicesPath}/finalPrice`, this.getFinalPrice.bind(this));
    }
    
    getFinalPrice(req, res) {
        InvoiceService
            .getFinalPrice(req.body)
            .then((response) => res.json(response))
            .catch((error) => res.status(error.status).send({
                message: error.message
            }));
    }
}

module.exports = InvoiceController;