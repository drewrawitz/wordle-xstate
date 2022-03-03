function letterStatus(
  letter: string,
  answer: string,
  guesses: string[],
  index?: number
): "unplayed" | "correct" | "almost" | "nope" {
  const letterUpper = letter.toUpperCase();

  if (!guesses.some((guess) => guess.includes(letterUpper))) {
    return "unplayed";
  }

  if (answer.includes(letterUpper)) {
    if (
      guesses.some(
        (guess) =>
          (index ?? guess.indexOf(letterUpper)) === answer.indexOf(letterUpper)
      )
    ) {
      return "correct";
    } else if (guesses.some((guess) => guess.includes(letterUpper))) {
      return "almost";
    }
  }

  return "nope";
}

export { letterStatus };
