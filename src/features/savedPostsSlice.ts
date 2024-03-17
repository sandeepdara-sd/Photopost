import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  id: number;
  title: string;
  body: string;
}

interface SavedPostsState {
  posts: Post[];
}

const initialState: SavedPostsState = {
  posts: [],
};

const savedPostsSlice = createSlice({
  name: 'savedPosts',
  initialState,
  reducers: {
    savePost: (state, action: PayloadAction<Post>) => {
      const { id } = action.payload;
      
      if (!state.posts.some(post => post.id === id)) {
        state.posts.push(action.payload);
      }
    },
    removeSavedPost: (state, action: PayloadAction<number>) => {
   
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
});

export const { savePost, removeSavedPost } = savedPostsSlice.actions;

export default savedPostsSlice.reducer;
