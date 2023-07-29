import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import vacationReducer from "./slices/vacationSlice";
import locationReducer from "./slices/locationSlice";
import searchReducer from "./slices/searchSlice";
import notiReducer from "./slices/notiSlice";
import albumReducer from "./slices/albumSlice";
import friendReducer from "./slices/friendSlice";
import resourceReducer from "./slices/resourceSlice";
import generalReducer from "./slices/generalSlice";

const rootReducer = {
  auth: authReducer,
  vacation: vacationReducer,
  location: locationReducer,
  search: searchReducer,
  noti: notiReducer,
  album: albumReducer,
  friend: friendReducer,
  resource: resourceReducer,
  general: generalReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
