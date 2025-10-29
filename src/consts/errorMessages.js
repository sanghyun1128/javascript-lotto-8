import DEFAULT_VALUES from './defaultValues.js';

const ERROR_MESSAGES = {
  BALANCE: {
    MUST_POSITIVE: '보유 금액은 양수 이어야 합니다.',
    MUST_MULTIPLE_OF_UNIT: `구입 금액은 ${DEFAULT_VALUES.DOMAIN.BALANCE_UNIT}원 단위로 입력해야 합니다.`,
  },
};

export default ERROR_MESSAGES;
