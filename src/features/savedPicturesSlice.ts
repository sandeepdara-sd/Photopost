import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Picture {
  id: number;
  title: string;
  url: string;
}

interface SavedPicturesState {
  pictures: Picture[];
}

const initialState: SavedPicturesState = {
  pictures: [],
};

const savedPicturesSlice = createSlice({
  name: 'savedPictures',
  initialState,
  reducers: {
    savePicture: (state, action: PayloadAction<Picture>) => {
      const { id } = action.payload;
    
      if (!state.pictures.some(picture => picture.id === id)) {
        state.pictures.push(action.payload);
      }
    },
    removeSavedPicture: (state, action: PayloadAction<number>) => {
      const pictureIndex = state.pictures.findIndex(picture => picture.id === action.payload);
  
      if (pictureIndex !== -1) {
        state.pictures.splice(pictureIndex, 1);
      }
    },
  },
});

export const { savePicture, removeSavedPicture } = savedPicturesSlice.actions;

export default savedPicturesSlice.reducer;
