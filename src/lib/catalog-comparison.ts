export const comparisonLimit = 3;

export type ComparisonState = {
  ids: string[];
  message: string;
};

export type ComparisonAction =
  | { type: "toggle"; id: string; name: string }
  | { type: "clear" };

export function comparisonReducer(
  state: ComparisonState,
  action: ComparisonAction,
): ComparisonState {
  if (action.type === "clear") {
    return {
      ids: [],
      message: "Confronto svuotato. Scegli due o tre modelli.",
    };
  }

  if (state.ids.includes(action.id)) {
    return {
      ids: state.ids.filter((id) => id !== action.id),
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
    ids: [...state.ids, action.id],
    message: `${action.name} aggiunto. ${state.ids.length + 1} di ${comparisonLimit} modelli selezionati.`,
  };
}
