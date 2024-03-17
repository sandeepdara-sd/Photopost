// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import savedPostsReducer from '../features/savedPostsSlice';
import savedPicturesReducer from '../features/savedPicturesSlice';

const store = configureStore({
  reducer: {
    savedPosts: savedPostsReducer,
    savedPictures: savedPicturesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
