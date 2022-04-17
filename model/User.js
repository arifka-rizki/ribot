module.exports = (sequelize, dataTypes) => {
    return sequelize.define('user', {
        id: {
            type: dataTypes.STRING,
            primaryKey: true,
        },
        name: dataTypes.STRING,
    },{
        timestamps: false,
    });
}