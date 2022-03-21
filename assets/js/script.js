let pageContentEl = document.getElementById("page-content");
let highScoreToggle =  document.getElementById("high-score-link");
let questionIndex = 0;
let timerSecs = 75;
let highScores = getHighScores();

let questions = [
    {
        name: "1. What does HTML stand for?",
        answers: [
            {answer: "1. Hyper Tag Markup Language", isTrue: false},
            {answer: "2. Hyperlinking Text Markup Language", isTrue: false},
            {answer: "3. Hyper Text Markup Language", isTrue: true},
            {answer: "4. Home Text Markup Language", isTrue: false}
        ]
    },
    {
        name: "2. What does CSS stand for?",
        answers: [
            {answer: "1. Cascading Style Sheet", isTrue: true},
            {answer: "2. Computing Style Sheet", isTrue: false},
            {answer: "3. Creative Styling Sheet", isTrue: false},
            {answer: "4. Cascading Style System", isTrue: false}
        ]
    },
    {
        name: "3. JavaScript is a ___-side programming language.",
        answers: [
            {answer: "1. Client", isTrue: false},
            {answer: "2. Server", isTrue: false},
            {answer: "3. Both 1 and 2", isTrue: true},
            {answer: "4. Neither 1 nor 2", isTrue: false}
        ]
    },
    {
        name: "4. When creating an element in HTML, you wrap the element name in:",
        answers: [
            {answer: "Curley Brackets {}", isTrue: false},
            {answer: "Prentheses ()", isTrue: false},
            {answer: "Square Brackets []", isTrue: false},
            {answer: "Angle Brackets <>", isTrue: true}
        ]
    },
    {
        name: "5. A CSS file can only be applied to one HTML file",
        answers: [
            {answer: "True", isTrue: false},
            {answer: "False", isTrue: true}
        ]
    },
    {
        name: "6. Which of the following will show a message as well as ask the user for an input in a popup?",
        answers: [
            {answer: "prompt()", isTrue: true},
            {answer: "alert()", isTrue: false},
            {answer: "confirm()", isTrue: false},
            {answer: "input()", isTrue: false}
        ]
    },
    {
        name: "7.  Which of the following are event listeners?",
        answers: [
            {answer: "click", isTrue: false},
            {answer: "change", isTrue: false},
            {answer: "submit", isTrue: false},
            {answer: "All of the above", isTrue: true},
            {answer: "None of the above", isTrue: false}
        ]
    },
    {
        name: "8. Where should you link the CSS file in your HTML?",
        answers: [
            {answer: "Anywhere in the document", isTrue: false},
            {answer: 'At the top of the "body" element', isTrue: false},
            {answer: 'At the end of the "head" element', isTrue: true},
            {answer: 'At the bottom of the "body" element', isTrue: false}
        ]
    },
    {
        name: "9. What is the correct tag for a line break in HTML?",
        answers: [
            {answer: "<brk />", isTrue: false},
            {answer: "<br />", isTrue: true},
            {answer: "<bk />", isTrue: false},
            {answer: "<b />", isTrue: false}
        ]
    },
    {
        name: '10. What command would switch you to the "develop" branch in your git repo?',
        answers: [
            {answer: "git switch develop", isTrue: false},
            {answer: "git branch develop", isTrue: false},
            {answer: "git develop", isTrue: false},
            {answer: "git checkout develop", isTrue: true}
        ]
    }
]

function getHighScores() {
    let highScoresData = localStorage.getItem("highscores");
    if(highScoresData) {
        let highScores = JSON.parse(highScoresData)
        highScores.sort(function(a, b) {
        return b.score - a.score;
    })
    return highScores;
    } else {
        let highScores = [];
        return highScores;
    }
}

function startBtnHandler(e) {
    if(e.target.matches("#start-button")) {
        let homeContentEl = document.querySelector(".main-content")

        pageContentEl.removeChild(homeContentEl)

        displayQuestion();

        timer();

    }
}

function displayQuestion() {
    let questionContentEl = document.createElement("div");
    questionContentEl.className = "main-content";

    let questionNameEl = document.createElement("h1");
    questionNameEl.className = "title";
    questionNameEl.textContent = questions[questionIndex].name;
    questionContentEl.appendChild(questionNameEl);
    
    let questionListEl = document.createElement("ul")
    questionListEl.className = "answer-list";

    let answerArr = questions[questionIndex].answers;
    for (let i=0; i<answerArr.length; i++) {
        let answerEl = document.createElement("li");
        answerEl.className = "answer-item";

        let answerBtn = document.createElement("button");
        let btnIndex = i;
        answerBtn.className = "btn";
        answerBtn.textContent = answerArr[i].answer;
        answerBtn.setAttribute("index", i)
        answerBtn.addEventListener("click", () => {
            let rightWrong = document.createElement("div");
            rightWrong.className = "right-wrong"

            if(questions[questionIndex].answers[btnIndex].isTrue){
                rightWrong.innerHTML = "<p><em>Correct!</em></p>"
            } else {
                rightWrong.innerHTML = "<p><em>Incorrect!</em></p>"
                timerSecs -= 10;
            }

            let questionContent = document.querySelector(".main-content");
            pageContentEl.removeChild(questionContent);

            questionIndex++;

            if (questionIndex >= questions.length) {
                submitScore();
            } else {
                displayQuestion(questionIndex);
            }

            pageContentEl.appendChild(rightWrong);

            setTimeout(function(){
                pageContentEl.removeChild(rightWrong)
            }, 1000)
        });
        answerEl.appendChild(answerBtn);

        questionListEl.appendChild(answerEl);
    };

    questionContentEl.appendChild(questionListEl);

    pageContentEl.appendChild(questionContentEl);
    
}

function timer() {
    let timerEl = document.getElementById("timer");
    let timerInterval = setInterval(function(){
        checkTime(timerInterval);
        timerEl.textContent = `Time: ${timerSecs}`;
        timerSecs--;
    }, 1000)
}

function checkTime(interval) {
    if (timerSecs <= 0) {
        clearInterval(interval);
        let mainContentEl = document.querySelector(".main-content");
        pageContentEl.removeChild(mainContentEl);
        submitScore();
    }
    else if (questionIndex >= questions.length) {
        clearInterval(interval)
    }
}

function submitScore() {
    let submitScoreContentEl = document.createElement("div");
    submitScoreContentEl.className = "main-content";
    submitScoreContentEl.innerHTML = `<h1 class='title'>All Done!</h1><p class='p-text'>Your score was ${timerSecs}`;
    
    let scoreFormEl = document.createElement("form");
    scoreFormEl.className = "highscore-form";

    let initialsInputEl = document.createElement("input");
    initialsInputEl.setAttribute("placeholder", "Enter initials here");
    initialsInputEl.setAttribute("name", "initials")
    scoreFormEl.appendChild(initialsInputEl);

    let submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.className = "btn submit-score";
    submitBtn.textContent = "Submit Score";
    scoreFormEl.appendChild(submitBtn);

    scoreFormEl.addEventListener("submit", formSubmitHandler);

    submitScoreContentEl.appendChild(scoreFormEl);

    pageContentEl.appendChild(submitScoreContentEl);


}

function formSubmitHandler(e) {
    e.preventDefault();

    let formInputEl = document.querySelector("input[name='initials']").value;

    let scoreObj = {
        init: formInputEl,
        score: timerSecs + 1
    }
    highScores.push(scoreObj);
    saveScore();
    showHighScore();
}

function showHighScore() {
    let mainContentEl = document.querySelector(".main-content");
    pageContentEl.removeChild(mainContentEl);

    let highScoreContentEl = document.createElement("div");
    highScoreContentEl.className = "main-content";
    highScoreContentEl.innerHTML = "<h1 class='title'>High Scores</h1>";

    let scoreList = document.createElement("ul");
    scoreList.className = "score-list";

    highScores.sort(function(a, b) {
        return b.score - a.score;
    })

    for (let i=0; i<highScores.length; i++) {
        let scoreListItemEl = document.createElement("li");
        scoreListItemEl.className = "score";
        scoreListItemEl.innerHTML = `<div>${highScores[i].init}</div><div>${highScores[i].score}</div>`

        scoreList.appendChild(scoreListItemEl);
    }

    highScoreContentEl.appendChild(scoreList);

    let returnBtn = document.createElement("button");
    returnBtn.className = "btn";
    returnBtn.setAttribute("type", "button");
    returnBtn.textContent = "Return Home";
    returnBtn.addEventListener("click", () => {
        window.location.reload();
    })

    highScoreContentEl.appendChild(returnBtn);

    pageContentEl.appendChild(highScoreContentEl);


}

function saveScore() {
    localStorage.setItem("highscores", JSON.stringify(highScores))
}

pageContentEl.addEventListener("click", startBtnHandler);
highScoreToggle.addEventListener("click", showHighScore);
