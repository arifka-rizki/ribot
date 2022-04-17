let arif = { 
    wordle: {
        played: 33,
        countWin: function() {return this.t1 + this.t2 + this.t3 + this.t4 + this.t5 + this.t6},
        countLose: function() {return this.played - this.countWin()},
        countWinRate: function() {return Math.round((this.countWin()/this.played) * 100)},
        t1: 0,
        t2: 0,
        t3: 3,
        t4: 11,
        t5: 12,
        t6: 4
    },
    katla: {
        played: 32,
        countWin: function() {return this.t1 + this.t2 + this.t3 + this.t4 + this.t5 + this.t6},
        countLose: function() {return this.played - this.countWin()},
        countWinRate: function() {return Math.round((this.countWin()/this.played) * 100)},
        t1: 0,
        t2: 1,
        t3: 2,
        t4: 16,
        t5: 7,
        t6: 3
    },
    mininerdle: {
        played: 17,
        countWin: function() {return this.t1 + this.t2 + this.t3 + this.t4 + this.t5 + this.t6},
        countLose: function() {return this.played - this.countWin()},
        countWinRate: function() {return Math.round((this.countWin()/this.played) * 100)},
        t1: 0,
        t2: 8,
        t3: 6,
        t4: 3,
        t5: 0,
        t6: 0
    },
    nerdle: {
        played: 16,
        countWin: function() {return this.t1 + this.t2 + this.t3 + this.t4 + this.t5 + this.t6},
        countLose: function() {return this.played - this.countWin()},
        countWinRate: function() {return Math.round((this.countWin()/this.played) * 100)},
        t1: 0,
        t2: 1,
        t3: 3,
        t4: 9,
        t5: 1,
        t6: 2
    },
}
let ras = { 
    wordle: {
        played: 38,
        countWin: function() {return this.t1 + this.t2 + this.t3 + this.t4 + this.t5 + this.t6},
        countLose: function() {return this.played - this.countWin()},
        countWinRate: function() {return Math.round((this.countWin()/this.played) * 100)},
        t1: 0,
        t2: 0,
        t3: 2,
        t4: 10,
        t5: 8,
        t6: 11
    },
    katla: {
        played: 33,
        countWin: function() {return this.t1 + this.t2 + this.t3 + this.t4 + this.t5 + this.t6},
        countLose: function() {return this.played - this.countWin()},
        countWinRate: function() {return Math.round((this.countWin()/this.played) * 100)},
        t1: 0,
        t2: 1,
        t3: 10,
        t4: 7,
        t5: 8,
        t6: 10
    },
    mininerdle: {
        played: 28,
        countWin: function() {return this.t1 + this.t2 + this.t3 + this.t4 + this.t5 + this.t6},
        countLose: function() {return this.played - this.countWin()},
        countWinRate: function() {return Math.round((this.countWin()/this.played) * 100)},
        t1: 0,
        t2: 6,
        t3: 23,
        t4: 4,
        t5: 0,
        t6: 0
    },
    nerdle: {
        played: 33,
        countWin: function() {return this.t1 + this.t2 + this.t3 + this.t4 + this.t5 + this.t6},
        countLose: function() {return this.played - this.countWin()},
        countWinRate: function() {return Math.round((this.countWin()/this.played) * 100)},
        t1: 0,
        t2: 1,
        t3: 12,
        t4: 11,
        t5: 4,
        t6: 3
    },
}

const checkSender = function (id){
    if(id === '548141585217486848') return 'arif';
    else if(id === '706218764588417066') return 'ras';
    else return 'unknown';
}

const inputScore = function (sender, game, score){
    if(sender === 'arif'){
        switch(game){
            case 'wordle':
                arif.wordle.played++
                if(score === 1) arif.wordle.t1++
                else if( score === 2) arif.wordle.t2++
                else if( score === 3) arif.wordle.t3++
                else if( score === 4) arif.wordle.t4++
                else if( score === 5) arif.wordle.t5++
                else if( score === 6) arif.wordle.t6++
                return arif.wordle;
                break;                
            case 'katla':
                arif.katla.played++
                if(score === 1) arif.katla.t1++
                else if( score === 2) arif.katla.t2++
                else if( score === 3) arif.katla.t3++
                else if( score === 4) arif.katla.t4++
                else if( score === 5) arif.katla.t5++
                else if( score === 6) arif.katla.t6++
                return arif.katla;
                break;                
            case 'mininerdlegame':
                arif.mininerdle.played++
                if(score === 1) arif.mininerdle.t1++
                else if( score === 2) arif.mininerdle.t2++
                else if( score === 3) arif.mininerdle.t3++
                else if( score === 4) arif.mininerdle.t4++
                else if( score === 5) arif.mininerdle.t5++
                else if( score === 6) arif.mininerdle.t6++
                return arif.mininerdle;
                break;                
            case 'nerdlegame':
                arif.nerdle.played++
                if(score === 1) arif.nerdle.t1++
                else if( score === 2) arif.nerdle.t2++
                else if( score === 3) arif.nerdle.t3++
                else if( score === 4) arif.nerdle.t4++
                else if( score === 5) arif.nerdle.t5++
                else if( score === 6) arif.nerdle.t6++
                return arif.nerdle;
                break;                
        }
    } else if(sender === 'ras'){
        switch(game){
            case 'wordle':
                ras.wordle.played++
                if(score === 1) ras.wordle.t1++
                else if( score === 2) ras.wordle.t2++
                else if( score === 3) ras.wordle.t3++
                else if( score === 4) ras.wordle.t4++
                else if( score === 5) ras.wordle.t5++
                else if( score === 6) ras.wordle.t6++
                return ras.wordle;
                break;                
            case 'katla':
                ras.katla.played++
                if(score === 1) ras.katla.t1++
                else if( score === 2) ras.katla.t2++
                else if( score === 3) ras.katla.t3++
                else if( score === 4) ras.katla.t4++
                else if( score === 5) ras.katla.t5++
                else if( score === 6) ras.katla.t6++
                return ras.katla;
                break;                
            case 'mininerdlegame':
                ras.mininerdle.played++
                if(score === 1) ras.mininerdle.t1++
                else if( score === 2) ras.mininerdle.t2++
                else if( score === 3) ras.mininerdle.t3++
                else if( score === 4) ras.mininerdle.t4++
                else if( score === 5) ras.mininerdle.t5++
                else if( score === 6) ras.mininerdle.t6++
                return ras.mininerdle;
                break;                
            case 'nerdlegame':
                ras.nerdle.played++
                if(score === 1) ras.nerdle.t1++
                else if( score === 2) ras.nerdle.t2++
                else if( score === 3) ras.nerdle.t3++
                else if( score === 4) ras.nerdle.t4++
                else if( score === 5) ras.nerdle.t5++
                else if( score === 6) ras.nerdle.t6++
                return ras.nerdle;
                break;                
        }
    }
}

module.exports = {
    arif,
    ras,
    checkSender,
    inputScore
}