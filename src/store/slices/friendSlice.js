import friendAPI from "~/api/friendAPI";
const { createSlice, createAsyncThunk, current } = require("@reduxjs/toolkit");

export const getFriendList = createAsyncThunk("friend/friendList", async (arg, thunkAPI) => {
  try {
    const res = await friendAPI.getFriendList({ page: arg?.page, userId: arg?.userId });
    return res.data;
  } catch (error) {
    if (!error.response) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
    return thunkAPI.rejectWithValue({
      message: error.response.data.message,
    });
  }
});

export const getRequestList = createAsyncThunk("friend/requestList", async (arg, thunkAPI) => {
  try {
    const res = await friendAPI.getRequestList(arg?.page || 1);
    return res.data;
  } catch (error) {
    if (!error.response) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
    return thunkAPI.rejectWithValue({
      message: error.response.data.message,
    });
  }
});

export const acceptFriend = createAsyncThunk("friend/accept", async (arg, thunkAPI) => {
  try {
    const { id } = arg;
    const res = await friendAPI.acceptFriend(id);
    return res.data;
  } catch (error) {
    if (!error.response) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
    return thunkAPI.rejectWithValue({
      message: error.response.data.message,
    });
  }
});

export const addFriend = createAsyncThunk("friend/add", async (arg, thunkAPI) => {
  try {
    const { id } = arg;
    const res = await friendAPI.addFriend(id);
    return res.data;
  } catch (error) {
    if (!error.response) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
    return thunkAPI.rejectWithValue({
      message: error.response.data.message,
    });
  }
});

export const removeFriend = createAsyncThunk("friend/remove", async (arg, thunkAPI) => {
  try {
    const { id } = arg;
    const res = await friendAPI.removeFriend(id);
    return res.data;
  } catch (error) {
    if (!error.response) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
    return thunkAPI.rejectWithValue({
      message: error.response.data.message,
    });
  }
});

const friendSlice = createSlice({
  name: "friend",
  initialState: {
    list: [],
    status: null,
    meta: { page: 1, pages: 1, total: 1 },
    isLoading: false,
    isError: false,
    msg: "",
  },
  reducers: {
    resetList: (state, action) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFriendList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFriendList.fulfilled, (state, action) => {
        if (action.payload) {
          const {
            data,
            meta: { page, pages, total },
          } = action.payload;

          if (data.length > 0) {
            state.list = page === 1 ? data : state.list.concat(data);
          }
          state.meta.page = page;
          state.meta.pages = pages;
          state.meta.total = total;
        }
        state.isLoading = false;
      })
      .addCase(getFriendList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.list = [];
        state.msg = action.payload?.message;
      })
      .addCase(getRequestList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRequestList.fulfilled, (state, action) => {
        if (action.payload) {
          const {
            data,
            meta: { page, pages, total },
          } = action.payload;
          state.list = page === 1 ? data : data?.length > 0 && state.list.concat(data);
          state.meta.page = page;
          state.meta.pages = pages;
          state.meta.total = total;
        } else {
          state.meta = { page: 1, pages: 1, total: 1 };
        }
        state.isLoading = false;
      })
      .addCase(getRequestList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.list = [];
        state.msg = action.payload?.message;
      })
      .addCase(acceptFriend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(acceptFriend.fulfilled, (state, action) => {
        const currentList = current(state).list;
        state.isLoading = false;
        state.status = "friend";
        state.list = currentList.filter((item) => item._id !== action.payload.data._id);
      })
      .addCase(acceptFriend.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(addFriend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "pending";
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(removeFriend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        const currentList = current(state).list;
        state.list = currentList.filter(
          (item) =>
            item.userInfo._id !== action.payload.data.userId1 &&
            item.userInfo._id !== action.payload.data.userId2
        );
        state.isLoading = false;
        state.status = null;
      })
      .addCase(removeFriend.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
const { reducer, actions } = friendSlice;
export const { resetList } = actions;
export default reducer;
