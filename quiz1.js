const questions = [
    {
        question: "What is the size of 'int' data type in bytes in C?",
        options: ["2", "4", "6", "8"],
        answer: "4"
    },
    {
        question: "What is the output of the following code?\n\n#include <stdio.h>\nint main() {\n    int x = 10, y = 20;\n    x = x++;\n    y = ++y;\n    printf(\"%d %d\\n\", x, y);\n    return 0;\n}",
        options: ["10 20", "11 20", "10 21", "11 21"],
        answer: "10 21"
    },
    {
        question: "Which of the following is the correct way to declare a pointer variable in C?",
        options: ["int ptr;", "ptr int;", "int *ptr;", "pointer int;"],
        answer: "int *ptr;"
    },
    {
        question: "What is the correct syntax to open a file named 'example.txt' in 'read' mode in C?",
        options: ["FILE *f = fopen(\"example.txt\", \"r\");", "FILE *f = open(\"example.txt\", \"r\");", "fopen(\"example.txt\", \"read\");", "open(\"example.txt\", \"r\");"],
        answer: "FILE *f = fopen(\"example.txt\", \"r\");"
    },
    {
        question: "What is the output of the following code?\n\n#include <stdio.h>\nint main() {\n    int arr[5] = {1, 2, 3, 4, 5};\n    printf(\"%d\", arr[5]);\n    return 0;\n}",
        options: ["1", "5", "0", "Undefined"],
        answer: "Undefined"
    },
    {
        question: "Which function is used to allocate memory dynamically in C?",
        options: ["malloc()", "calloc()", "realloc()", "allocate()"],
        answer: "malloc()"
    },
    {
        question: "What is the correct way to access the value of a variable 'x' using a pointer variable 'ptr' in C?",
        options: ["ptr->x", "*ptr->x", "ptr*x", "*ptr.x"],
        answer: "ptr->x"
    },
    {
        question: "What is the output of the following code?\n\n#include <stdio.h>\nint main() {\n    int i = 0;\n    while (i < 5) {\n        printf(\"%d\\n\", i++);\n    }\n    return 0;\n}",
        options: ["0 1 2 3 4", "1 2 3 4 5", "0 1 2 3 4 5", "1 2 3 4"],
        answer: "0 1 2 3 4"
    },
    {
        question: "What does the 'break' statement do in C?",
        options: ["Exits from the loop", "Skips the current iteration of the loop", "Jumps to a specific line in the code", "None of the above"],
        answer: "Exits from the loop"
    },
    {
        question: "What is the correct way to define a constant in C?",
        options: ["#define PI 3.14159", "const float PI = 3.14159", "Both A and B", "None of the above"],
        answer: "Both A and B"
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





