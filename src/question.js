class Question {
    // YOUR CODE HERE:
    //
    // 1. constructor (text, choices, answer, difficulty)
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
      }

    // 2. shuffleChoices()
    shuffleChoices() {
        for (let i = 0; i < this.choices.length; i++) {
          const randomPlace = Math.floor(Math.random()) * (i + 1);
          [this.choices[i], this.choices[randomPlace]] = [this.choices[randomPlace], this.choices[i]];
        }
      }
}