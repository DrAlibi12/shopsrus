const DiscountModel = (connection, Sequelize) => {
    const Discount = connection.define('Descuento', {
        id_descuento: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: Sequelize.STRING,
        descuento: Sequelize.FLOAT,
        descuento_cada: Sequelize.FLOAT,
        es_porcentaje: Sequelize.BOOLEAN,
        para_afiliados: Sequelize.BOOLEAN,
        para_empleados: Sequelize.BOOLEAN,
        min_anios_cliente: Sequelize.INTEGER
    }, {
        timestamps: false,
        paranoid: false,
        underscored: true,
        tableName: 'descuento'
    });
    return Discount;
}

module.exports = DiscountModel;