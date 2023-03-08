import { combineReducers } from "redux";
import SignInReducer from "./SignIn/_duck/reducer";
import { GetUserReducer, AddAndUpdateUserReducer, DeleteUserReducer } from "./Users/_duck/reducer";
import { GetJobReducer, AddAndUpdateJobReducer, DeleteJobReducer } from "./Jobs/_duck/reducer";

const AdminReducers = combineReducers({
  SignIn: SignInReducer,
  GetUser: GetUserReducer,
  AddAndUpdateUser: AddAndUpdateUserReducer,
  DeleteUser: DeleteUserReducer,
  GetJob: GetJobReducer,
  AddAndUpdateJob: AddAndUpdateJobReducer,
  DeleteJob: DeleteJobReducer,
});

export default AdminReducers;
