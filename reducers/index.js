import { combineReducers } from "@reduxjs/toolkit";

import sidebarReducer from "./sidebarSlice";
import sidebarVisibilityReducer from "./sidebarVisibilitySlice";
import userReducer from "./userSlice";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  sidebar: sidebarReducer,

  sidebarVisibility: sidebarVisibilityReducer,
  user: userReducer,
  auth: authReducer,
});

export default rootReducer;
