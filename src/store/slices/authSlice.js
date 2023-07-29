import authAPI from "~/api/authAPI";
import { LoginData } from "~/modules/auth/components/config/data";
import { LOGIN } from "~/utils/constants";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const handleAuth = createAsyncThunk("auth/handleAuth", async (arg, thunkAPI) => {
  try {
    let res = await authAPI[arg.type](arg.data);
    return {
      result: res.data,
      type: arg.type,
      message: res.data.message,
    };
  } catch (error) {
    if (!error.response) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
    return thunkAPI.rejectWithValue({
      message: error.response.data.message,
    });
  }
});

export const getInfoUser = createAsyncThunk("auth/getInfoUser", async (arg, thunkAPI) => {
  try {
    const res = await authAPI.getInfoUser(arg);
    return res.data.data;
  } catch (error) {
    console.log(error);
    if (!error.response) {
      return thunkAPI.rejectWithValue({ message: error.message });
    } else {
      return thunkAPI.rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    info: [],
    otherUserInfo: [],
    renderList: [{ list: LoginData }],
    isLogin: !!localStorage.getItem("token"),
    isLoading: false,
    isSuccess: false,
    isError: false,
    msg: "",
  },
  reducers: {
    changeRenderList: (state, action) => {
      if (action.payload.type === "ADD") {
        state.renderList.push(action.payload.data);
      } else if (action.payload.type === "BACK") {
        const newList = state.renderList.slice(0, state.renderList.length - 1);
        return {
          ...state,
          renderList: newList,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.msg = action.payload?.message;
        if (action.payload && action.payload.type === LOGIN) {
          state.isLogin = true;
          localStorage.setItem("token", `Bearer ${action.payload.result.data.accessToken}`);
          localStorage.setItem("rfToken", `Bearer ${action.payload.result.data.refreshToken}`);
        }
      })
      .addCase(handleAuth.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.msg = action.payload?.message;
      })
      .addCase(getInfoUser.fulfilled, (state, action) => {
        if (action.meta.arg) state.otherUserInfo = action.payload;
        else state.info = action.payload;
      });
  },
});

const { reducer, actions } = authSlice;
export const { changeRenderList } = actions;
export default reducer;
