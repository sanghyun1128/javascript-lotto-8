import Customer from '../../src/domain/Customer.js';
import Lotto from '../../src/domain/Lotto.js';
import DEFAULT_VALUES from '../../src/consts/defaultValues.js';
import ERROR_MESSAGES from '../../src/consts/errorMessages.js';

describe('고객 잔액 저장 테스트', () => {
  test.each([
    [DEFAULT_VALUES.DOMAIN.BALANCE_UNIT],
    [DEFAULT_VALUES.DOMAIN.BALANCE_UNIT * 121],
    [Number.parseFloat(DEFAULT_VALUES.DOMAIN.BALANCE_UNIT)],
  ])('정상 동작', (input) => {
    const customer = new Customer(input);

    expect(customer.balance).toBe(input);
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

describe('로또 구매 테스트', () => {
  test('정상 동작', () => {
    const customer = new Customer(DEFAULT_VALUES.DOMAIN.BALANCE_UNIT);
    const result = customer.buyLotto();

    expect(result).toBeTruthy();
    expect(customer.ownedLottos[0]).toBeInstanceOf(Lotto);
  });

  test('잔액이 부족한데 구매 시도시 false 반환', () => {
    const customer = new Customer(DEFAULT_VALUES.DOMAIN.BALANCE_UNIT);
    const result1 = customer.buyLotto();
    const result2 = customer.buyLotto();

    expect(result1).toBeTruthy();
    expect(result2).toBeFalsy();
    expect(customer.ownedLottos.length).toBe(1);
  });
});
