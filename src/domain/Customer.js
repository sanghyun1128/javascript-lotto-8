import Validation from '../utils/Validation.js';

import MESSAGES from '../consts/messages.js';
import DEFAULT_VALUES from '../consts/defaultValues.js';

class Customer {
  #balance;

  #ownedLottos;

  #lottoResults;

  #yieldValue;

  constructor(balance) {
    Validation.validateCustomerBalance(balance);
    this.#balance = balance;
    this.#ownedLottos = [];
    this.#lottoResults = DEFAULT_VALUES.LOTTO_RESULTS_INITIALIZER;
    this.#yieldValue = 0;
  }

  addLotto(lotto) {
    this.#ownedLottos.push(lotto);
  }

  ownedLottosCount() {
    return this.#ownedLottos.length;
  }

  canAfford(amount) {
    return this.#balance >= amount;
  }

  checkLottoResults(LottoShop) {
    const results = this.#ownedLottos.map((lotto) => LottoShop.evaluateLotto(lotto));

    results.forEach((result) => {
      if (result.match === 6) this.#lottoResults[DEFAULT_VALUES.RANK.FIRST].count += 1;
      else if (result.match === 5 && result.bonus)
        this.#lottoResults[DEFAULT_VALUES.RANK.SECOND].count += 1;
      else if (result.match === 5) this.#lottoResults[DEFAULT_VALUES.RANK.THIRD].count += 1;
      else if (result.match === 4) this.#lottoResults[DEFAULT_VALUES.RANK.FOURTH].count += 1;
      else if (result.match === 3) this.#lottoResults[DEFAULT_VALUES.RANK.FIFTH].count += 1;
      else this.#lottoResults[DEFAULT_VALUES.RANK.LAST_PLACE].count += 1;
    });
  }

  calculateYield() {
    Validation.validateYieldCalculationPrerequisites(this.#ownedLottos, this.#lottoResults);
    const profit = Object.values(this.#lottoResults).reduce(
      (acc, result) => acc + result.prize * result.count,
      0,
    );
    const cost = this.#ownedLottos.length * DEFAULT_VALUES.DOMAIN.LOTTO_PRICE;
    const yieldValue = (profit / cost) * 100;

    const factor = 10 ** DEFAULT_VALUES.FORMAT.ROUNDING_DECIMAL_PLACES;
    this.#yieldValue = Math.round(yieldValue * factor) / factor;

    return this.#yieldValue;
  }

  ownedLottosToString() {
    let string = '';
    this.#ownedLottos.forEach((lotto) => {
      string += lotto.numbersToString();
      string += '\n';
    });

    return string;
  }

  ownedLottosCountToString() {
    return MESSAGES.INFO.PURCHASE_COUNT(this.ownedLottosCount());
  }

  lottoResultToString(rank) {
    const result = this.#lottoResults[rank];
    if (!result) return '';
    if (result.bonus) {
      return MESSAGES.RESULT.BONUS_RANK(result.match, result.prize, result.count);
    }
    return MESSAGES.RESULT.RANK(result.match, result.prize, result.count);
  }

  yieldValueToString() {
    return MESSAGES.INFO.YIELD(this.#yieldValue);
  }

  /**
   * This method is only called from LottoShop. Do not call it directly from outside.
   * @private
   */
  purchase(amount) {
    this.#balance -= amount;
  }
}

export default Customer;
