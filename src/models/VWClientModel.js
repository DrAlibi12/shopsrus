const VWClientModel = (connection, Sequelize) => {
    const VWCliente = connection.define('VWCliente', {
        id_cliente: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: Sequelize.STRING,
        fecha_alta: Sequelize.DATE,
        es_empleado: Sequelize.BOOLEAN,
        es_afiliado: Sequelize.BOOLEAN,
        anios_cliente: Sequelize.INTEGER
    }, {
        timestamps: false,
        paranoid: false,
        underscored: true,
        tableName: 'vw_cliente'
    });
    return VWCliente;
}

module.exports = VWClientModel;