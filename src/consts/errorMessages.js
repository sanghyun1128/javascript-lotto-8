import DEFAULT_VALUES from './defaultValues.js';

const ERROR_MESSAGES = {
  BALANCE: {
    MUST_POSITIVE: '보유 금액은 양수 이어야 합니다.',
    MUST_MULTIPLE_OF_UNIT: `보유 금액은 ${DEFAULT_VALUES.DOMAIN.BALANCE_UNIT}원 단위로 입력해야 합니다.`,
  },
  LOTTO: {
    NUMBERS_LENGTH: `로또 번호의 갯수는 ${DEFAULT_VALUES.DOMAIN.LOTTO_NUMBER_COUNT}개 이어야 합니다.`,
    MUST_ORDER_ASC: '로또 번호는 오름차순으로 정렬 되어야 합니다.',
    NUMBER_RANGE: `로또의 번호는 ${DEFAULT_VALUES.DOMAIN.MIN_LOTTO_VALUE}-${DEFAULT_VALUES.DOMAIN.MAX_LOTTO_VALUE} 사이어야 합니다`,
    WINNING_NUMBERS_LENGTH: `당첨 번호의 갯수는 ${DEFAULT_VALUES.DOMAIN.LOTTO_NUMBER_COUNT}개 이어야 합니다.`,
    DUPLICATE_NUMBERS: '번호 끼리 겹치면 안됩니다.',
    EVALUATION_NOT_READY: '당첨 번호와 보너스 번호가 모두 입력되어 있어야 합니다.',
    IS_NOT_SOLD: '판매한 로또가 아닙니다.',
    NO_OWNED_LOTTO: '보유한 로또가 없습니다.',
    MUST_CHECK_RESULTS: '수익률을 계산하려면 먼저 결과를 확인해야 합니다.',
  },
  ETC: {
    UNKNOWN: '알 수 없는 오류가 발생했습니다.',
  },
};

export default ERROR_MESSAGES;
