import { MissionUtils } from '@woowacourse/mission-utils';

import LottoShop from '../../src/domain/LottoShop.js';
import ERROR_MESSAGES from '../../src/consts/errorMessages.js';
import DEFAULT_VALUES from '../../src/consts/defaultValues.js';

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce(
    (acc, number) => acc.mockReturnValueOnce(number),
    MissionUtils.Random.pickUniqueNumbersInRange,
  );
};

describe('로또 발행 테스트', () => {
  test('랜덤 값이 정렬 되는지 확인', () => {
    const randomResult = [2, 1, 3, 5, 6, 4];
    const output = [1, 2, 3, 4, 5, 6];

    mockRandoms([randomResult]);
    const lotto = LottoShop.makeLotto();

    expect(lotto.numbers).toEqual(output);
  });
});

describe('당첨, 보너스 번호 저장 테스트', () => {
  test('겹치는 값이 있는 경우 에러 발생', () => {
    const winningNumbers = [2, 1, 3, 5, 6, 4];
    const bonusNumber = 1;
    const shop = new LottoShop();

    expect(() => {
      shop.winningNumbers = winningNumbers;
    }).not.toThrow();
    expect(() => {
      shop.bonusNumber = bonusNumber;
    }).toThrow(ERROR_MESSAGES.LOTTO.DUPLICATE_NUMBERS);
  });

  test.each([
    [DEFAULT_VALUES.DOMAIN.LOTTO_NUMBER_COUNT + 1],
    [DEFAULT_VALUES.DOMAIN.LOTTO_NUMBER_COUNT - 1],
  ])('당첨번호의 갯수가 정확하지 않을 경우 에러 발생', () => {
    const winningNumbers = [];
    let i = 0;
    for (; i < DEFAULT_VALUES.DOMAIN.LOTTO_NUMBER_COUNT + 1; i += 1) {
      winningNumbers.push(i + 10);
    }
    const shop = new LottoShop();

    expect(() => {
      shop.winningNumbers = winningNumbers;
    }).toThrow(ERROR_MESSAGES.LOTTO.WINNING_NUMBERS_LENGTH);
  });

  test('당첨번호의 갯수가 정확할 경우 정상 처리', () => {
    const winningNumbers = [];
    let i = 0;
    for (; i < DEFAULT_VALUES.DOMAIN.LOTTO_NUMBER_COUNT; i += 1) {
      winningNumbers.push(i + 10);
    }
    const shop = new LottoShop();

    expect(() => {
      shop.winningNumbers = winningNumbers;
    }).not.toThrow();
  });

  test.each([
    [DEFAULT_VALUES.DOMAIN.MAX_LOTTO_VALUE + 1],
    [DEFAULT_VALUES.DOMAIN.MIN_LOTTO_VALUE - 1],
  ])('값이 범위를 벗어날 경우 에러 발생', (bonusNumber) => {
    const shop = new LottoShop();

    expect(() => {
      shop.bonusNumber = bonusNumber;
    }).toThrow(ERROR_MESSAGES.LOTTO.NUMBER_RANGE);
  });

  test.each([[DEFAULT_VALUES.DOMAIN.MAX_LOTTO_VALUE], [DEFAULT_VALUES.DOMAIN.MIN_LOTTO_VALUE]])(
    '경계값일 경우 정상 처리',
    (bonusNumber) => {
      const shop = new LottoShop();

      expect(() => {
        shop.bonusNumber = bonusNumber;
      }).not.toThrow();
    },
  );
});

describe('로또 등수, 당첨금 확인 테스트', () => {
  test.each([
    [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], 7, 1, DEFAULT_VALUES.PRIZE.FIRST],
    [[1, 2, 3, 4, 5, 7], [1, 2, 3, 4, 5, 6], 7, 2, DEFAULT_VALUES.PRIZE.SECOND],
    [[1, 2, 3, 4, 5, 11], [1, 2, 3, 4, 5, 6], 7, 3, DEFAULT_VALUES.PRIZE.THIRD],
    [[1, 2, 3, 4, 12, 11], [1, 2, 3, 4, 5, 6], 7, 4, DEFAULT_VALUES.PRIZE.FOURTH],
    [[1, 2, 3, 13, 12, 11], [1, 2, 3, 4, 5, 6], 7, 5, DEFAULT_VALUES.PRIZE.FIFTH],
    [[1, 2, 14, 13, 12, 11], [1, 2, 3, 4, 5, 6], 7, 0, DEFAULT_VALUES.PRIZE.LAST_PLACE],
  ])('등수, 당첨금 결정 확인', (lottoNumbers, winningNumbers, bonusNumber, rank, prize) => {
    mockRandoms([lottoNumbers]);
    const lotto = LottoShop.makeLotto();
    const shop = new LottoShop();
    shop.winningNumbers = winningNumbers;
    shop.bonusNumber = bonusNumber;

    const result = shop.evaluateLotto(lotto);
    expect(result).toEqual({ rank, prize });
  });

  test('당첨번호가 입력되지 않았으면 에러 발생', () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    mockRandoms([lottoNumbers]);
    const lotto = LottoShop.makeLotto();
    const shop = new LottoShop();
    shop.bonusNumber = bonusNumber;

    expect(() => {
      shop.evaluateLotto(lotto);
    }).toThrow(ERROR_MESSAGES.LOTTO.EVALUATION_NOT_READY);
  });

  test('보너스번호가 입력되지 않았으면 에러 발생', () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const winningNumbers = [2, 1, 3, 5, 6, 4];

    mockRandoms([lottoNumbers]);
    const lotto = LottoShop.makeLotto();
    const shop = new LottoShop();
    shop.winningNumbers = winningNumbers;

    expect(() => {
      shop.evaluateLotto(lotto);
    }).toThrow(ERROR_MESSAGES.LOTTO.EVALUATION_NOT_READY);
  });
});
