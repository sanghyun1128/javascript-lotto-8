import DEFAULT_VALUES from '../../src/consts/defaultValues.js';
import ERROR_MESSAGES from '../../src/consts/errorMessages.js';
import Lotto from '../../src/domain/Lotto.js';

describe('로또 클래스 테스트', () => {
  test('로또 번호의 개수가 6개가 넘어가면 에러 발생', () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, 6, 7])).toThrow(ERROR_MESSAGES.LOTTO.NUMBERS_LENGTH);
  });

  test('로또 번호에 중복된 숫자가 있으면 에러 발생', () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, 5])).toThrow(ERROR_MESSAGES.LOTTO.DUPLICATE_NUMBERS);
  });

  test('로또 번호에 범위를 벗어난 숫자가 있으면 에러 발생', () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, DEFAULT_VALUES.DOMAIN.MAX_LOTTO_VALUE + 1])).toThrow(
      ERROR_MESSAGES.LOTTO.NUMBER_RANGE,
    );
  });

  test('로또 번호가 정렬 되어 있지 않으면 에러 발생', () => {
    expect(() => new Lotto([1, 2, 6, 4, 5, 3])).toThrow(ERROR_MESSAGES.LOTTO.MUST_ORDER_ASC);
  });
});
