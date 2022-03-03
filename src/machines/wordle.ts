import { createMachine, assign } from "xstate";

interface WordleContext {
  count: number;
}

const wordleMachine = createMachine<WordleContext>({
  id: "toggle",
  initial: "inactive",
  context: {
    count: 0,
  },
  states: {
    inactive: {
      on: { TOGGLE: "active" },
    },
    active: {
      entry: assign({ count: (ctx) => ctx.count + 1 }),
      on: { TOGGLE: "inactive" },
    },
  },
});

export { wordleMachine };
