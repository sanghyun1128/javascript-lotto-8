import { MissionUtils } from '@woowacourse/mission-utils';

import Lotto from './Lotto.js';
import DEFAULT_VALUES from '../consts/defaultValues.js';
import Validation from '../utils/Validation.js';

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
    Validation.validateLottoNumbersLength(winningNumbers.length);
    winningNumbers.forEach((number) => Validation.validateLottoNumberRange(number));

    if (this.#bonusNumber !== undefined)
      Validation.validateUniqueNumbers([this.#bonusNumber, ...winningNumbers]);

    this.#winningNumbers = winningNumbers;
  }

  set bonusNumber(bonusNumber) {
    Validation.validateLottoNumberRange(bonusNumber);

    if (this.#winningNumbers !== undefined)
      Validation.validateUniqueNumbers([bonusNumber, ...this.#winningNumbers]);

    this.#bonusNumber = bonusNumber;
  }

  buyLotto(customer) {
    if (!customer.canAfford(DEFAULT_VALUES.DOMAIN.LOTTO_PRICE)) return false;

    customer.purchase(DEFAULT_VALUES.DOMAIN.LOTTO_PRICE);
    const newLotto = this.#makeLotto();
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
    Validation.validateLottoPurchased(lotto, this.#soldLottos);
    Validation.validateLottoEvaluationPrerequisites(this.#winningNumbers, this.#bonusNumber);

    const matchCount = lotto.calculateMatchCount(this.#winningNumbers);
    const bonusMatch = lotto.calculateBonusMatch(this.#bonusNumber);
    const prize = LottoShop.#calculatePrize(matchCount, bonusMatch);

    return {
      match: matchCount,
      bonus: bonusMatch,
      prize,
    };
  }

  static #calculatePrize(matchCount, bonusMatch) {
    if (matchCount === 6) return DEFAULT_VALUES.PRIZE.FIRST;
    if (matchCount === 5 && bonusMatch) return DEFAULT_VALUES.PRIZE.SECOND;
    if (matchCount === 5) return DEFAULT_VALUES.PRIZE.THIRD;
    if (matchCount === 4) return DEFAULT_VALUES.PRIZE.FOURTH;
    if (matchCount === 3) return DEFAULT_VALUES.PRIZE.FIFTH;
    return DEFAULT_VALUES.PRIZE.LAST_PLACE;
  }
}

export default LottoShop;
