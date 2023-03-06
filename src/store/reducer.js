import { combineReducers } from "redux";
import AdminReducers from "pages/Admin/reducer";

const RootReducer = combineReducers({ Admin: AdminReducers });

export default RootReducer;
