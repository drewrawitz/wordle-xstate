import { createMachine, assign } from "xstate";
const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

export interface WordleContext {
  guess: string;
  answer: string;
  guesses: string[];
  solvingRow: number | null;
}

const wordleMachine = createMachine<WordleContext>({
  id: "wordle",
  initial: "guessing",
  context: {
    guess: "",
    answer: "HALEY",
    guesses: [],
    solvingRow: null,
  },
  states: {
    guessing: {
      entry: assign({ guess: "" }),
      on: {
        "guess.key": {
          cond: (ctx, e) =>
            ctx.guess.length < WORD_LENGTH && /^[a-zA-Z]$/.test(e.key),
          actions: assign({
            guess: (ctx, e) => ctx.guess + e.key.toUpperCase(),
          }),
        },
        "guess.backspace": {
          cond: (ctx) => ctx.guess.length > 0,
          actions: assign({
            guess: (ctx) => ctx.guess.slice(0, -1),
          }),
        },
        "guess.submit": {
          cond: (ctx) => ctx.guess.length === WORD_LENGTH,
          actions: assign({
            guess: (_) => "",
            guesses: (ctx) => ctx.guesses.concat(ctx.guess),
          }),
          target: "revealing",
        },
      },
    },
    revealing: {
      entry: assign({
        solvingRow: (ctx) => ctx.guesses.length,
      }),
      after: {
        2000: [
          {
            cond: (ctx) => ctx.guess === ctx.answer,
            target: "won",
          },
          {
            cond: (ctx) => ctx.guesses.length === MAX_GUESSES,
            target: "lost",
          },
          {
            target: "guessing",
            actions: assign({
              solvingRow: (_) => null,
            }),
          },
        ],
      },
    },
    won: {},
    lost: {},
  },
});

export { wordleMachine };
