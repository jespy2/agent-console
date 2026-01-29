import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PolicyStatus } from "../types";

export interface PoliciesUiState {
  search: string;
  status: PolicyStatus | 'All';
  page: number;
  limit: number;
};

const initialState: PoliciesUiState = {
  search: '',
  status: 'All',
  page: 1,
  limit: 10,
};

const polciesUiSlice = createSlice({
  name: 'policiesUi',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
    setStatus(state, action: PayloadAction<PolicyStatus | 'All'>) {
      state.status = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
      state.page = 1;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setSearch, setStatus, setPage, setLimit, resetFilters } = polciesUiSlice.actions;

export const policiesUiReducer = polciesUiSlice.reducer;