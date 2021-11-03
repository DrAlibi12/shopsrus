const ClientModel = (connection, Sequelize) => {
    const Cliente = connection.define('Cliente', {
        id_cliente: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: Sequelize.STRING,
        fecha_alta: Sequelize.DATE,
        es_empleado: Sequelize.BOOLEAN,
        es_afiliado: Sequelize.BOOLEAN
    }, {
        timestamps: false,
        paranoid: false,
        underscored: true,
        tableName: 'cliente'
    });
    return Cliente;
}

module.exports = ClientModel;