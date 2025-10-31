const MESSAGES = {
  REQUEST: {
    BALANCE: '구입금액을 입력해 주세요.',
    WINNING_NUMBERS: '당첨 번호를 입력해 주세요.',
    BONUS_NUMBER: '보너스 번호를 입력해 주세요.',
  },
  SYMBOLS: {
    LEFT_BRACKET: '[',
    RIGHT_BRACKET: ']',
    ITEM_SEPARATOR: ', ',
  },
  INFO: {
    PURCHASE_COUNT: (count) => `${count}개를 구매했습니다.`,
    YIELD: (rate) => `총 수익률은 ${rate}%입니다.`,
    KR_FORMAT_CURRENCY: (amount) => `${Number(amount).toLocaleString('ko-KR')}원`,
  },
  RESULT: {
    HEADER: '당첨 통계',
    SEPARATOR: '---',
    RANK: (match, prize, count) =>
      `${match}개 일치 (${MESSAGES.INFO.KR_FORMAT_CURRENCY(prize)}) - ${count}개`,
    BONUS_RANK: (match, prize, count) =>
      `${match}개 일치, 보너스 볼 일치 (${MESSAGES.INFO.KR_FORMAT_CURRENCY(prize)}}) - ${count}개`,
  },
};

export default MESSAGES;
