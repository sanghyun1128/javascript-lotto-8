import Validation from '../utils/Validation.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    Validation.validateLottoNumbersLength(numbers.length);
    Validation.validateUniqueNumbers(numbers);
    numbers.forEach((number) => Validation.validateLottoNumberRange(number));
    Validation.validateLottoNumbersAscendingOrder(numbers);

    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
