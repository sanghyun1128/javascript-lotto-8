import { MissionUtils } from '@woowacourse/mission-utils';

import LottoShop from '../../src/domain/LottoShop.js';

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
