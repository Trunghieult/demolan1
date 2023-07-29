import locationAPI from "~/api/locationAPI";
const { createSlice, createAsyncThunk, current } = require("@reduxjs/toolkit");

export const getTrendingPlace = createAsyncThunk(
  "location/getTrendingPlace",
  async (arg, thunkAPI) => {
    try {
      const res = await locationAPI.getTrendingPlace(arg);
      console.log(res);
      return res.data.data;
    } catch (error) {
      console.log("error:", error);
    }
  }
);

export const getManyLocations = createAsyncThunk(
  "location/getManyLocations",
  async (arg, thunkAPI) => {
    try {
      const res = await locationAPI.getManyLocations(arg);
      return res.data.data;
    } catch (error) {
      console.log("error:", error);
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState: {
    trendingList: [],
    locationList: [],
    isLoading: false,
    isVisible: false,
  },
  reducers: {
    changeVisible: (state, action) => {
      const currentStatus = current(state).isVisible;
      state.isVisible = action.payload || !currentStatus;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrendingPlace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrendingPlace.fulfilled, (state, action) => {
        state.trendingList = action.payload;
        state.isLoading = false;
      })
      .addCase(getManyLocations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getManyLocations.fulfilled, (state, action) => {
        state.locationList = action.payload;
        state.isLoading = false;
      });
  },
});
const { reducer, actions } = locationSlice;
export const { changeVisible } = actions;
export default reducer;
