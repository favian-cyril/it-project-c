const constantLiterals = [
  'UPDATE_SEARCH_TEXT', 'REQUEST_SEARCH', 'RECEIVE_SEARCH',
  'TOGGLE_FOCUS', 'TOGGLE_ADD_DELETE',
  'REQUEST_RECIPES', 'RECEIVE_RECIPES',
  'MORE_RECIPES', 'RESET_RECIPES',
  'ADD_TO_COOKING_TODAY', 'TOGGLE_COOKING_TODAY',
  'CLEAR_COOKING_TODAY', 'UPDATE_MISSING_COOKING_TODAY',
  'REQUEST_USER_DATA', 'RECEIVE_USER_DATA',
  'SEND_SYNC', 'ACK_SYNC',
  'TRANSITION_DISPLAY', 'SET_READY',
  'HANDLE_ERROR', 'CLEAR_ERROR'
]

let constants = {}

constantLiterals.forEach(literal => {
  constants[literal] = literal
})

export default constants
