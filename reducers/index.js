import { combineReducers } from "@reduxjs/toolkit";
import selectedButtonReducer from "./selectedButtonSlice";
import sidebarReducer from "./sidebarSlice";

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  selectedButton: selectedButtonReducer,
});

export default rootReducer;
