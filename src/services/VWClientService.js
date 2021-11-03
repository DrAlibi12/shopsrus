const db = require('../database/sequelize');

class VWClientService {
    async getSingleVWClient(where) {
        let client;
        try {
            client =  db.VWClient.findOne({
                where
            });
            if (!client) {
                throw new Error('No se pudo obtener el cliente');
            }
            return client;
        } catch (error) {
            const err = new Error(error.message);
            err.status = 500;
            throw err;
        }
    }

    async getSingleVWClientById(clientId) {
        if (!clientId || clientId <=0) {
            const error = new Error('Ingrese un id válido');
            error.status = 400;
            throw error;
        }
        const where = { id_cliente: clientId };
        return this.getSingleVWClient(where);
    }

    async getSingleVWClientByName(clientName) {
        if (!clientName) {
            const error = new Error('Ingrese un nombre válido');
            error.status = 400;
            throw error;
        }
        const where = { nombre: clientName };
        return this.getSingleVWClient(where);
    }
}

module.exports = new VWClientService();