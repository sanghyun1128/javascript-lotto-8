import { MissionUtils } from '@woowacourse/mission-utils';

import ERROR_MESSAGES from '../consts/errorMessages.js';

class OutputManager {
  static print(message) {
    MissionUtils.Console.print(message);
  }

  static printEmptyLine() {
    MissionUtils.Console.print('');
  }

  static printErrorMessage(errorMessage) {
    MissionUtils.Console.print(`${ERROR_MESSAGES.PREFIX}${errorMessage}`);
  }
}

export default OutputManager;
