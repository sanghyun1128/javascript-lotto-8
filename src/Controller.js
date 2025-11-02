import OutputManager from './ui/OutputManager.js';
import InputManager from './ui/InputManager.js';
import Customer from './domain/Customer.js';
import LottoShop from './domain/LottoShop.js';

import MESSAGES from './consts/messages.js';
import DEFAULT_VALUES from './consts/defaultValues.js';

class Controller {
  #customer;

  #shop;

  constructor() {
    this.#customer = null;
    this.#shop = new LottoShop();
  }

  async requestBalance() {
    const balance = await InputManager.getInteger(MESSAGES.REQUEST.BALANCE);
    OutputManager.printEmptyLine();

    this.#customer = new Customer(balance);
  }

  buyLottosAndPrint() {
    while (this.#customer.canAfford(DEFAULT_VALUES.DOMAIN.LOTTO_PRICE)) {
      this.#shop.buyLotto(this.#customer);
    }

    OutputManager.print(this.#customer.ownedLottosCountToString());
    OutputManager.print(this.#customer.ownedLottosToString());
  }

  async requestWinningNumbers() {
    const winningNumbers = await InputManager.getIntegerList(MESSAGES.REQUEST.WINNING_NUMBERS);
    OutputManager.printEmptyLine();

    this.#shop.winningNumbers = winningNumbers;
  }

  async requestBonusNumber() {
    const bonusNumber = await InputManager.getInteger(MESSAGES.REQUEST.BONUS_NUMBER);
    OutputManager.printEmptyLine();

    this.#shop.bonusNumber = bonusNumber;
  }

  checkResultsAndPrint() {
    this.#customer.checkLottoResults(this.#shop);
    this.#customer.calculateYield();

    OutputManager.print(MESSAGES.RESULT.HEADER);
    OutputManager.print(MESSAGES.RESULT.SEPARATOR);
    OutputManager.print(this.#customer.lottoResultToString(DEFAULT_VALUES.RANK.FIFTH));
    OutputManager.print(this.#customer.lottoResultToString(DEFAULT_VALUES.RANK.FOURTH));
    OutputManager.print(this.#customer.lottoResultToString(DEFAULT_VALUES.RANK.THIRD));
    OutputManager.print(this.#customer.lottoResultToString(DEFAULT_VALUES.RANK.SECOND));
    OutputManager.print(this.#customer.lottoResultToString(DEFAULT_VALUES.RANK.FIRST));
    OutputManager.print(this.#customer.yieldValueToString());
  }
}

export default Controller;
