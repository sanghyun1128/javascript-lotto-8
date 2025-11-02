import DEFAULT_VALUES from '../consts/defaultValues.js';
import Validation from '../utils/Validation.js';

class Customer {
  #balance;

  #ownedLottos;

  #lottoResults;

  constructor(balance) {
    Validation.validateCustomerBalance(balance);
    this.#balance = balance;
    this.#ownedLottos = [];
    this.#lottoResults = {
      first: { match: 6, bonus: false, prize: DEFAULT_VALUES.PRIZE.FIRST, count: 0 },
      second: { match: 5, bonus: true, prize: DEFAULT_VALUES.PRIZE.SECOND, count: 0 },
      third: { match: 5, bonus: false, prize: DEFAULT_VALUES.PRIZE.THIRD, count: 0 },
      fourth: { match: 4, bonus: false, prize: DEFAULT_VALUES.PRIZE.FOURTH, count: 0 },
      fifth: { match: 3, bonus: false, prize: DEFAULT_VALUES.PRIZE.FIFTH, count: 0 },
      last: { match: 0, bonus: false, prize: DEFAULT_VALUES.PRIZE.LAST_PLACE, count: 0 },
    };
  }

  get balance() {
    return this.#balance;
  }

  get ownedLottos() {
    return this.#ownedLottos;
  }

  get lottoResults() {
    return this.#lottoResults;
  }

  addLotto(lotto) {
    this.#ownedLottos.push(lotto);
  }

  payMoney(amount) {
    this.#balance -= amount;
  }

  checkLottoResults(LottoShop) {
    const results = this.#ownedLottos.map((lotto) => LottoShop.evaluateLotto(lotto));

    results.forEach((result) => {
      if (result.match === 6) this.#lottoResults.first.count += 1;
      else if (result.match === 5 && result.bonus) this.#lottoResults.second.count += 1;
      else if (result.match === 5) this.#lottoResults.third.count += 1;
      else if (result.match === 4) this.#lottoResults.fourth.count += 1;
      else if (result.match === 3) this.#lottoResults.fifth.count += 1;
      else this.#lottoResults.last.count += 1;
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
    return Math.round(yieldValue * factor) / factor;
  }
}

export default Customer;
