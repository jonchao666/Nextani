import { combineReducers } from "@reduxjs/toolkit";
import selectedButtonReducer from "./selectedButtonSlice";
import sidebarReducer from "./sidebarSlice";
import sidebarVisibilityReducer from "./sidebarVisibilitySlice";

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  selectedButton: selectedButtonReducer,
  sidebarVisibility: sidebarVisibilityReducer,
});

export default rootReducer;
