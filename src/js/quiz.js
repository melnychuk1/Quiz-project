import questions from './data';
import template from '../template/question.hbs'

// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const questionCard = document.getElementById("question-card");

// create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 60; // 60s
const gaugeWidth = 100; // 100%
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];

        questionCard.innerHTML = template({
            question: q.question,
            qImg: q.imgSrc,
            questionCode: q.code,
            choiceA: q.choiceA,
            choiceB: q.choiceB,
            choiceC: q.choiceC,
            choiceD: q.choiceD
        });
    choiceAnsw ();
}

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += `<div class='progress__item' id="${qIndex}"></div>`;
    }
}

// counter render
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "%";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// choice Answer
function choiceAnsw (){
    const choiceAnswer = document.getElementById("choices");

    choiceAnswer.addEventListener('click', (e) => {

        if (e.target.id){
            checkAnswer(e.target.id);
        }
        else{
            checkAnswer(e.target.lastElementChild.id);
        }
    });
}

// check Answer
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#ff0000";
}

// score render
function scoreRender() {
    scoreDiv.style.display = "flex";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);

    // choose the image based on the scorePerCent
    let img;

    if (scorePerCent >= 80){
        img ="img/5.png";
    }
    else if(scorePerCent >= 60){
        img = "img/4.png";
    }
    else if (scorePerCent >= 40){
        img = "img/3.png";
    }
    else if(scorePerCent >= 20){
        img = "img/2.png";
    }
    else {
        img = "img/1.png";
    }

    scoreDiv.innerHTML = `<img src="${img}">`;
    scoreDiv.innerHTML += `<p>${scorePerCent}</p>`;
    scoreDiv.innerHTML += `<a href="quiz.html" class="score__linkBack">Turn back to Quiz</a>`;
}

export default start.addEventListener("click", startQuiz);
