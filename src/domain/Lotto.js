import Validation from '../utils/Validation.js';

import MESSAGES from '../consts/messages.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    Validation.validateLottoNumbersLength(numbers.length);
    Validation.validateUniqueNumbers(numbers);
    numbers.forEach((number) => Validation.validateLottoNumberRange(number));
    Validation.validateLottoNumbersAscendingOrder(numbers);

    this.#numbers = numbers;
  }

  numbersToString() {
    return `${MESSAGES.SYMBOLS.LEFT_BRACKET}${this.#numbers.join(MESSAGES.SYMBOLS.ITEM_SEPARATOR)}${MESSAGES.SYMBOLS.RIGHT_BRACKET}`;
  }

  calculateMatchCount(winningNumbers) {
    return this.#numbers.filter((n) => winningNumbers.includes(n)).length;
  }

  calculateBonusMatch(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;
