import DEFAULT_VALUES from '../consts/defaultValues.js';
import ERROR_MESSAGES from '../consts/errorMessages.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    Lotto.#validateNumbersLength(numbers);
    Lotto.#validateNoDuplicate(numbers);
    numbers.forEach((number) => Lotto.#validateNumberRange(number));
    Lotto.#validateIsOrderASC(numbers);

    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  static #validateNumbersLength(numbers) {
    if (numbers.length !== DEFAULT_VALUES.DOMAIN.LOTTO_NUMBER_COUNT) {
      throw new Error(ERROR_MESSAGES.LOTTO.NUMBERS_LENGTH);
    }
  }

  static #validateNoDuplicate(numbers) {
    const unique = new Set(numbers);
    if (unique.size !== numbers.length) {
      throw new Error(ERROR_MESSAGES.LOTTO.DUPLICATE_NUMBERS);
    }
  }

  static #validateNumberRange(number) {
    if (
      number < DEFAULT_VALUES.DOMAIN.MIN_LOTTO_VALUE ||
      number > DEFAULT_VALUES.DOMAIN.MAX_LOTTO_VALUE
    )
      throw new Error(ERROR_MESSAGES.LOTTO.NUMBER_RANGE);
  }

  static #validateIsOrderASC(numbers) {
    for (let i = 1; i < numbers.length; i += 1) {
      if (numbers[i] < numbers[i - 1]) {
        throw new Error(ERROR_MESSAGES.LOTTO.MUST_ORDER_ASC);
      }
    }
  }
}

export default Lotto;
