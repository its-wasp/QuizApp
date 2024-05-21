document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start_button');
    const tryAgainButton = document.getElementById('try_again');
    const goHomeButton = document.getElementById('go_home');
    const quizHome = document.querySelector('.quiz_home');
    const quizSection = document.querySelector('.quiz_section');
    const finalSection = document.querySelector('.final_section');
    const options = document.querySelectorAll('.option');
    const scoreDisplay = document.getElementById('score');
    const finalScoreDisplay = document.getElementById('final_score');
    const currentProgressBar = document.querySelector('.current-progress');
    const questionNumber = document.getElementById('question_number');
    const questionText = document.getElementById('question_text');

    let score = 0;
    let currentQuestionIndex = 0;
    let selectedQuestions = [];

    const questions = [
        {
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
            correctAnswer: 1
        },
        {
            question: "What is the value of 7^3?",
            options: ["343", "49", "21", "81"],
            correctAnswer: 0
        },
        {
            question: "Which river is the longest in the world?",
            options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
            correctAnswer: 1
        },
        {
            question: "Who was the first woman to fly solo across the Atlantic Ocean?",
            options: ["Amelia Earhart", "Bessie Coleman", "Harriet Quimby", "Jacqueline Cochran"],
            correctAnswer: 0
        },
        {
            question: "Which novel begins with the line, 'Call me Ishmael'?",
            options: ["Moby Dick", "War and Peace", "Great Expectations", "The Catcher in the Rye"],
            correctAnswer: 0
        },
        {
            question: "How many gold medals did Michael Phelps win in the 2008 Beijing Olympics?",
            options: ["6", "7", "8", "9"],
            correctAnswer: 2
        },
        {
            question: "Which composer wrote the opera 'The Magic Flute'?",
            options: ["Ludwig van Beethoven", "Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Richard Wagner"],
            correctAnswer: 1
        },
        {
            question: "In which movie does the character Neo appear?",
            options: ["The Matrix", "Inception", "Avatar", "Terminator"],
            correctAnswer: 0
        },
        {
            question: "What is the name of the first electronic general-purpose computer?",
            options: ["ENIAC", "UNIVAC", "IBM 701", "Colossus"],
            correctAnswer: 0
        },
        {
            question: "Who painted 'The Starry Night'?",
            options: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Leonardo da Vinci"],
            correctAnswer: 1
        }
    ];

    function getRandomQuestions() {
        const shuffled = questions.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 5);
    }

    startButton.addEventListener('click', () => {
        selectedQuestions = getRandomQuestions();
        quizHome.style.display = 'none';
        quizSection.style.display = 'block';
        loadQuestion();
    });

    options.forEach(option => {
        option.addEventListener('click', (e) => {
            const selectedAnswer = e.target.closest('.option');
            const answerIndex = Array.from(options).indexOf(selectedAnswer);

            if (answerIndex === selectedQuestions[currentQuestionIndex].correctAnswer) {
                selectedAnswer.classList.add('correct');
                score += 10;
            } else {
                selectedAnswer.classList.add('incorrect');
            }

            options.forEach(option => option.disabled = true);

            setTimeout(() => {
                if (currentQuestionIndex < selectedQuestions.length - 1) {
                    currentQuestionIndex++;
                    loadQuestion();
                } else {
                    showFinalScore();
                }
            }, 500);
        });
    });

    function loadQuestion() {
        const currentQuestion = selectedQuestions[currentQuestionIndex];
        questionNumber.textContent = `Question ${currentQuestionIndex + 1}/${selectedQuestions.length}`;
        scoreDisplay.textContent = score;
        questionText.textContent = currentQuestion.question;
        options.forEach((option, index) => {
            option.querySelector('.option_number').textContent = String.fromCharCode(65 + index) + '.';
            option.querySelector('.option_text').textContent = currentQuestion.options[index];
            option.classList.remove('correct', 'incorrect');
            option.disabled = false;
        });

        updateProgressBar();
    }

    function updateProgressBar() {
        const progress = ((currentQuestionIndex) / selectedQuestions.length) * 100;
        currentProgressBar.style.width = `${progress}%`;
    }

    function showFinalScore() {
        quizSection.style.display = 'none';
        finalSection.style.display = 'block';
        finalScoreDisplay.textContent = score;
    }

    tryAgainButton.addEventListener('click', () => {
        resetQuiz();
    });

    goHomeButton.addEventListener('click', () => {
        finalSection.style.display = 'none';
        quizHome.style.display = 'flex';
        resetQuiz();
        quizSection.style.display = 'none';
    });

    function resetQuiz() {
        score = 0;
        currentQuestionIndex = 0;
        quizSection.style.display = 'block';
        finalSection.style.display = 'none';
        scoreDisplay.textContent = score;
        loadQuestion();
    }
});