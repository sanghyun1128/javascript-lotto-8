import OutputManager from './ui/OutputManager.js';
import InputManager from './ui/InputManager.js';
import Customer from './domain/Customer.js';
import LottoShop from './domain/LottoShop.js';
import DEFAULT_VALUES from './consts/defaultValues.js';

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
    while (this.#customer.canAfford(DEFAULT_VALUES.DOMAIN.LOTTO_PRICE)) {
      this.#shop.buyLotto(this.#customer);
    }

    OutputManager.printEmptyLine();
    OutputManager.printBoughtLottosCount(this.#customer.ownedLottosCount());
    OutputManager.print(this.#customer.ownedLottosToString());
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
    OutputManager.print(this.#customer.lottoResultToString(DEFAULT_VALUES.RANK.FIFTH));
    OutputManager.print(this.#customer.lottoResultToString(DEFAULT_VALUES.RANK.FOURTH));
    OutputManager.print(this.#customer.lottoResultToString(DEFAULT_VALUES.RANK.THIRD));
    OutputManager.print(this.#customer.lottoResultToString(DEFAULT_VALUES.RANK.SECOND));
    OutputManager.print(this.#customer.lottoResultToString(DEFAULT_VALUES.RANK.FIRST));
    OutputManager.printYield(this.#customer.calculateYield());
  }
}

export default Controller;
