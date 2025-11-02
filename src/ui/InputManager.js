import { MissionUtils } from '@woowacourse/mission-utils';

import DEFAULT_VALUES from '../consts/defaultValues.js';
import Validation from '../utils/Validation.js';

class InputManager {
  static async getInteger(requestMessage) {
    const input = await MissionUtils.Console.readLineAsync(`${requestMessage}\n`);
    const trimmedInput = input.trim();
    Validation.validateIntegerInput(trimmedInput);

    return Number.parseInt(trimmedInput, 10);
  }

  static async getIntegerList(requestMessage) {
    const input = await MissionUtils.Console.readLineAsync(`${requestMessage}\n`);
    const trimmedInput = input.trim();
    const integerList = trimmedInput.split(DEFAULT_VALUES.FORMAT.SEPARATOR).map((e) => e.trim());

    integerList.forEach((integer) => Validation.validateIntegerInput(integer));

    return integerList.map((integer) => Number.parseInt(integer, 10));
  }
}

export default InputManager;
