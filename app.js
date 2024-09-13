 const $startGameButton = document.querySelector(".start-quiz");
const $questionsContainer = document.querySelector(".questions-container");
const $answersContainer = document.querySelector(".answers-container");
const $questionText = document.querySelector(".quention");
const $nextQuestionButton = document.querySelector(".next-question");

 $startGameButton.addEventListener("click", startGame);
 $nextQuestionButton.addEventListener("click", displayNextQuestion);

let currentQuestionIndex = 0;
let totalCorrect = 0;

 function startGame() {
    $startGameButton.classList.add("hide");
    $questionsContainer.classList.remove("hide");
    displayNextQuestion();
 };

 function displayNextQuestion() {
    resetState();

    if (questions.length == currentQuestionIndex) {
        return finishGame();
    };

    $questionText.textContent = questions[currentQuestionIndex].question;
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button");
        newAnswer.classList.add("button", "answer");
        newAnswer.textContent = answer.text
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct
        };
        $answersContainer.appendChild(newAnswer);

        newAnswer.addEventListener("click", selectAnswer);
    });
 };

 function  resetState() {
    while($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild)
    };

    document.body.removeAttribute("class");
    $nextQuestionButton.classList.add("hide");
 };

 function selectAnswer(event) {
    const answerClicked = event.target; 

    if (answerClicked.dataset.correct) {
        document.body.classList.add("correct");
        totalCorrect++;
    } else {
        document.body.classList.add("incorrect");
    }

    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct)  {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        };

        button.disabled = true;
    });

    $nextQuestionButton.classList.remove("hide");
    currentQuestionIndex++;
 };

 function finishGame() {
    const totalQuestion = questions.length;
    const performance = Math.floor(totalCorrect * 100 / totalQuestion);

    let message = "";

    switch (true) {
      case(performance >= 90):
        message = "Excelente :)"
        break;
      case(performance >= 70):
        message = "Muito Bom :)"
        break
      case(performance >= 50):
        message = "Bom!"
        break
      default:
        message = "Pode Melhorar:("
    }
    
    $questionsContainer.innerHTML = 
    `
    <p class="final-message">
      Você Acertou ${totalCorrect} de ${totalQuestion} Questões!
      <span>Resultado: ${message}</span>
    </p>
    <button onclick=window.location.reload() class="button">
      Refazer Teste
    </button>
    `
 };



















 const questions = [
    {
        question: "Qual Goleiro mais agarrou penaltis com a camisa do Timão?",
        answers: [
            {text: "<Cássio>", correct: true },
            {text: "<Ronaldo>", correct: false },
            {text: "<Júlio César>", correct: false },
            {text: "<Dida>", correct: false },
        ]
    },
    {
        question: "Quem marcou os gols do mundial de clubes de 2012?",
        answers: [
            {text: "<Liedson>", correct: false },
            {text: "<Jorge Henrique>", correct: false },
            {text: "<Guerreiro>", correct: true },
            {text: "<Danilo>", correct: false },
        ]
    },
    {
        question: "Qual ano o Corinthians foi pela 1º vez Campeão do Brasileirão?",
        answers: [
            {text: "<1991>", correct: false },
            {text: "<1990>", correct: true },
            {text: "<1950>", correct: false },
            {text: "<1911>", correct: false },
        ]
    },
    {
        question: "Quem marcou os gols do jogo da volta da final da Libertadores de 2012?",
        answers: [
            {text: "<Paulinho>", correct: false },
            {text: "<Romarinho>", correct: false },
            {text: "<Danilo>", correct: false },
            {text: "<Emerson Sheik>", correct: true },
        ]
    },
    {
        question: "Qual time que tomou 6x1 no Brasileirão de 2015?",
        answers: [
            {text: "<Palmeiras>", correct: false },
            {text: "<Santos>", correct: false },
            {text: "<São Paulo>", correct: true },
            {text: "<Flamengo>", correct: false },
        ]
    }
 ];