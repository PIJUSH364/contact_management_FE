import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  totalPage: 0,
  totalUserCount: 0,
  userActionFlag: false,
  allModalStatus: {
    addUserModalStatus: false,
    editUserModalStatus: false,
    permissionUserModalStatus: false,
    viewUserModalStatus: false,
  },
  paginationMetaData: {
    currentPage: 1,
    pageSize: 5,
  },
  searchValue: "",
  userDataLoader: false,
  filterData: {
    role: "",
    status: "",
    search: "",
  },

  contactMetaData: null,
  loaderStatus: false,
  currentPage: 1,
  categoryContactData: [],
  filterValue: "",
  pageRange: [1],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userList = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setTotalUserCount: (state, action) => {
      state.totalUserCount = action.payload;
    },
    setUserActionFlag: (state, action) => {
      state.userActionFlag = action.payload;
    },
    setModalStatus: (state, action) => {
      Object.entries(state.allModalStatus).forEach(
        ([key, _]) => (state.allModalStatus[key] = false)
      );
      state.userActionFlag = true;
      state.allModalStatus[action.payload.key] = action.payload.value;
    },
    setPaginationMetaData: (state, action) => {
      state.paginationMetaData[action.payload.key] = action.payload.value;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    addContactMetaData: (state, action) => {
      state.contactMetaData = action.payload;
    },
    setLoaderStatus: (state, action) => {
      state.loaderStatus = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCategoryContactData: (state, action) => {
      state.categoryContactData = action.payload;
    },
    toggleUserDataLoader: (state, action) => {
      state.userDataLoader = action.payload;
    },
    setFilterValue: (state, action) => {
      state.filterData[action.payload.key] = action.payload.value;
      state.searchValue = "";
    },
    resetFilterValue: (state) => {
      state.filterData = {
        role: "",
        status: "",
        search: "",
      };
      state.searchValue = "";
    },

    setInitialPageRange: (state) => {
      state.currentPage = 1;
      if (state.contactMetaData) {
        state.pageRange = new Array(
          state.contactMetaData.totalPages > 5
            ? 5
            : state.contactMetaData.totalPages
        )
          .fill(null)
          .map((_, index) => index + 1);
      }
    },

    setCustomPageRange: (state, action) => {
      state.pageRange = action.payload;
    },
  },
});

export const {
  addUser,
  setTotalPage,
  setModalStatus,
  setTotalUserCount,
  setUserActionFlag,
  setPaginationMetaData,
  setSearchValue,
  toggleUserDataLoader,
  resetFilterValue,
  setFilterValue,

  addContactMetaData,
  setLoaderStatus,
  setCurrentPage,
  setCategoryContactData,
  setInitialPageRange,
  setCustomPageRange,
} = userSlice.actions;
export default userSlice.reducer;
