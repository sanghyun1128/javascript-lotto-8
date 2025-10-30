import { MissionUtils } from '@woowacourse/mission-utils';

import ERROR_MESSAGES from '../consts/errorMessages.js';
import DEFAULT_VALUES from '../consts/defaultValues.js';

class InputManager {
  static async getInteger() {
    const input = await MissionUtils.Console.readLineAsync('');
    const trimmedInput = input.trim();
    InputManager.#validateInteger(trimmedInput);

    return Number.parseInt(trimmedInput, 10);
  }

  static async getIntegerList() {
    const input = await MissionUtils.Console.readLineAsync('');
    const trimmedInput = input.trim();
    const integerList = trimmedInput.split(DEFAULT_VALUES.FORMAT.SEPARATOR).map((e) => e.trim());

    integerList.forEach((integer) => InputManager.#validateInteger(integer));

    return integerList.map((integer) => Number.parseInt(integer, 10));
  }

  static #validateInteger(integer) {
    if (integer === undefined || integer === null || integer.length === 0)
      throw new Error(ERROR_MESSAGES.IO.NO_INPUT);
    if (Number.isNaN(+integer)) throw new Error(ERROR_MESSAGES.IO.MUST_INPUT_NUMBER);
    if (!Number.isSafeInteger(integer)) throw new Error(ERROR_MESSAGES.IO.MUST_INPUT_INTEGER);
  }
}

export default InputManager;
