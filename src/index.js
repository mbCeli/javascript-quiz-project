document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const progress = document.querySelector("#progress");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  // End view elements
  const resultContainer = document.querySelector("#result");

  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question(
      "What is the capital of France?",
      ["Miami", "Paris", "Oslo", "Rome"],
      "Paris",
      1
    ),
    new Question(
      "Who created JavaScript?",
      ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"],
      "Brendan Eich",
      2
    ),
    new Question(
      "What is the mass–energy equivalence equation?",
      ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"],
      "E = mc^2",
      3
    ),
    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();

  /************  TIMER  ************/
  quizView.style.position = "relative";
  timeRemainingContainer.style.position = "absolute";
  timeRemainingContainer.style.top = "30px";
  timeRemainingContainer.style.left = "500px";

  let timer = null;
  let remainingTime = quizDuration;

  function startCountdown() {
    timer = setInterval(() => {
      remainingTime -= 1;

      const minutes = Math.floor(remainingTime / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (remainingTime % 60).toString().padStart(2, "0");

      timeRemainingContainer.innerText = `${minutes}:${seconds}`;

      if (remainingTime === 0) {
        clearInterval(timer);
        showResults();
      }
    }, 1000);
  }

  startCountdown();
  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results

  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }
    // Clear the previous question text and question choices
    questionContainer.innerText = ""; // limpia las preguntas
    choiceContainer.innerHTML = ""; // limpia las respuestas

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();

    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text
    questionContainer.innerText = question.text;

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    //progressBar.style.width = `65%`; // This value is hardcoded as a placeholder

    const progress =
      ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100;

    progressBar.style.width = `${progress}%`;

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions

    //questionCount.innerText = `Question 1 of 10`; //  This value is hardcoded as a placeholder

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`;

    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    // Each choice should be displayed as a radio input element with a label:
    /* 
        
        <input type="radio" name="choice" value="CHOICE TEXT HERE">
        <label>CHOICE TEXT HERE</label>
        <br>
    */
    // Hint 1: You can use the `document.createElement()` method to create a new element.
    // Hint 2: You can use the `element.type`, `element.name`, and `element.value` properties to set the type, name, and value of an element.
    // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
    // Hint 4: You can use the `element.innerText` property to set the inner text of an element.

    question.choices.forEach((choice) => {
      /*       // Crear el input tipo radio
      const input = document.createElement("input");
      input.type = "radio";        // Tipo de input (radio)
      input.name = "choice";      // Nombre (todos los radio buttons deben tener el mismo nombre)
      input.value = choice;       // Valor de la opción

      // Crear el label para la opción
      const label = document.createElement("label");
      label.innerText = choice;   // El texto que mostrará el label

      // Crear un salto de línea para separar las opciones
      const br = document.createElement("br");

      // Añadir el input y el label al contenedor de opciones
      choiceContainer.appendChild(input);
      choiceContainer.appendChild(label);
      choiceContainer.appendChild(br);  // Añadir el salto de línea */

      const choiceElement = document.createElement("div");
      choiceElement.innerHTML = `
        <div class="choice-element">
          <input id="${choice}" type="radio" name="question" value="${choice}">
          <label for="${choice}">${choice}</label>
          <br>
        </div>
      `;
      choiceContainer.appendChild(choiceElement);
    });
  }

  function nextButtonHandler() {
    let selectedAnswer; // A variable to store the selected answer value

    const choiceElement = document.querySelectorAll(".choice-element");
    choiceElement.forEach((choice) => {
      const selectedChoiceButton = choice.getElementsByTagName("input")[0];
      const isButtonChecked = selectedChoiceButton.checked;
      const selectedButtonValue = selectedChoiceButton.value;
      const isCorrect = quiz.checkAnswer(selectedButtonValue);
      if (!isButtonChecked) return;
      quiz.moveToNextQuestion();
      showQuestion();
    });

    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    // 2. Loop through all the choice elements and check which one is selected
    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    //  When a radio input gets selected the `.checked` property will be set to true.
    //  You can use check which choice was selected by checking if the `.checked` property is true.
    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
    // Move to the next question by calling the quiz method `moveToNextQuestion()`.
    // Show the next question by calling the function `showQuestion()`.
  }

  function showResults() {
    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    //resultContainer.innerText = `You scored 1 out of 1 correct answers!`; // This value is hardcoded as a placeholder
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.currentQuestionIndex} correct answers!`; // This value is hardcoded as a placeholder
  }

  const restartButton = document.getElementById("restartButton");
  restartButton.onclick = () => {
    endView.style.display = "none";
    quizView.style.display = "block";
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.shuffleQuestions();
    showQuestion();

    remainingTime = quizDuration;
    const minutes = Math.floor(remainingTime / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (remainingTime % 60).toString().padStart(2, "0");
    const timeRemainingContainer = document.getElementById("timeRemaining");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  };
});
