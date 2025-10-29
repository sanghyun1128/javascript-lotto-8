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

    expect(() => new LottoShop(winningNumbers, bonusNumber)).toThrow(
      ERROR_MESSAGES.LOTTO.DUPLICATE_NUMBERS,
    );
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
    const bonusNumber = i;

    expect(() => new LottoShop(winningNumbers, bonusNumber)).toThrow(
      ERROR_MESSAGES.LOTTO.WINNING_NUMBERS_LENGTH,
    );
  });

  test('당첨번호의 갯수가 정확할 경우 정상 처리', () => {
    const winningNumbers = [];
    let i = 0;
    for (; i < DEFAULT_VALUES.DOMAIN.LOTTO_NUMBER_COUNT; i += 1) {
      winningNumbers.push(i + 10);
    }
    const bonusNumber = i;

    expect(() => new LottoShop(winningNumbers, bonusNumber)).not.toThrow();
  });

  test.each([
    [DEFAULT_VALUES.DOMAIN.MAX_LOTTO_VALUE + 1],
    [DEFAULT_VALUES.DOMAIN.MIN_LOTTO_VALUE - 1],
  ])('값이 범위를 벗어날 경우 에러 발생', (bonusNumber) => {
    const winningNumbers = [2, 1, 3, 5, 6, 4];

    expect(() => new LottoShop(winningNumbers, bonusNumber)).toThrow(
      ERROR_MESSAGES.LOTTO.NUMBER_RANGE,
    );
  });

  test.each([[DEFAULT_VALUES.DOMAIN.MAX_LOTTO_VALUE], [DEFAULT_VALUES.DOMAIN.MIN_LOTTO_VALUE]])(
    '경계값일 경우 정상 처리',
    (bonusNumber) => {
      const winningNumbers = [2, 11, 3, 5, 6, 4];

      expect(() => new LottoShop(winningNumbers, bonusNumber)).not.toThrow();
    },
  );
});
