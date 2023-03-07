import { combineReducers } from "redux";
import SignInReducer from "./SignIn/_duck/reducer";
import { GetUserReducer, AddAndUpdateUserReducer, DeleteUserReducer } from "./Users/_duck/reducer";

const AdminReducers = combineReducers({
  SignIn: SignInReducer,
  GetUser: GetUserReducer,
  AddAndUpdateUser: AddAndUpdateUserReducer,
  DeleteUser: DeleteUserReducer,
});

export default AdminReducers;
