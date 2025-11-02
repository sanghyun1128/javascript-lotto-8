import DEFAULT_VALUES from '../consts/defaultValues.js';
import ERROR_MESSAGES from '../consts/errorMessages.js';

class Validation {
  /**
   * Validates the count of lotto numbers array
   * @param {number} length - Length of numbers array
   * @throws {Error} If count is not equal to LOTTO_NUMBER_COUNT
   */
  static validateLottoNumbersLength(length) {
    if (length !== DEFAULT_VALUES.DOMAIN.LOTTO_NUMBER_COUNT) {
      throw new Error(ERROR_MESSAGES.LOTTO.NUMBERS_LENGTH);
    }
  }

  /**
   * Validates that a lotto number is within the valid range
   * @param {number} number - Number to validate
   * @throws {Error} If number is out of range
   */
  static validateLottoNumberRange(number) {
    if (
      number < DEFAULT_VALUES.DOMAIN.MIN_LOTTO_VALUE ||
      number > DEFAULT_VALUES.DOMAIN.MAX_LOTTO_VALUE
    ) {
      throw new Error(ERROR_MESSAGES.LOTTO.NUMBER_RANGE);
    }
  }

  /**
   * Validates that lotto numbers are in ascending order
   * @param {number[]} numbers - Array of numbers to check
   * @throws {Error} If not in ascending order
   */
  static validateLottoNumbersAscendingOrder(numbers) {
    for (let i = 1; i < numbers.length; i += 1) {
      if (numbers[i] < numbers[i - 1]) {
        throw new Error(ERROR_MESSAGES.LOTTO.MUST_ORDER_ASC);
      }
    }
  }

  /**
   * Validates that there are no duplicate numbers in the array
   * @param {number[]} numbers - Array of numbers to check
   * @throws {Error} If duplicates are found
   */
  static validateUniqueNumbers(numbers) {
    const unique = new Set(numbers);
    if (unique.size !== numbers.length) {
      throw new Error(ERROR_MESSAGES.LOTTO.DUPLICATE_NUMBERS);
    }
  }

  /**
   * Validates customer balance
   * @param {number} balance - Balance to validate
   * @throws {Error} If balance is negative or not multiple of unit
   */
  static validateCustomerBalance(balance) {
    if (balance < 0) {
      throw new Error(ERROR_MESSAGES.BALANCE.MUST_POSITIVE);
    }
    if (balance % DEFAULT_VALUES.DOMAIN.BALANCE_UNIT !== 0) {
      throw new Error(ERROR_MESSAGES.BALANCE.MUST_MULTIPLE_OF_UNIT);
    }
  }

  /**
   * Validates if yield calculation prerequisites are met
   * @param {Lotto[]} ownedLottos - Array of owned lottos
   * @param {Object} lottoResults - Lotto results object
   * @throws {Error} If not ready for calculation
   */
  static validateYieldCalculationPrerequisites(ownedLottos, lottoResults) {
    const lottoCount = ownedLottos.length;
    const resultCount = Object.values(lottoResults).reduce((acc, result) => acc + result.count, 0);

    if (lottoCount === 0) {
      throw new Error(ERROR_MESSAGES.LOTTO.NO_OWNED_LOTTO);
    }
    if (resultCount === 0) {
      throw new Error(ERROR_MESSAGES.LOTTO.MUST_CHECK_RESULTS);
    }
    if (lottoCount !== resultCount) {
      throw new Error(ERROR_MESSAGES.ETC.UNKNOWN);
    }
  }

  /**
   * Validates if lotto was purchased from the shop
   * @param {Lotto} lotto - Lotto to validate
   * @param {Lotto[]} soldLottos - Array of sold lottos
   * @throws {Error} If lotto was not sold
   */
  static validateLottoPurchased(lotto, soldLottos) {
    if (!soldLottos.includes(lotto)) {
      throw new Error(ERROR_MESSAGES.LOTTO.IS_NOT_SOLD);
    }
  }

  /**
   * Validates if winning numbers and bonus number are set for evaluation
   * @param {number[]} winningNumbers - Winning numbers
   * @param {number} bonusNumber - Bonus number
   * @throws {Error} If not ready for evaluation
   */
  static validateLottoEvaluationPrerequisites(winningNumbers, bonusNumber) {
    if (winningNumbers === undefined || bonusNumber === undefined) {
      throw new Error(ERROR_MESSAGES.LOTTO.EVALUATION_NOT_READY);
    }
  }

  /**
   * Validates integer input string
   * @param {string} integer - String to validate as integer
   * @throws {Error} If not a valid integer
   */
  static validateIntegerInput(integer) {
    if (integer === undefined || integer === null || integer.length === 0) {
      throw new Error(ERROR_MESSAGES.IO.NO_INPUT);
    }
    if (Number.isNaN(+integer)) {
      throw new Error(ERROR_MESSAGES.IO.MUST_INPUT_NUMBER);
    }
    if (!Number.isSafeInteger(+integer)) {
      throw new Error(ERROR_MESSAGES.IO.MUST_INPUT_INTEGER);
    }
  }
}

export default Validation;
