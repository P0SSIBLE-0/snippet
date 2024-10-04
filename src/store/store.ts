// src/store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import snippetReducer from './snippetSlice';
import { SnippetState } from '@/types/snippet';

export interface RootState {
  snippets: SnippetState;
}

export const store = configureStore({
  reducer: {
    snippets: snippetReducer,
  },
});

export type AppDispatch = typeof store.dispatch;