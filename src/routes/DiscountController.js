const DiscountService = require('../services/DiscountService');

class DiscountController {
    router;
    discountsPath = '/discounts';
    
    constructor(routes) {
        this.router = routes;
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.get(this.discountsPath, this.getAllDiscounts.bind(this));
        this.router.get(`${this.discountsPath}/:id`, this.getSingleDiscount.bind(this));
        this.router.post(`${this.discountsPath}/add`, this.createDiscount.bind(this));
    }

    getAllDiscounts(req, res) {
        DiscountService
            .getAllDiscounts()
            .then((response) => res.json(response))
            .catch((error) => res.status(error.status).send({
                message: error.message
            }));
    }

    getSingleDiscount(req, res) {
        DiscountService
            .getSingleDiscountById(req.params.id)
            .then((response) => res.json(response))
            .catch((error) => res.status(error.status).send({
                message: error.message
            }));
    }

    createDiscount(req, res) {
        DiscountService
            .createDiscount(req.body)
            .then((response) => res.json(response[0]))
            .catch((error) => res.status(error.status).send({
                message: error
            }));
;
    }

}

module.exports = DiscountController;