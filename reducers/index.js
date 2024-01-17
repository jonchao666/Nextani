import { combineReducers } from "@reduxjs/toolkit";

import sidebarReducer from "./sidebarSlice";
import sidebarVisibilityReducer from "./sidebarVisibilitySlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  sidebar: sidebarReducer,

  sidebarVisibility: sidebarVisibilityReducer,
  user: userReducer,
});

export default rootReducer;
