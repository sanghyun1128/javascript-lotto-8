import DEFAULT_VALUES from '../consts/defaultValues.js';
import ERROR_MESSAGES from '../consts/errorMessages.js';

class Customer {
  #balance;

  constructor(balance) {
    this.#validateBalance(balance);
    this.#balance = balance;
  }

  get balance() {
    return this.#balance;
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
  #validateBalance(balance) {
    if (balance < 0) throw new Error(ERROR_MESSAGES.BALANCE.MUST_POSITIVE);
    if (balance % DEFAULT_VALUES.DOMAIN.BALANCE_UNIT !== 0)
      throw new Error(ERROR_MESSAGES.BALANCE.MUST_MULTIPLE_OF_UNIT);
  }
}

export default Customer;
