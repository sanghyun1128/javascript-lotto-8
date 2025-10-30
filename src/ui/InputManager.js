import { MissionUtils } from '@woowacourse/mission-utils';

import ERROR_MESSAGES from '../consts/errorMessages.js';

class InputManager {
  static async getInteger() {
    const input = await MissionUtils.Console.readLineAsync('');
    const trimmedInput = input.trim();
    InputManager.#validateInteger(trimmedInput);

    return Number.parseInt(trimmedInput, 10);
  }

  static #validateInteger(integer) {
    if (integer === undefined || integer === null || integer.length === 0)
      throw new Error(ERROR_MESSAGES.IO.NO_INPUT);
    if (Number.isNaN(+integer)) throw new Error(ERROR_MESSAGES.IO.MUST_INPUT_NUMBER);
    if (!Number.isSafeInteger(integer)) throw new Error(ERROR_MESSAGES.IO.MUST_INPUT_INTEGER);
  }
}

export default InputManager;
