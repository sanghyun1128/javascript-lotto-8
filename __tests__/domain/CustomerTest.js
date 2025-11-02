import { MissionUtils } from '@woowacourse/mission-utils';

import Customer from '../../src/domain/Customer.js';
import LottoShop from '../../src/domain/LottoShop.js';
import DEFAULT_VALUES from '../../src/consts/defaultValues.js';
import ERROR_MESSAGES from '../../src/consts/errorMessages.js';

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce(
    (acc, number) => acc.mockReturnValueOnce(number),
    MissionUtils.Random.pickUniqueNumbersInRange,
  );
};

describe('고객 잔액 저장 테스트', () => {
  test.each([
    [DEFAULT_VALUES.DOMAIN.BALANCE_UNIT],
    [DEFAULT_VALUES.DOMAIN.BALANCE_UNIT * 121],
    [Number.parseFloat(DEFAULT_VALUES.DOMAIN.BALANCE_UNIT)],
  ])('정상 동작', (input) => {
    expect(() => new Customer(input)).not.toThrow();
  });

  test('음수 저장 시도시 에러 발생', () => {
    const input = -DEFAULT_VALUES.DOMAIN.BALANCE_UNIT;

    expect(() => new Customer(input)).toThrow(ERROR_MESSAGES.BALANCE.MUST_POSITIVE);
  });

  test('단위 지키지 않는 값 저장시 에러 발생', () => {
    const input = DEFAULT_VALUES.DOMAIN.BALANCE_UNIT * 1.5;

    expect(() => new Customer(input)).toThrow(ERROR_MESSAGES.BALANCE.MUST_MULTIPLE_OF_UNIT);
  });
});

describe('수익률 계산 테스트', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('보유한 로또가 없을 경우 에러 발생', () => {
    const customer = new Customer(DEFAULT_VALUES.DOMAIN.BALANCE_UNIT);

    expect(() => customer.calculateYield()).toThrow(ERROR_MESSAGES.LOTTO.NO_OWNED_LOTTO);
  });

  test('결과가 없을 경우 에러 발생', () => {
    const customer = new Customer(DEFAULT_VALUES.DOMAIN.BALANCE_UNIT);
    const shop = new LottoShop();
    shop.buyLotto(customer);

    expect(() => customer.calculateYield()).toThrow(ERROR_MESSAGES.LOTTO.MUST_CHECK_RESULTS);
  });

  test.each([
    [[1, 2, 3, 11, 12, 13], (DEFAULT_VALUES.PRIZE.FIFTH / DEFAULT_VALUES.DOMAIN.LOTTO_PRICE) * 100],
  ])('정상 동작', (lottoNumbers, expectYield) => {
    const customer = new Customer(DEFAULT_VALUES.DOMAIN.BALANCE_UNIT * 2);
    const shop = new LottoShop();
    shop.winningNumbers = [1, 2, 3, 4, 5, 6];
    shop.bonusNumber = 7;
    mockRandoms([lottoNumbers, lottoNumbers]);
    shop.buyLotto(customer);
    shop.buyLotto(customer);
    customer.checkLottoResults(shop);

    const yieldValue = customer.calculateYield();
    expect(yieldValue).toBe(expectYield);
  });
});
