import { MissionUtils } from '@woowacourse/mission-utils';

import Lotto from './Lotto.js';
import DEFAULT_VALUES from '../consts/defaultValues.js';
import ERROR_MESSAGES from '../consts/errorMessages.js';

class LottoShop {
  #winningNumbers;

  #bonusNumber;

  #soldLottos;

  constructor() {
    this.#winningNumbers = undefined;
    this.#bonusNumber = undefined;
    this.#soldLottos = [];
  }

  get soldLottos() {
    return this.#soldLottos;
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

  buyLotto(customer) {
    if (customer.balance < DEFAULT_VALUES.DOMAIN.LOTTO_PRICE) return false;

    const newLotto = this.#makeLotto();
    customer.payMoney(DEFAULT_VALUES.DOMAIN.LOTTO_PRICE);
    customer.addLotto(newLotto);
    return true;
  }

  #makeLotto() {
    const lottoNumbers = MissionUtils.Random.pickUniqueNumbersInRange(
      DEFAULT_VALUES.DOMAIN.MIN_LOTTO_VALUE,
      DEFAULT_VALUES.DOMAIN.MAX_LOTTO_VALUE,
      DEFAULT_VALUES.DOMAIN.LOTTO_NUMBER_COUNT,
    );

    lottoNumbers.sort((a, b) => a - b);

    const lotto = new Lotto(lottoNumbers);
    this.#soldLottos.push(lotto);

    return lotto;
  }

  evaluateLotto(lotto) {
    LottoShop.#validateSoldLotto(lotto, this.#soldLottos);
    LottoShop.#validateEvaluationReady(this.#winningNumbers, this.#bonusNumber);

    const matchCount = this.#calculateMatchCount(lotto.numbers);
    const bonusMatch = this.#calculateBonusMatch(lotto.numbers);
    const prize = LottoShop.#calculatePrize(matchCount, bonusMatch);

    return {
      match: matchCount,
      bonus: bonusMatch,
      prize,
    };
  }

  #calculateMatchCount(lottoNumbers) {
    return lottoNumbers.filter((n) => this.#winningNumbers.includes(n)).length;
  }

  #calculateBonusMatch(lottoNumbers) {
    return lottoNumbers.includes(this.#bonusNumber);
  }

  static #calculatePrize(matchCount, bonusMatch) {
    if (matchCount === 6) return DEFAULT_VALUES.PRIZE.FIRST;
    if (matchCount === 5 && bonusMatch) return DEFAULT_VALUES.PRIZE.SECOND;
    if (matchCount === 5) return DEFAULT_VALUES.PRIZE.THIRD;
    if (matchCount === 4) return DEFAULT_VALUES.PRIZE.FOURTH;
    if (matchCount === 3) return DEFAULT_VALUES.PRIZE.FIFTH;
    return DEFAULT_VALUES.PRIZE.LAST_PLACE;
  }

  static #validateSoldLotto(lotto, soldLottos) {
    if (!soldLottos.includes(lotto)) throw new Error(ERROR_MESSAGES.LOTTO.IS_NOT_SOLD);
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
}

export default LottoShop;
