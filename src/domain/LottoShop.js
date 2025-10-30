import { MissionUtils } from '@woowacourse/mission-utils';

import Lotto from './Lotto.js';
import DEFAULT_VALUES from '../consts/defaultValues.js';
import ERROR_MESSAGES from '../consts/errorMessages.js';

class LottoShop {
  #winningNumbers;

  #bonusNumber;

  constructor() {
    this.#winningNumbers = undefined;
    this.#bonusNumber = undefined;
  }

  set winningNumbers(winningNumbers) {
    LottoShop.#validateLottoNumbersLength(winningNumbers.length);
    winningNumbers.forEach((number) => LottoShop.#validateLottoNumberRange(number));

    if (this.#bonusNumber !== undefined)
      LottoShop.#validateNoDuplicates([this.#bonusNumber, ...winningNumbers]);

    this.#winningNumbers = winningNumbers;
  }

  set bonusNumber(bonusNumber) {
    LottoShop.#validateLottoNumberRange(bonusNumber);

    if (this.#winningNumbers !== undefined)
      LottoShop.#validateNoDuplicates([bonusNumber, ...this.#winningNumbers]);

    this.#bonusNumber = bonusNumber;
  }

  evaluateLotto(lotto) {
    LottoShop.#validateEvaluationReady(this.#winningNumbers, this.#bonusNumber);

    const rank = this.#calculateRank(lotto.numbers);
    const prize = LottoShop.#calculatePrize(rank);

    return {
      rank,
      prize,
    };
  }

  #calculateRank(lottoNumbers) {
    const match = lottoNumbers.filter((n) => this.#winningNumbers.includes(n)).length;
    const bonusMatch = lottoNumbers.includes(this.#bonusNumber);
    if (match === 6) return 1;
    if (match === 5 && bonusMatch) return 2;
    if (match === 5) return 3;
    if (match === 4) return 4;
    if (match === 3) return 5;
    return 0;
  }

  static #calculatePrize(rank) {
    const prizeByRank = {
      1: DEFAULT_VALUES.PRIZE.FIRST,
      2: DEFAULT_VALUES.PRIZE.SECOND,
      3: DEFAULT_VALUES.PRIZE.THIRD,
      4: DEFAULT_VALUES.PRIZE.FOURTH,
      5: DEFAULT_VALUES.PRIZE.FIFTH,
    };
    return prizeByRank[rank] ?? DEFAULT_VALUES.PRIZE.LAST_PLACE;
  }

  static #validateEvaluationReady(winningNumbers, bonusNumber) {
    if (winningNumbers === undefined || bonusNumber === undefined)
      throw new Error(ERROR_MESSAGES.LOTTO.EVALUATION_NOT_READY);
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
