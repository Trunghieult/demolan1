import searchAPI from "~/api/searchAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const searchOneModel = createAsyncThunk("search/searchOneModel", async (arg, thunkAPI) => {
  const res = await searchAPI.searchOneModel(arg.body);
  return { data: res.data, status: res.status };
});

const searchSlice = createSlice({
  name: "search",
  initialState: {
    result: {
      suggestions: {
        data: [],
        page: 0,
        pages: 0,
        isLoading: false,
      },
      users: {
        data: [],
        page: 0,
        pages: 0,
        isLoading: false,
      },
      locations: {
        data: [],
        page: 0,
        pages: 0,
        isLoading: false,
      },
      vacations: {
        data: [],
        page: 0,
        pages: 0,
        isLoading: false,
      },
      albums: {
        data: [],
        page: 0,
        pages: 0,
        isLoading: false,
      },
    },
  },
  reducers: {
    resetResult: (state, action) => {
      state.result[action.payload.type].data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchOneModel.pending, (state, action) => {
        const { type } = action.meta.arg;
        state.result[type].isLoading = true;
      })
      .addCase(searchOneModel.fulfilled, (state, action) => {
        //Destruture meta and payload of action
        const { body, type } = action.meta.arg;
        const { page } = body;
        const {
          data: { data, meta },
          status,
        } = action.payload;

        //If page query of meta does not change and is 1, meaning user want to search one more time with nearly the same condition, if response status is 204 then reset result state, else set result state is response data
        //If page query of meta change, meaning user want to get more data with the same condition, if response status is 204, then does not update result state, else, set result state is prev state concat response data
        state.result[type].data =
          page === 1 ? (status === 204 ? [] : data) : state.result[type].data.concat(data);

        //If response return page and pages, update page and pages state
        state.result[type].page = status === 204 ? 1 : meta?.page;
        state.result[type].pages = status === 204 ? 1 : meta?.pages;
        state.result[type].isLoading = false;
      });
  },
});
const { reducer, actions } = searchSlice;
export const { resetResult } = actions;
export default reducer;
