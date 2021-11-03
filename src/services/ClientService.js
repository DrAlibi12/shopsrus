const db = require('../database/sequelize');

class ClientService {
    getAllClients() {
        return db.Client.findAndCountAll();
    }

    async getSingleClient(where) {
        let client;
        try {
            client = await db.Client.findOne({
                where
            });
            if (!client) {
                throw new Error('No se pudo obtener el cliente');
            }
            return client
        } catch (error) {
            const err = new Error(error.message);
            err.status = 500;
            throw err;
        }
    }

    async getSingleClientById(clientId) {
        if (!clientId || clientId <=0) {
            const error = new Error('Ingrese un id válido');
            error.status = 400;
            throw error;
        }
        const where = { id_cliente: clientId };
        return this.getSingleClient(where);
    }

    async getSingleClientByName(clientName) {
        if (!clientName) {
            const error = new Error('Ingrese un nombre válido');
            error.status = 400;
            throw error;
        }
        const where = { nombre: clientName };
        return this.getSingleClient(where);
    }

    async createClient(payload) {
        if (!payload.nombre) {
            const error = new Error('No puede crearse el cliente');
            error.status = 400;
            throw error;
        }

        const today = new Date().toISOString().slice(0, 10);

        const client = {
            nombre: payload.nombre,
            es_empleado: (payload.es_empleado) ? true : false,
            es_afiliado: (payload.es_afiliado) ? true : false,
            fecha_alta: today
        };

        return db.Client.create(client)
            .then((result) => Promise.all([this.getSingleClientById(result.id_cliente)]))
            .catch((err) => Promise.reject(err));
    }
}

module.exports = new ClientService();