const Sequelize = require('sequelize');
const { DBURI } = require('../config.json');

const sequelize = new Sequelize(DBURI, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false
});

const User = require('../model/User')(sequelize, Sequelize.DataTypes);
const Wordle = require('../model/Wordle')(sequelize, Sequelize.DataTypes);
const Katla = require('../model/Katla')(sequelize, Sequelize.DataTypes);
const Nerdle = require('../model/Nerdle')(sequelize, Sequelize.DataTypes);
const Mini = require('../model/Mini')(sequelize, Sequelize.DataTypes);
const Mathler = require('../model/Mathler')(sequelize, Sequelize.DataTypes);

User.hasOne(Wordle);
User.hasOne(Katla);
User.hasOne(Nerdle);
User.hasOne(Mini);
User.hasOne(Mathler);

module.exports = { User, Wordle, Katla, Nerdle, Mini, Mathler }