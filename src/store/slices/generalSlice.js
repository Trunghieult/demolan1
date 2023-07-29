import { createSlice, current } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: {
    size: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    isSearchMobileVisible: false,
  },
  reducers: {
    updateSize: (state, action) => {
      state.size = action.payload;
    },
    updateSearchMobileVisible: (state, action) => {
      const currentStatus = current(state).isSearchMobileVisible;
      state.isSearchMobileVisible = !currentStatus;
    },
  },
});
const { reducer, actions } = generalSlice;
export const { updateSize, updateSearchMobileVisible } = actions;
export default reducer;
