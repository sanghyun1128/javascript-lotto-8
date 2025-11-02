import OutputManager from './ui/OutputManager.js';
import InputManager from './ui/InputManager.js';
import Customer from './domain/Customer.js';
import LottoShop from './domain/LottoShop.js';

class Controller {
  #customer;

  #shop;

  constructor() {
    this.#customer = null;
    this.#shop = new LottoShop();
  }

  async requestBalance() {
    OutputManager.printRequestBalance();
    const balance = await InputManager.getInteger();

    this.#customer = new Customer(balance);
  }

  buyLottosAndPrint() {
    while (this.#customer.balance > 0) {
      this.#shop.buyLotto(this.#customer);
    }

    OutputManager.printEmptyLine();
    OutputManager.printBoughtLottosCount(this.#customer.ownedLottos.length);
    this.#customer.ownedLottos.forEach((lotto) => OutputManager.print(lotto.numbersToString()));
  }

  async requestWinningNumbers() {
    OutputManager.printEmptyLine();
    OutputManager.printRequestWinningNumbers();
    const winningNumbers = await InputManager.getIntegerList();

    this.#shop.winningNumbers = winningNumbers;
  }

  async requestBonusNumber() {
    OutputManager.printEmptyLine();
    OutputManager.printRequestBonusNumber();
    const bonusNumber = await InputManager.getInteger();

    this.#shop.bonusNumber = bonusNumber;
  }

  checkResultsAndPrint() {
    this.#customer.checkLottoResults(this.#shop);

    OutputManager.printEmptyLine();
    OutputManager.printResultHeader();
    OutputManager.printResult(this.#customer.lottoResults.fifth);
    OutputManager.printResult(this.#customer.lottoResults.fourth);
    OutputManager.printResult(this.#customer.lottoResults.third);
    OutputManager.printResult(this.#customer.lottoResults.second);
    OutputManager.printResult(this.#customer.lottoResults.first);
    OutputManager.printYield(this.#customer.calculateYield());
  }
}

export default Controller;
