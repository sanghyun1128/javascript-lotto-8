import DEFAULT_VALUES from '../consts/defaultValues.js';
import ERROR_MESSAGES from '../consts/errorMessages.js';

class Customer {
  #balance;

  #ownedLottos;

  #lottoResults;

  constructor(balance) {
    Customer.#validateBalance(balance);
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
    Customer.#validateCalculateYieldReady(this.#ownedLottos, this.#lottoResults);
    const profit = Object.values(this.#lottoResults).reduce(
      (acc, result) => acc + result.prize * result.count,
      0,
    );
    const cost = this.#ownedLottos.length * DEFAULT_VALUES.DOMAIN.LOTTO_PRICE;

    const yieldValue = (profit / cost) * 100;
    const factor = 10 ** DEFAULT_VALUES.FORMAT.ROUNDING_DECIMAL_PLACES;
    return Math.round(yieldValue * factor) / factor;
  }

  /**
   * 잔액 유효성 검사
   * - 음수인지 검사
   * - 설정된 단위로 나누어떨어지는지 검사
   *
   * 유효하지 않은 경우 에러 메시지를 담은 Error를 던짐
   *
   * @param {number} balance - 검사할 잔액
   * @throws {Error} 유효성 검사 실패 시
   */
  static #validateBalance(balance) {
    if (balance < 0) throw new Error(ERROR_MESSAGES.BALANCE.MUST_POSITIVE);
    if (balance % DEFAULT_VALUES.DOMAIN.BALANCE_UNIT !== 0)
      throw new Error(ERROR_MESSAGES.BALANCE.MUST_MULTIPLE_OF_UNIT);
  }

  static #validateCalculateYieldReady(ownedLottos, lottoResults) {
    const lottoCount = ownedLottos.length;
    const resultCount = Object.values(lottoResults).reduce((acc, result) => acc + result.count, 0);

    if (lottoCount === 0) throw new Error(ERROR_MESSAGES.LOTTO.NO_OWNED_LOTTO);
    if (resultCount === 0) throw new Error(ERROR_MESSAGES.LOTTO.MUST_CHECK_RESULTS);
    if (lottoCount !== resultCount) throw new Error(ERROR_MESSAGES.ETC.UNKNOWN);
  }
}

export default Customer;
