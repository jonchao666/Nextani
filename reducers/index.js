import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import authReducer from "./authSlice";
import isMobileReducer from "./isMobileSlice";
import isSensitiveFilterDisabledReducer from "./sensitiveFilterSlice";
import pageNameReducer from "./pageNameSlice";

const rootReducer = combineReducers({
  isMobile: isMobileReducer,

  user: userReducer,
  auth: authReducer,
  isSensitiveFilterDisabled: isSensitiveFilterDisabledReducer,
  pageName: pageNameReducer,
});

export default rootReducer;
