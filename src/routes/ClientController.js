const ClientService = require('../services/ClientService');

class ClientController {
    router;
    clientsPath = '/clients';
    
    constructor(routes) {
        this.router = routes;
        this.registerRoutes();
    }
    registerRoutes() {
        this.router.get(this.clientsPath, this.getAllClients.bind(this));
        this.router.get(`${this.clientsPath}/singleById/:id`, this.getSingleClientById.bind(this));
        this.router.get(`${this.clientsPath}/singleByName/:name`, this.getSingleClientByName.bind(this));
        this.router.post(`${this.clientsPath}/register`, this.createClient.bind(this));
    }

    getAllClients(req, res) {
        ClientService
            .getAllClients()
            .then((response) => res.json(response))
            .catch((error) => res.status(error.status).send({
                message: error.message
            }));
    }

    getSingleClientById(req, res) {
        ClientService
            .getSingleClientById(req.params.id)
            .then((response) => res.json(response))
            .catch((error) => res.status(error.status).send({
                message: error.message
            }));
    }

    getSingleClientByName(req, res) {
        ClientService
            .getSingleClientByName(req.params.name)
            .then((response) => res.json(response))
            .catch((error) => res.status(error.status).send({
                message: error.message
            }));
    }

    createClient(req, res) {
        console.log(req.body);
        ClientService
            .createClient(req.body)
            .then((response) => res.json(response[0]))
            .catch((error) => res.status(error.status).send({
                message: error.message
            }));
    }

}

module.exports = ClientController;