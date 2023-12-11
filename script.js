const game = function() {

    const Figure = function(w = 0, h = 0, r = 0, c = '#000') {
        this.w = w;
        this.h = h;
        this.r = r;
        this.c = c;

        this.create = function() {
            let elem = document.createElement('div');
            elem.style = `display: inline-block; width: ${this.w}px; height: ${this.h}px; border-radius: ${this.r}px; background-color: ${this.c};`;

            return elem;
        };
    };

    const random = function(min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    }

    const addFigure = function() {

        let w = 250;
        let h = 150;
        let r = 10;

        // let w = random(1, 100);
        // let h = random(1, 100);
        // let r = random(0, 100);

        let cCh = ['green', 'red', 'purple', 'brown', 'pink',  'yellow', 'blue', 'orange', 'grey', 'black'];
        let c = cCh[random(0, cCh.length-1)];

        let fig = new Figure(w, h, r, c);
        figElem = fig.create();
    };

    const figuresPlay = function() {

        for (let i=1; i <= 3; i++) {
            addFigure();
            dataFigures.push(figElem);
            figElem.classList.add('play__fig');
            playField.append(figElem);
        }
    };

    const show = function() {
        figuresPlay();

        figElemShow = dataFigures[random(0, dataFigures.length-1)];

        cloneElemShow = figElemShow.cloneNode(true);
        playShow.append(cloneElemShow);

    };

    const select = function() {
        dataFigures.forEach(function(figElem) {
            figElem.addEventListener('click', function(event) {

                let figEvent = event.target;

                let countTrue = +countTrueElem.innerHTML;
                let countErrors = +countErrElem.innerHTML;

                if (figEvent.isEqualNode(cloneElemShow) == true) {
                    trueElem();
                    countTrue++;
                } else {
                    errorsElem();
                    countErrors++;
                };

                countTrueElem.innerHTML = countTrue;
                countErrElem.innerHTML = countErrors;

            });
        });
    };

    const trueElem = function() {
        gameContainer.innerHTML = '';
        gameContainer.style = `background: white url(/img/bg_true.gif) no-repeat center; width: 540px; position: relative;`;

        btnContinueCreat();

        // setTimeout(gameContinue, 3000);

        btnContinue.addEventListener('click', function() {
            gameContinue();
        });
    };

    const errorsElem = function() {
        gameContainer.innerHTML = '';
        gameContainer.style = `background: white url(/img/bg_error.jpg) no-repeat center; width: 500px; position: relative;`;

        btnContinueCreat();

        // setTimeout(gameContinue, 3000);

        btnContinue.addEventListener('click', function() {
            gameContinue();
        });
    };

    const btnContinueCreat = function() {
        btnContinue = document.createElement('button');
        btnContinue.classList.add('btn__continue');
        btnContinue.innerHTML = '>';
        gameContainer.append(btnContinue);
    };

    const gameContinue = function() {
        gameContainer.style = '';
        playShow.innerHTML ='';
        playField.innerHTML ='';
        dataFigures = [];
        gameContainer.append(playShow);
        gameContainer.append(playField);
        addFigure();
        show();
        select();
    };

    btnPlay.addEventListener('click', function() {
        gameContainer.innerHTML = '';
        gameContainer.append(playShow);
        gameContainer.append(playField);
        addFigure();
        show();
        select();
    });
};

let figElem;
let cloneElemShow;
let btnContinue;

let gameDiv = document.querySelector('.game');

let gameContainer = gameDiv.querySelector('.game__container');

let btnPlay = gameContainer.querySelector('.btn__play');

let countErrElem = gameDiv.querySelector('.game__counter .errors');
let countTrueElem = gameDiv.querySelector('.game__counter .true');

let dataFigures = [];

let playShow = document.createElement('div');
playShow.classList.add('play__show');

let playField = document.createElement('div');
playField.classList.add('play__field');

window.addEventListener('load', function() {
    game();
});