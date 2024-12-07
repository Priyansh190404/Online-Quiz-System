const questions = [
    {
        question: "Department of transport test(DOT) is performed for which of the following?",
        options: ["Aerosols", "Glass Containers", "Capsules", "None"],
        answer: "Aerosols"
    },
    {
        question: "Identify the correct non-flammable propellant",
        options: ["Dichloro monofluoro methane", "Trichloro monofluoro methane", "Di methyl ether", "Di fluoro methane"],
        answer: "Trichloro monofluoro methane"
    },
    {
        question: "The first aerosol insecticide was developed by -",
        options: ["Good-hue & Sullivan", "Good-hue", "Sullivan", "Franklin"],
        answer: "Good-hue & Sullivan"
    },
    {
        question: "Which drug is formulated as first pharmaceutical aerosol?",
        options: ["Epinephrine", "Codeine", "Chloropromazine", "Probenecid"],
        answer: "Epinephrine"
    },
    {
        question: "Gasket is made up of?",    options: ["Bure-N", "Neoprene rubber", "Both", "None of the above"],
        answer: "Both"
    },
    {
        question: "Ph of human tear is",
        options: ["7.6", "4.5", "7.2", 
        "9"],
        answer: "7.6"
    },
    {
        question: "Opthalmic solution is sterilized by",
        options: ["Autoclave", "Hot air oven", "Membrane Filter", "Bacterial Filters"],
        answer: "Autoclave"
    },
    {
        question: "Which is used to adjust the isotonicity",
        options: ["Dextrose", "Boric acid", "NaCl", "All of the above"],
        answer: "Dextrose"
    },
    {
        question: "at which concentration ,phenol acts as preservative",
        options: ["0.2-0.5", "0.5-0.8", "0.05-0.1", "None"],
        answer: "0.2-0.5"
    },
    {
        question: "Which of the following sugar has bitter taste",
        options: ["Glucose", "Sucrose", "Saccharine", "None"],
        answer: "Saccharine"
    }
];


const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const submitButton = document.getElementById('submit-btn');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10; 
let timerInterval;
function startQuiz() {
    startButton.style.display = 'none';
    quizContainer.style.display = 'block';
    showQuestion();
    setInterval(updateTimer, 1000); 
}

function showQuestion() {
    clearInterval(timerInterval); 
    timeLeft = 10; 
    updateTimer(); 
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = "btn btn-outline-primary"
        button.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(button);
    });
}
function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const options = optionsElement.getElementsByTagName('button');
    for (let i = 0; i < options.length; i++) {
        if (options[i].textContent === currentQuestion.answer) {
            options[i].style.backgroundColor = 'green'; 
        } else if (options[i].textContent === selectedOption && options[i].textContent !== currentQuestion.answer) {
            options[i].style.backgroundColor = 'red'; 
        }
        options[i].disabled = true; 
    }
    if (selectedOption === currentQuestion.answer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(showQuestion, 1000);
    } else {
        setTimeout(showResult, 1000); 
    }
}


function showResult() {
    clearInterval(timerInterval); 
    quizContainer.style.display = 'none';
    resultElement.textContent = `You scored ${score} out of ${questions.length} questions`;
    scoreElement.textContent = `Final Score: ${score}`;
}

function updateTimer() {
    timerElement.textContent = `Time left: ${timeLeft} seconds`;
    if (timeLeft === 0) {
        clearInterval(timerInterval);
        currentQuestionIndex++; 
        if (currentQuestionIndex < questions.length) {
            showQuestion();
            timerInterval = setInterval(updateTimer, 1000); 
        } else {
            showResult();
        }
    } else {
        timeLeft--;
    }
}

startButton.addEventListener('click', startQuiz);