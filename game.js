const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
let focusCategory = window.localStorage.getItem('category');


let score = 0;
let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let availableQuestions = [];

let questions = {
    Ghana: [{
        question: "When did Ghana gain independence?",
        optionChoice: [1975, 1957, 1960, 1969],
        answer: 1957
    },
    {
        question: "When did Ghana become a republic country?",
        optionChoice: [1975, 1957, 1960, 1969],
        answer: 1960
    },
    {
        question: "Who is Ghana's immediate past president?",
        optionChoice: ["Dr Kwame Nkrumah", "Dr Hilla Limann", "Dr Paa Bobo", "John Dramani Mahama"],
        answer: "John Dramani Mahama"
    }],

    Africa: [{
        question: "What is the highest mountain in African",
        optionChoice: ['Kilimanjaro', 'Afadjato', 'Whitmore', 'Granjer'],
        answer: 'Kilimanjaro'
    },
    {
        question: "What is the Capital Town of Egypt ?",
        optionChoice: ["Lome", "Accra", "Cairo", "Kingstown"],
        answer: "Cairo"
    },
    {
        question: "In which Country is Victoria Falls ?",
        optionChoice: ["Ghana", "South Africa", "Zimbabwe", "Egypt"],
        answer: "South Africa"
    }],

    World: [{
        question: "Where is world bank located?",
        optionChoice: ['Cape town', 'Seoul', 'Geneva', 'Los Angeles'],
        answer: 'Geneva'
    },
    {
        question: "In what year was the new coronavirus discovered ?",
        optionChoice: ["2021", "2019", "2020", "2012"],
        answer: "2019"
    },
    {
        question: "Who is the current US President?",
        optionChoice: ["George Bush", "Hillary Clinton", "Joe Biden", "Donald Trump"],
        answer: "Joe Biden"
    }],
};



const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;

    availableQuestions = [...questions[focusCategory]];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        window.localStorage.setItem(focusCategory, score);
        return window.location.assign('/index.html');
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion.optionChoice[number - 1];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.innerText;

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);


        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000);

    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};
startGame();

