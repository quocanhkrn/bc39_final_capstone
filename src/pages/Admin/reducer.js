import { combineReducers } from "redux";
import SignInReducer from "./SignIn/_duck/reducer";
import { GetUserReducer } from "./Users/_duck/reducer";

const AdminReducers = combineReducers({ SignIn: SignInReducer, GetUser: GetUserReducer });

export default AdminReducers;
