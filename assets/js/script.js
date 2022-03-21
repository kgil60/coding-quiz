let pageContentEl = document.getElementById("page-content");
let questionIndex = 0;
let timerSecs = 75;

let questions = [
    {
        name: "What does HTML stand for?",
        answers: [
            {answer: "1. Hyper Tag Markup Language", isTrue: false},
            {answer: "2. Hyperlinking Text Markup Language", isTrue: false},
            {answer: "3. Hyper Text Markup Language", isTrue: true},
            {answer: "4. Home Text Markup Language", isTrue: false}
        ]
    },
    {
        name: "What does CSS stand for?",
        answers: [
            {answer: "1. Cascading Style Sheet", isTrue: true},
            {answer: "2. Computing Style Sheet", isTrue: false},
            {answer: "3. Creative Styling Sheet", isTrue: false},
            {answer: "4. Cascading Style System", isTrue: false}
        ]
    },
    {
        name: "JavaScript is a ___-side programming language.",
        answers: [
            {answer: "1. Client", isTrue: false},
            {answer: "2. Server", isTrue: false},
            {answer: "3. Both 1 and 2", isTrue: true},
            {answer: "4. Neither 1 nor 2", isTrue: false}
        ]
    },
    {
        name: "When creating an element in HTML, you wrap the element name in:",
        answers: [
            {answer: "Curley Brackets {}", isTrue: false},
            {answer: "Prentheses ()", isTrue: false},
            {answer: "Square Brackets []", isTrue: false},
            {answer: "Angle Brackets <>", isTrue: true}
        ]
    }
]

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
            }

            let questionContent = document.querySelector(".main-content");
            pageContentEl.removeChild(questionContent);

            questionIndex++;

            displayQuestion(questionIndex);

            pageContentEl.appendChild(rightWrong);

            setTimeout(function(){
                pageContentEl.removeChild(rightWrong)
            }, 2000)
        });
        answerEl.appendChild(answerBtn);

        questionListEl.appendChild(answerEl);
    };

    questionContentEl.appendChild(questionListEl);

    pageContentEl.appendChild(questionContentEl);
    
}

function timer() {
    let timerEl = document.getElementById("timer");
    setInterval(function(){
        timerEl.textContent = `Time: ${timerSecs}`;
        timerSecs--;
    }, 1000)
}

pageContentEl.addEventListener("click", startBtnHandler);