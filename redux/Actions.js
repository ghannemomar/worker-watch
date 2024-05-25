import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { URL } from "../utils/constants";

export const setUserData = () => async (dispatch) => {
  const _id = await AsyncStorage.getItem("_id");
  axios.get(`${URL}/users/user-data?user=${_id}`).then(async (res) => {
    dispatch({
      type: "SET_USER_DATA",
      payload: res.data,
    });
  });
};

export const setActifSession = (userId) => async (dispatch) => {
  const _id = userId ? userId : await AsyncStorage.getItem("_id");
  setInterval(() => {
    axios
      .get(`${URL}/sessions/active-session?user=${_id}`)
      .then(async (res) => {
        dispatch({
          type: "SET_ACTIF_SESSION",
          payload: res.data,
        });
      });
  }, 2000);
};

export const removeUser = () => async (dispatch) => {
  const _id = await AsyncStorage.removeItem("_id");
  dispatch({
    type: "REMOVE_USER",
    payload: {},
  });
};
