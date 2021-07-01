const titlePage = document.getElementById("titlePage");
const btnStart = document.querySelector(".btnStart");

const playPage = document.getElementById("playPage");
let score = document.querySelector(".score");
let setTime = document.querySelector(".setTime");
let num1 = document.querySelector(".num1");
let num2 = document.querySelector(".num2");
let questionSign = document.querySelector(".questionSign");
let answerSheet = document.querySelector(".answerSheet");
const btnEnter = document.querySelector(".btnEnter");
const numboard = document.querySelector(".numboard");

const endPage = document.getElementById("endPage");
const btnRestart = document.querySelector(".btnRestart");
let finalScore = document.querySelector(".finalScore");

let countTime = 60;
let countScore = 0;
let answer = 0;
let sign = "+";



//開始遊戲
btnStart.addEventListener("click", function (e) {
    titlePage.style.display = "none";
    playPage.style.display = "flex";
    timeUp();
    printQuestion();
});

btnEnter.addEventListener("click", function (e) {
    if (answerSheet.value == answer && countTime > 10) {
        countScore++;
    } else if (answerSheet.value == answer && countTime <= 10) {
        countScore += 5;
    } else {
        countScore--;
    }
    score.textContent = countScore;
    answerSheet.value = "";
    printQuestion();
    str = "";
    answerSheet.value = str;
})

document.addEventListener("keydown", function (e) {
    if (e.code == "Enter" && answerSheet.value != "") {
        if (answerSheet.value == answer && countTime > 10) {
            countScore++;
        } else if (answerSheet.value == answer && countTime <= 10) {
            countScore += 5;
        } else {
            countScore--;
        }
        score.textContent = countScore;
        answerSheet.value = "";
        printQuestion();
    };
})

let str = "";
numboard.addEventListener("click", function (e) {
    if (e.target.getAttribute("data-num") == 0 || e.target.getAttribute("data-num") == 1 || e.target.getAttribute("data-num") == 2 || e.target.getAttribute("data-num") == 3 || e.target.getAttribute("data-num") == 4 || e.target.getAttribute("data-num") == 5 || e.target.getAttribute("data-num") == 6 || e.target.getAttribute("data-num") == 7 || e.target.getAttribute("data-num") == 8 || e.target.getAttribute("data-num") == 9) {
        str += e.target.getAttribute("data-num");
        answerSheet.value = str;
    }
})


//再來一局
btnRestart.addEventListener("click", function (e) {
    endPage.style.display = "none";
    titlePage.style.display = "flex";
    countTime = 60;
    setTime.textContent = "01:00";
    countScore = 0;
    score.textContent = 0;
    str = "";
    answerSheet.value = str;
})


//計時器+顯示
function timeUp() {
    let interval = setInterval(() => {
        countTime--;
        if (countTime > 9) {
            setTime.textContent = '00:' + countTime;
        } else if (countTime < 10 && countTime != 0) {
            setTime.textContent = "00:0" + countTime;
        } else if (countTime == 0) {
            setTime.textContent = "00:00";
            playPage.style.display = "none";
            endPage.style.display = "flex";
            finalScore.textContent = countScore;
            clearInterval(interval);
        }
    }, 1000);
}

//題目產出
function printQuestion() {
    let questionnum1 = 0;
    let questionnum2 = 0;

    if (countTime >= 40) {
        questionnum1 += getNum(10);
        questionnum2 += getNum(10);
    } else if (countTime >= 20) {
        questionnum1 += getNum(100);
        questionnum2 += getNum(100);
        if (questionnum1 < 10 || questionnum2 < 10) {
            printQuestion();
            return;
        }
    } else if (countTime >= 0) {
        questionnum1 += getNum(1000);
        questionnum2 += getNum(1000);
        if (questionnum1 < 100 || questionnum2 < 100) {
            printQuestion();
            return;
        }
    }
    if (getSign() == "+") {
        answer = questionnum1 + questionnum2;
        sign = "+";
    } else if (getSign() == "-") {
        if (questionnum2 > questionnum1) {
            printQuestion();
            return;
        } else {
            answer = questionnum1 - questionnum2;
            sign = "-";
        }
    } else if (getSign() == "×") {
        answer = questionnum1 * questionnum2;
        sign = "×";
    } else if (getSign() == "÷") {
        if (questionnum2 > questionnum1 || questionnum1 % questionnum2 != 0) {
            printQuestion();
            return;
        } else {
            answer = questionnum1 / questionnum2;
            sign = "÷";
        }
    } else {
        printQuestion();
        return;
    }
    num1.textContent = questionnum1;
    num2.textContent = questionnum2;
    questionSign.textContent = sign;
}


//取0~num-1的數字
function getNum(num) {
    let i = Math.floor(Math.random() * num);
    return i;
}

function getSign() {
    let sign = ["+", "-", "×", "÷"];
    return sign[getNum(4)];
}
