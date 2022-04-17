const Sequelize = require('sequelize');
const { DBURI } = require('./config.json');
const wienieWordle = require('./record/wienieWordle');
const rasWordle = require('./record/rasWordle');
const wienieKatla = require('./record/wienieKatla');
const rasKatla = require('./record/rasKatla');
const wienieNerdle = require('./record/wienieNerdle');
const rasNerdle = require('./record/rasNerdle');
const wienieMini = require('./record/wienieMini');
const rasMini = require('./record/rasMini');
const wienieMathler = require('./record/wienieMathler');
const rasMathler = require('./record/rasMathler');

// const sequelize = new Sequelize('ribot', DBUSER, DBPASS, {
//     host: DBHOST,
//     port: 5432,
//     dialect: 'postgres',
//     logging: console.log,
//     ssl: true,
// });

const sequelize = new Sequelize(DBURI, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    }
});

const today = new Date();
const todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

const user = require('./model/User')(sequelize, Sequelize.DataTypes);
const wordle = require('./model/Wordle')(sequelize, Sequelize.DataTypes);
const katla = require('./model/Katla')(sequelize, Sequelize.DataTypes);
const nerdle = require('./model/Nerdle')(sequelize, Sequelize.DataTypes);
const mini = require('./model/Mini')(sequelize, Sequelize.DataTypes);
const mathler = require('./model/Mathler')(sequelize, Sequelize.DataTypes);

user.hasOne(wordle);
user.hasOne(katla);
user.hasOne(nerdle);
user.hasOne(mini);
user.hasOne(mathler);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
    const addUser = [
        user.upsert({
            id: '548141585217486848',
            name: 'Wienie',
        }),
        user.upsert({
            id: '706218764588417066',
            name: 'Ras',
        })
    ]

    const addWordle = [
        wordle.upsert(wienieWordle(todayDate)),
        wordle.upsert(rasWordle(todayDate))
    ]

    const addKatla = [
        katla.upsert(wienieKatla(todayDate)),
        katla.upsert(rasKatla(todayDate))
    ]

    const addNerdle = [
        nerdle.upsert(wienieNerdle(todayDate)),
        nerdle.upsert(rasNerdle(todayDate))
    ]

    const addMini = [
        mini.upsert(wienieMini(todayDate)),
        mini.upsert(rasMini(todayDate))
    ]

    const addMathler = [
        mathler.upsert(wienieMathler(todayDate)),
        mathler.upsert(rasMathler(todayDate))
    ]

    await Promise.all(addUser, addWordle, addKatla, addNerdle, addMini, addMathler);
    console.log('DB synced');

    sequelize.close();
}).catch(console.error);