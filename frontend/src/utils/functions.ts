const isKanji = (value: string): boolean => {
  const regexp =
    /([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu;

  return regexp.test(value);
};

export { isKanji };
