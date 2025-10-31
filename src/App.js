import OutputManager from './ui/OutputManager.js';
import Controller from './Controller.js';

class App {
  #controller;

  constructor() {
    this.#controller = new Controller();
  }

  async run() {
    try {
      await this.#controller.requestBalance();
      this.#controller.buyLottosAndPrint();
      await this.#controller.requestWinningNumbers();
      await this.#controller.requestBonusNumber();
      this.#controller.checkResultsAndPrint();
    } catch (error) {
      error.message = OutputManager.applyErrorMessageFormat(error.message);
      throw error;
    }
  }
}

export default App;
