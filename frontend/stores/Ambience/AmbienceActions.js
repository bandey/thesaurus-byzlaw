// Export Constants
export const AMBIENCE_SHOW_ADDITIONS_BOARD = 'AMBIENCE_SHOW_ADDITIONS_BOARD';
export const AMBIENCE_HIDE_ADDITIONS_BOARD = 'AMBIENCE_HIDE_ADDITIONS_BOARD';

export function showAdditionsBoard() {
  return { type: AMBIENCE_SHOW_ADDITIONS_BOARD }
};

export function hideAdditionsBoard() {
  return { type: AMBIENCE_HIDE_ADDITIONS_BOARD }
};
