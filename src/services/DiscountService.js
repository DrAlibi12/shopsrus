const db = require('../database/sequelize');

class DiscountService {
    validateDiscount(payload) {
        if (!payload.nombre) return false;

        if (!payload.descuento ||
            (!payload.es_porcentaje && !payload.descuento_cada)) {
            return false;
        }

        return true;
    }

    getAllDiscounts() {
        return db.Discount.findAndCountAll();
    }
    
    async getSingleDiscountById(discountId) {
        if (!discountId || discountId <= 0) {
            const error = new Error('Ingrese un id válido');
            error.status = 400;
            throw error;
        }
        try {
            const where = { id_descuento: discountId };
            const discount = await db.Discount.findOne({
                where
            });
            if (!discount) {
                throw new Error('No se pudo obtener el descuento');
            }
            return discount;
        } catch (error) {
            const err = new Error(error.message);
            err.status = 500;
            throw err;
        }
    }

    async createDiscount(payload) {
        if (!this.validateDiscount(payload)) {
            const error = new Error('No puede crearse el descuento');
            error.status = 400;
            throw error;
        }

        const discount = {
            nombre: payload.nombre,
            descuento: (payload.descuento) ? payload.descuento : 0,
            descuento_cada: (payload.descuento_cada) ? payload.descuento_cada : 0,
            es_porcentaje: (payload.es_porcentaje) ? true : false,
            para_afiliados: (payload.para_afiliados) ? true : false,
            para_empleados: (payload.para_empleados) ? true : false,
            min_anios_cliente: (payload.min_anios_cliente) ? payload.min_anios_cliente : 0
        };

        return db.Discount.create(discount)
            .then((result) => Promise.all([this.getSingleDiscountById(result.id_descuento)]))
            .catch((err) => Promise.reject(err));
    }
}

module.exports = new DiscountService();