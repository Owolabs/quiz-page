const questions = [
    {
        question: "Which of the following town is regarded as the 'confluence' town?",
        options:
        [    
            {value:'Lagos', correct:false},
            {value: 'Lokoja',correct:true},
            {value:'Benue', correct:false},
            {value:'Abeokuta', correct:false}
        ]

    },
    {
        question: "The Eagle in the Nigeria coat of arms stands for?",
        options:
        [    
            {value:'Unity', correct:false},
            {value: 'Agriculture',correct:false},
            {value:'Peace', correct:false},
            {value:'Strength', correct:true}
        ]

    },
    {
        question: "Which of the following planet is closest to the sun?",
        options:
        [    
            {value:'Mercury', correct:true},
            {value: 'Venus',correct:false},
            {value:'Earth', correct:false},
            {value:'Saturn', correct:false}
        ]

    },
    {
        question: "How many stars does the USA flag has on it?",
        options:
        [    
            {value:'45', correct:false},
            {value: '50',correct:true},
            {value:'55', correct:false},
            {value:'60', correct:false}
        ]

    }
]
const questionText = document.querySelector('.quiz-question');
const optionsContainer = document.querySelector('.options');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button')
const scoreValue = document.getElementById('score-value');
const resultFeedBack =document.getElementById('result');
let score = 0;
let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    displayQuestions();
}
function displayQuestions () {

    makeChanges()
    nextButton.style.display = 'block';
    prevButton.style.display = 'block';
    let currentQuestion = questions[currentQuestionIndex];
    questionNumber = currentQuestionIndex + 1;
    
    questionText.innerHTML = questionNumber + ' .' + currentQuestion.question;
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerHTML = option.value;
        button.classList.add('option-value');
        optionsContainer.appendChild(button);


        
        if(option.correct){
            button.dataset.correct = option.correct;
        }
        button.addEventListener('click', checkAnswer);
    })

}
function makeChanges() {
    nextButton.style.display = 'none';
    prevButton.style.display = 'none';

    while (optionsContainer.firstChild){
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
    
}

function checkAnswer(i, questionIndex, selectedOptionIndex) {
    const checkedButton = i.target;
    const isCorrect = checkedButton.dataset.correct=== 'true';
    userAnswers[questionIndex] = selectedOptionIndex;
    if(isCorrect){
        checkedButton.classList.add('correct');
        score++;
        resultFeedBack.textContent = 'correct! one point scored'
    }else{
        checkedButton.classList.add('incorrect');
        resultFeedBack.textContent = 'Oh you are wrong'
    }
    scoreValue.textContent = score;
        Array.from(optionsContainer.children).forEach(button => {
            if(button.dataset.correct === 'true'){
                button.classList.add('correct');
            }
            button.disabled = true;
        });
        nextButton.style.display = 'block';
        prevButton.style.display = 'block';
}

function endQuiz(){
    makeChanges();
    
    questionText.innerHTML = 'quiz completed ! Your score is ' + score +' out of ' + questions.length; 
    nextButton.innerText = 'End Of Quiz';
    nextButton.style.display = 'block';
    nextButton.style.margin = '10px auto 0';
    if(score < questions.length){
        resultFeedBack.innerText = 'welldone! but you can still do better.'; 
    }else if(score === questions.length){
        resultFeedBack.innerText ='congratulations!!!';
    } 

}

function clickNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        displayQuestions();
    }else{
        endQuiz();
    }
}

prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestions(currentQuestionIndex);
        nextButton.disabled = false; 
        if (currentQuestionIndex === 0) {
            
        }
    }
});

nextButton.addEventListener('click', () => {
        if(currentQuestionIndex < questions.length){
           
          clickNextButton();
            
        }else{
            startQuiz;
        }
    })
   
    
startQuiz()

