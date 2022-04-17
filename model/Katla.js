module.exports = (sequelize, dataTypes) => {
    return sequelize.define('katla', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
        },
        played: dataTypes.INTEGER,
        win: dataTypes.INTEGER,
        t1: dataTypes.INTEGER,
        t2: dataTypes.INTEGER,
        t3: dataTypes.INTEGER,
        t4: dataTypes.INTEGER,
        t5: dataTypes.INTEGER,
        t6: dataTypes.INTEGER,
        lastWin: dataTypes.DATEONLY,
        previousWin: dataTypes.BOOLEAN,
        winStreak: dataTypes.INTEGER,
        winStreakRecord: dataTypes.INTEGER,
    },{
        timestamps: false,
    });
}