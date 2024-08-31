import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk('users/getUsers', async (role = "patient") => {
  const response = await axios.get('/users/' + role);
  const data = await response.data;

  return data;
});


const usersAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectOrderById } = usersAdapter.getSelectors(
  (state) => state.eCommerceApp.users
);

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setUserSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: usersAdapter.setAll,
  },
});

export const { setUserSearchText } = usersSlice.actions;

export const selectUsersSearchText = ({ eCommerceApp }) => eCommerceApp.users.searchText;

export default usersSlice.reducer;
