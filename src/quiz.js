class Quiz {
  // YOUR CODE HERE:
  //
  // 1. constructor (questions, timeLimit, timeRemaining)
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

  // 2. getQuestion()
  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  // 3. moveToNextQuestion()
  moveToNextQuestion() {
    this.currentQuestionIndex+=1
  }

  // 4. shuffleQuestions()
  shuffleQuestions() {
    for (let i = 0; i < this.questions.length; i++) {
      const randomPlace = Math.floor(Math.random()) * (i + 1);
      [this.questions[i], this.questions[randomPlace]] = [
        this.questions[randomPlace],
        this.questions[i],
      ];
    }
  }

  // 5. checkAnswer(answer)
  checkAnswer(answer) {
    // implementar bien esta parte
   /*  if (answer) {
      this.correctAnswers++;
    } */
    if (!answer || this.currentQuestionIndex >= this.questions.length) return
    const isAnswerCorrect = (answer === this.questions[this.currentQuestionIndex].answer)
    if (isAnswerCorrect) {
      this.correctAnswers++
    }
    return isAnswerCorrect
  }

  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex < this.questions.length) {
      return false;
    } else if (this.currentQuestionIndex == this.questions.length) {
      return true;
    }
  }

  filterQuestionsByDifficulty(numDificulty) {
    if (numDificulty >= 1 && numDificulty <= 3) {
      this.questions = this.questions.filter(question => question.difficulty === numDificulty)
    }
  }

  averageDifficulty() {
    const suma = this.questions.reduce(function (accu, curr) { return accu + curr.difficulty }, 0)
    return suma / this.questions.length
  }

}

