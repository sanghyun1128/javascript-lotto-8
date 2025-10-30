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
    this.#lottoResults = [];
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
    results.forEach((result) => this.#lottoResults.push(result));
  }

  calculateYield() {
    Customer.#validateCalculateYieldReady(this.#ownedLottos, this.#lottoResults);
    const profit = this.#lottoResults.reduce((acc, cur) => acc + cur.prize, 0);
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
    if (ownedLottos.length === 0) throw new Error(ERROR_MESSAGES.LOTTO.NO_OWNED_LOTTO);
    if (lottoResults.length === 0) throw new Error(ERROR_MESSAGES.LOTTO.MUST_CHECK_RESULTS);
    if (lottoResults.length !== ownedLottos.length) throw new Error(ERROR_MESSAGES.ETC.UNKNOWN);
  }
}

export default Customer;
