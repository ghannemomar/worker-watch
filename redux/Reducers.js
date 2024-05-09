export const userDataReducer = (state = {}, action) => {
    switch (action.type) {
      case "SET_USER_DATA":
        return action.payload;
        case "REMOVE_USER":
            return action.payload;
      default:
        return state;
    }
  };

export const actifSessionReducer = (state = null, action) => {
    switch (action.type) {
      case "SET_ACTIF_SESSION":
        return action.payload;
      default:
        return state;
    }
  };

