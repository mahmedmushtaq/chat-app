import authService from "../../services/authService";
import { LOGIN, REGISTER, LOGOUT, UPDATE_PROFILE } from "../types";

export const login = (params) => async (dispatch) => {
  const data = await authService.login(params);
  dispatch({ type: LOGIN, payload: data });
  return data;
};

export const register = (params) => async (dispatch) => {
  const data = await authService.register(params);
  dispatch({ type: REGISTER, payload: data });
  return data;
};

export const logout = () => async (dispatch) => {
  await authService.logout();
  dispatch({ type: LOGOUT });
};

export const update = (data) => async (dispatch) => {
  try {
    const res = await authService.update(data);
    dispatch({ type: UPDATE_PROFILE, payload: res });
    return res;
  } catch (err) {}
};
