import {
  AMBIENCE_SHOW_ADDITIONS_BOARD,
  AMBIENCE_HIDE_ADDITIONS_BOARD,
} from './AmbienceActions';

const initialState = { 
  additionsBoardVisible: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AMBIENCE_SHOW_ADDITIONS_BOARD:
      return Object.assign({}, state, { additionsBoardVisible: true });
    
    case AMBIENCE_HIDE_ADDITIONS_BOARD:
      return Object.assign({}, state, { additionsBoardVisible: false });

    default:
      return state;
  }
};
