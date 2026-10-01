export const comparisonLimit = 3;

export type ComparisonState = {
  ids: string[];
  message: string;
  phase: "browse" | "select" | "compare";
};

export type ComparisonAction =
  | { type: "toggle"; id: string; name: string }
  | { type: "clear" | "start" | "stop" | "open" | "close" };

export function comparisonReducer(
  state: ComparisonState,
  action: ComparisonAction,
): ComparisonState {
  if (action.type === "start") {
    return {
      ...state,
      phase: "select",
      message: "Selezione attiva. Scegli due o tre modelli dalle schede.",
    };
  }

  if (action.type === "stop") {
    return {
      ...state,
      phase: "browse",
      message: state.ids.length
        ? "Selezione chiusa. I modelli scelti sono conservati: puoi riprendere il confronto."
        : "Selezione chiusa. Continua a esplorare la gamma.",
    };
  }

  if (action.type === "open") {
    return state.phase === "select" && state.ids.length >= 2
      ? { ...state, phase: "compare" }
      : state;
  }

  if (action.type === "close") {
    return state.phase === "compare" ? { ...state, phase: "select" } : state;
  }

  if (action.type === "clear") {
    return {
      ids: [],
      phase: state.phase === "compare" ? "select" : state.phase,
      message: "Confronto svuotato. Scegli due o tre modelli.",
    };
  }

  if (action.type !== "toggle" || state.phase === "browse") return state;

  if (state.ids.includes(action.id)) {
    const ids = state.ids.filter((id) => id !== action.id);
    return {
      ids,
      phase:
        state.phase === "compare" && ids.length < 2 ? "select" : state.phase,
      message: `${action.name} rimosso dal confronto.`,
    };
  }

  if (state.ids.length >= comparisonLimit) {
    return {
      ...state,
      message:
        "Puoi confrontare fino a tre modelli. Rimuovine uno per aggiungerne un altro.",
    };
  }

  return {
    ...state,
    ids: [...state.ids, action.id],
    message: `${action.name} aggiunto. ${state.ids.length + 1} di ${comparisonLimit} modelli selezionati.`,
  };
}
