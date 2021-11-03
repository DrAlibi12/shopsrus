const db = require('../database/sequelize');
const Op = require('sequelize').Op;
const VWClientService = require('../services/VWClientService');

class InvoiceService {
    validateInvoice(invoice) {
        const result = {
            ok: true,
            message: ''
        };
        if (!invoice.id_cliente) {
            result.ok = false;
            result.message = 'La factura no tiene un cliente asociado.';
        } else if (!invoice.fecha_compra) {
            result.ok = false;
            result.message = 'Se requiere fecha de compra.';
        } else if (!invoice.productos || invoice.productos.length == 0) {
            result.ok = false;
            result.message = 'La factura no tiene productos.';
        }
        
        return result;
    }

    async getFinalPrice(invoice) {
        const invoiceStatus = this.validateInvoice(invoice);
        if (!invoiceStatus.ok) {
            const error = new Error(`Factura inválida: ${invoiceStatus.message}`);
            error.status = 400;
            throw error;
        }

        let cliente;
        try {
            cliente = await VWClientService.getSingleVWClientById(invoice.id_cliente);
            if (!cliente) {
                throw new Error('Error obteniendo cliente');
            }
        } catch (error) {
            const err = new Error(error.message);
            err.status = 500;
            throw err;
        } 

        let totalNoComestibles = 0;
        let totalComestibles = 0;
        let precioFinal = 0;

        let producto;
        let precio;
        for (var i=0; i < invoice.productos.length; i++) {
            producto = invoice.productos[i];
            console.log(producto);
            precio = (producto.precio) ? producto.precio : 0;
            if (producto.es_comestible) {
                totalComestibles += precio;
            } else {
                totalNoComestibles += precio;
            }
        }

        console.log(cliente.es_afiliado);

        const where = {
/*            [Op.or]: [
                { para_afiliados: cliente.es_afiliado },
                { para_afiliados: false }
            ],
            [Op.or]: [
                { para_empleados: cliente.es_empleado },
                { para_empleados: false }
            ],
            */
            [Op.and]: [
                {
                    [Op.or]: [
                        { para_afiliados: { [Op.eq]: cliente.es_afiliado } },
                        { para_afiliados: { [Op.eq]: false } }
                    ],
                },
                {
                    [Op.or]: [
                        { para_empleados: { [Op.eq]: cliente.es_empleado } },
                        { para_empleados: { [Op.eq]: false } }
                    ],
                }
            ],
            min_anios_cliente: {
                [Op.lte]: cliente.anios_cliente
            },
            es_porcentaje: true
        };
 
        let descuentoPorcentaje;
        let porcentaje = 0;
        try {
            const findDescuentoPorcentaje = await db.Discount.findOne({
                where,
                order: [
                    ['descuento', 'DESC']
                ]
            });
            if (findDescuentoPorcentaje) {
                descuentoPorcentaje = findDescuentoPorcentaje;
                porcentaje = findDescuentoPorcentaje.descuento;
            }
        } catch (error) {
            console.log(error);
            const err = new Error('Error buscando porcentaje de descuento');
            err.status = 500;
            throw err;
        }

        where.es_porcentaje = false;
        let otrosDescuentos = [];
        try {
            const findOtrosDescuentos = await db.Discount.findAll({
                where,
                order: [
                    ['descuento', 'DESC']
                ]
            });
            if (findOtrosDescuentos) {
                console.log(findOtrosDescuentos);
                otrosDescuentos = findOtrosDescuentos;
            }
        } catch (error) {
            console.log(error);
            const err = new Error('Error buscando otros descuentos');
            err.status = 500;
            throw err;
        }

        const totalSinDescuentos = totalComestibles + totalNoComestibles;

        // Aplica descuento de porcentaje sobre el monto total de los productos NO comestibles 
        const descuentoNoComestibles = (totalNoComestibles * porcentaje / 100)
        precioFinal = totalSinDescuentos - descuentoNoComestibles;

        // Aplica descuentos específicos
        let descuento;
        for (var i=0; i < otrosDescuentos.length; i++) {
            if (otrosDescuentos[i].descuento_cada > precioFinal) {
                continue;
            }
            console.log(otrosDescuentos[i]);
            descuento = Math.floor(precioFinal / otrosDescuentos[i].descuento_cada) * otrosDescuentos[i].descuento;
            precioFinal -= descuento;
        }

        let descuentosAplicados = [];

        if (descuentoPorcentaje) {
            console.log("PORCENTAJE");
            descuentosAplicados.push(descuentoPorcentaje)
        }
        if (otrosDescuentos) {
            console.log("OTROS");
            descuentosAplicados = descuentosAplicados.concat(otrosDescuentos);
        }

        return {
            cliente,
            totalComestibles,
            totalNoComestibles,
            totalSinDescuentos,
            descuentosAplicados,
            precioFinal 
        };
    }
}

module.exports = new InvoiceService();