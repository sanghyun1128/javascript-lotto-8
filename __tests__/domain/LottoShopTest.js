import { MissionUtils } from '@woowacourse/mission-utils';

import LottoShop from '../../src/domain/LottoShop.js';
import ERROR_MESSAGES from '../../src/consts/errorMessages.js';
import DEFAULT_VALUES from '../../src/consts/defaultValues.js';
import Customer from '../../src/domain/Customer.js';
import Lotto from '../../src/domain/Lotto.js';

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce(
    (acc, number) => acc.mockReturnValueOnce(number),
    MissionUtils.Random.pickUniqueNumbersInRange,
  );
};

describe('로또 판매 테스트', () => {
  test('판매시 판매 목록에 저장되는지 확인', () => {
    const randomResult = [2, 1, 3, 5, 6, 4];

    const customer = new Customer(DEFAULT_VALUES.DOMAIN.LOTTO_PRICE);
    const shop = new LottoShop();
    mockRandoms([randomResult]);
    shop.buyLotto(customer);

    expect(shop.soldLottos[0]).toEqual(customer.ownedLottos[0]);
  });

  test('판매한 로또의 숫자 순서가 정렬되는지 확인', () => {
    const randomResult = [2, 1, 3, 5, 6, 4];

    const customer = new Customer(DEFAULT_VALUES.DOMAIN.LOTTO_PRICE);
    const shop = new LottoShop();
    mockRandoms([randomResult]);

    expect(() => shop.buyLotto(customer)).not.toThrow();
  });

  test('고객 잔액 부족시 구매 실패', () => {
    const randomResult = [2, 1, 3, 5, 6, 4];

    const customer = new Customer(DEFAULT_VALUES.DOMAIN.LOTTO_PRICE);
    const shop = new LottoShop();
    mockRandoms([randomResult, randomResult]);
    const result1 = shop.buyLotto(customer);
    const result2 = shop.buyLotto(customer);

    expect(result1).toBeTruthy();
    expect(result2).toBeFalsy();
    expect(shop.soldLottos.length).toBe(1);
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
    }).toThrow(ERROR_MESSAGES.LOTTO.NUMBERS_LENGTH);
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
    [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], 7, 6, false, DEFAULT_VALUES.PRIZE.FIRST],
    [[1, 2, 3, 4, 5, 7], [1, 2, 3, 4, 5, 6], 7, 5, true, DEFAULT_VALUES.PRIZE.SECOND],
    [[1, 2, 3, 4, 5, 11], [1, 2, 3, 4, 5, 6], 7, 5, false, DEFAULT_VALUES.PRIZE.THIRD],
    [[1, 2, 3, 4, 12, 11], [1, 2, 3, 4, 5, 6], 7, 4, false, DEFAULT_VALUES.PRIZE.FOURTH],
    [[1, 2, 3, 13, 12, 11], [1, 2, 3, 4, 5, 6], 7, 3, false, DEFAULT_VALUES.PRIZE.FIFTH],
    [[1, 2, 14, 13, 12, 11], [1, 2, 3, 4, 5, 6], 7, 2, false, DEFAULT_VALUES.PRIZE.LAST_PLACE],
  ])(
    '등수, 당첨금 결정 확인',
    (lottoNumbers, winningNumbers, bonusNumber, matchCount, bonusMatch, prize) => {
      const customer = new Customer(DEFAULT_VALUES.DOMAIN.LOTTO_PRICE);
      const shop = new LottoShop();
      mockRandoms([lottoNumbers]);
      shop.buyLotto(customer);
      const lotto = customer.ownedLottos[0];
      shop.winningNumbers = winningNumbers;
      shop.bonusNumber = bonusNumber;

      const result = shop.evaluateLotto(lotto);
      expect(result).toEqual({ match: matchCount, bonus: bonusMatch, prize });
    },
  );

  test('당첨번호가 입력되지 않았으면 에러 발생', () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const customer = new Customer(DEFAULT_VALUES.DOMAIN.LOTTO_PRICE);
    const shop = new LottoShop();
    mockRandoms([lottoNumbers]);
    shop.buyLotto(customer);
    shop.bonusNumber = bonusNumber;

    const lotto = customer.ownedLottos[0];
    expect(() => {
      shop.evaluateLotto(lotto);
    }).toThrow(ERROR_MESSAGES.LOTTO.EVALUATION_NOT_READY);
  });

  test('보너스번호가 입력되지 않았으면 에러 발생', () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const winningNumbers = [2, 1, 3, 5, 6, 4];

    const customer = new Customer(DEFAULT_VALUES.DOMAIN.LOTTO_PRICE);
    const shop = new LottoShop();
    mockRandoms([lottoNumbers]);
    shop.buyLotto(customer);
    shop.winningNumbers = winningNumbers;

    const lotto = customer.ownedLottos[0];
    expect(() => {
      shop.evaluateLotto(lotto);
    }).toThrow(ERROR_MESSAGES.LOTTO.EVALUATION_NOT_READY);
  });

  test('판매되지 않은 로또 이면 에러 발생', () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];
    const winningNumbers = [2, 1, 3, 5, 6, 4];
    const bonusNumber = 7;

    const shop = new LottoShop();
    shop.winningNumbers = winningNumbers;
    shop.bonusNumber = bonusNumber;

    const lotto = new Lotto(lottoNumbers);
    expect(() => {
      shop.evaluateLotto(lotto);
    }).toThrow(ERROR_MESSAGES.LOTTO.IS_NOT_SOLD);
  });
});
