import DEFAULT_VALUES from '../../src/consts/defaultValues.js';
import ERROR_MESSAGES from '../../src/consts/errorMessages.js';
import Customer from '../../src/domain/Customer.js';

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
