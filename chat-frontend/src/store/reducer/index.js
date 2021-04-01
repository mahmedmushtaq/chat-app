import { combineReducers } from "redux";
import authReducer from "./auth";
import chatReducer from "./chat";

const rootReducer = combineReducers({
  authReducer,
  chatReducer,
});

export default rootReducer;
