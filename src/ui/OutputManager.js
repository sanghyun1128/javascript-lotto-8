import { MissionUtils } from '@woowacourse/mission-utils';

import MESSAGES from '../consts/messages.js';

class OutputManager {
  static printRequestBalance() {
    MissionUtils.Console.print(MESSAGES.REQUEST.BALANCE);
  }

  static printRequestWinningNumbers() {
    MissionUtils.Console.print(MESSAGES.REQUEST.WINNING_NUMBERS);
  }

  static printRequestBonusNumber() {
    MissionUtils.Console.print(MESSAGES.REQUEST.BONUS_NUMBER);
  }

  static printBoughtLottosCount(numOfLottos) {
    MissionUtils.Console.print(MESSAGES.INFO.PURCHASE_COUNT(numOfLottos));
  }

  static printLottoNumbers(lottoNumbers) {
    MissionUtils.Console.print(
      `${MESSAGES.SYMBOLS.LEFT_BRACKET}${lottoNumbers.join(MESSAGES.SYMBOLS.ITEM_SEPARATOR)}${MESSAGES.SYMBOLS.RIGHT_BRACKET}`,
    );
  }

  static printResultHeader() {
    MissionUtils.Console.print(MESSAGES.RESULT.HEADER);
    MissionUtils.Console.print(MESSAGES.RESULT.DIVIDER);
  }

  static printResult(result) {
    if (result.bonus)
      MissionUtils.Console.print(
        MESSAGES.RESULT.BONUS_RANK(result.match, result.prize, result.count),
      );
    else MissionUtils.Console.print(MESSAGES.RESULT.RANK(result.match, result.prize, result.count));
  }

  static printYield(yieldValue) {
    MissionUtils.Console.print(MESSAGES.INFO.YIELD(yieldValue));
  }
}

export default OutputManager;
