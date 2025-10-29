import { MissionUtils } from '@woowacourse/mission-utils';

import Lotto from './Lotto.js';
import DEFAULT_VALUES from '../consts/defaultValues.js';
import ERROR_MESSAGES from '../consts/errorMessages.js';

class LottoShop {
  #winningNumbers;

  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    LottoShop.#validateLottoNumbersLength(winningNumbers.length);
    winningNumbers.forEach((number) => LottoShop.#validateLottoNumberRange(number));
    LottoShop.#validateLottoNumberRange(bonusNumber);
    LottoShop.#validateNoDuplicates([bonusNumber, ...winningNumbers]);

    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  static #validateLottoNumbersLength(length) {
    if (length !== DEFAULT_VALUES.DOMAIN.LOTTO_NUMBER_COUNT)
      throw new Error(ERROR_MESSAGES.LOTTO.WINNING_NUMBERS_LENGTH);
  }

  static #validateLottoNumberRange(number) {
    if (
      number < DEFAULT_VALUES.DOMAIN.MIN_LOTTO_VALUE ||
      number > DEFAULT_VALUES.DOMAIN.MAX_LOTTO_VALUE
    )
      throw new Error(ERROR_MESSAGES.LOTTO.NUMBER_RANGE);
  }

  static #validateNoDuplicates(array) {
    const unique = new Set(array);
    if (unique.size !== array.length) {
      throw new Error(ERROR_MESSAGES.LOTTO.DUPLICATE_NUMBERS);
    }
  }

  static makeLotto() {
    const lottoNumbers = MissionUtils.Random.pickUniqueNumbersInRange(
      DEFAULT_VALUES.DOMAIN.MIN_LOTTO_VALUE,
      DEFAULT_VALUES.DOMAIN.MAX_LOTTO_VALUE,
      DEFAULT_VALUES.DOMAIN.LOTTO_NUMBER_COUNT,
    );

    lottoNumbers.sort((a, b) => a - b);

    return new Lotto(lottoNumbers);
  }
}

export default LottoShop;
