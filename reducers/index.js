import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./userSlice";

import isMobileReducer from "./isMobileSlice";
import isSensitiveFilterDisabledReducer from "./sensitiveFilterSlice";
import pageNameReducer from "./pageNameSlice";

const rootReducer = combineReducers({
  isMobile: isMobileReducer,

  user: userReducer,

  isSensitiveFilterDisabled: isSensitiveFilterDisabledReducer,
  pageName: pageNameReducer,
});

export default rootReducer;
