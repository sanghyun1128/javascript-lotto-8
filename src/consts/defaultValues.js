const DEFAULT_VALUES = {
  DOMAIN: {
    BALANCE_UNIT: 1000,
    LOTTO_PRICE: 1000,
    MIN_LOTTO_VALUE: 1,
    MAX_LOTTO_VALUE: 45,
    LOTTO_NUMBER_COUNT: 6,
  },
  RANK: {
    FIRST: 'FIRST',
    SECOND: 'SECOND',
    THIRD: 'THIRD',
    FOURTH: 'FOURTH',
    FIFTH: 'FIFTH',
    LAST_PLACE: 'LAST_PLACE',
  },
  PRIZE: {
    FIRST: 2000000000,
    SECOND: 30000000,
    THIRD: 1500000,
    FOURTH: 50000,
    FIFTH: 5000,
    LAST_PLACE: 0,
  },
  FORMAT: {
    SEPARATOR: ',',
    ROUNDING_DECIMAL_PLACES: 1,
  },
};

DEFAULT_VALUES.LOTTO_RESULTS_INITIALIZER = {
  [DEFAULT_VALUES.RANK.FIRST]: {
    match: 6,
    bonus: false,
    prize: DEFAULT_VALUES.PRIZE.FIRST,
    count: 0,
  },
  [DEFAULT_VALUES.RANK.SECOND]: {
    match: 5,
    bonus: true,
    prize: DEFAULT_VALUES.PRIZE.SECOND,
    count: 0,
  },
  [DEFAULT_VALUES.RANK.THIRD]: {
    match: 5,
    bonus: false,
    prize: DEFAULT_VALUES.PRIZE.THIRD,
    count: 0,
  },
  [DEFAULT_VALUES.RANK.FOURTH]: {
    match: 4,
    bonus: false,
    prize: DEFAULT_VALUES.PRIZE.FOURTH,
    count: 0,
  },
  [DEFAULT_VALUES.RANK.FIFTH]: {
    match: 3,
    bonus: false,
    prize: DEFAULT_VALUES.PRIZE.FIFTH,
    count: 0,
  },
  [DEFAULT_VALUES.RANK.LAST_PLACE]: {
    match: 0,
    bonus: false,
    prize: DEFAULT_VALUES.PRIZE.LAST_PLACE,
    count: 0,
  },
};

export default DEFAULT_VALUES;
