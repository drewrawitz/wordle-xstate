import { useContext } from "react";
import { useActor } from "@xstate/react";
import { GlobalStateContext } from "../context/app.context";

export default function useWordle() {
  const globalServices = useContext(GlobalStateContext);
  const [state] = useActor(globalServices.wordleService);
  const { send } = globalServices.wordleService;

  return {
    state,
    send,
  };
}
