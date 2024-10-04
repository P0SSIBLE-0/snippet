import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { NewSnippet, Snippet, SnippetState } from '@/types/snippet';

export const fetchSnippets = createAsyncThunk<Snippet[]>('snippets/fetchSnippets', async () => {
  const response = await fetch('/api/snippets');
  return response.json();
});

export const fetchSnippetById = createAsyncThunk<Snippet, string>('snippets/fetchSnippetById', async (id) => {
  const response = await fetch(`/api/snippets/${id}`);
  return response.json();
});

export const deleteSnippet = createAsyncThunk<string, string>('snippets/deleteSnippet', async (id: string) => {
  const response = await fetch(`/api/snippets/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete snippet')
  }
  return id
})

export const createSnippet = createAsyncThunk<Snippet, NewSnippet>('snippets/createSnippet', async (snippet: NewSnippet) => {
  const response = await fetch('/api/snippets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(snippet),
  })
  return response.json()
})

export const updateSnippet = createAsyncThunk<Snippet, Snippet>('snippets/updateSnippet', async (snippet:Snippet) => {
  const response = await fetch(`/api/snippets/${snippet._id }`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(snippet),
  })
  return response.json()
})

const initialState: SnippetState = {
  snippets: [],
  currentSnippet: null,
  status: 'idle',
  error: null,
  userId: null,
};

const snippetSlice = createSlice({
  name: 'snippets',
  initialState: initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string | null>) { // Action to set userId
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSnippets.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSnippets.fulfilled, (state, action: PayloadAction<Snippet[]>) => {
        state.status = 'succeeded'
        state.snippets = action.payload;
        console.log(state.snippets);
      })
      .addCase(fetchSnippets.rejected, (state:SnippetState) => {
        state.status = 'failed';
        // state.error = action.error.message || 'Unknown error';
      })
      .addCase(fetchSnippetById.fulfilled, (state, action: PayloadAction<Snippet>) => {
        state.currentSnippet = action.payload
      })
      .addCase(createSnippet.fulfilled, (state, action: PayloadAction<Snippet>) => {
        state.snippets.push(action.payload)
      })
      .addCase(updateSnippet.fulfilled, (state:SnippetState, action:PayloadAction<Snippet>) => {
        const index = state.snippets.findIndex((s) => s._id === action.payload._id)
        if (index !== -1) {
          state.snippets[index] = action.payload;
        }
        state.currentSnippet = action.payload
      })
      .addCase(deleteSnippet.fulfilled, (state, action: PayloadAction<string>) => {
        state.snippets = state.snippets.filter((snippet) => snippet._id !== action.payload);
        state.currentSnippet = null;
      });
  },
})

export const { setUserId } = snippetSlice.actions; // Export the action
export default snippetSlice.reducer