// components/SavedPictures.tsx
import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { Picture, removeSavedPicture } from '../features/savedPicturesSlice';
import Image from 'next/image';

const SavedPictures: React.FC = () => {
  // Retrieve saved pictures from Redux store
  const dispatch  = useDispatch();
  const savedPictures = useSelector((state: RootState) => state.savedPictures.pictures);
  const handleRemoveSavedPicture = (pictureId: number) => {
    dispatch(removeSavedPicture(pictureId));
  };
  return (
    <div>
      <h2 style={{color:'orange',fontFamily:'sans-serif'}}>Saved Pictures</h2>
      <div className="saved-pictures-container">
        {savedPictures.length === 0 ? (
          <p className="post-body">No pictures saved yet.</p>
        ) : (
          <ul className="saved-pictures-list">
            {savedPictures.map((picture: Picture) => (
              <li key={picture.id} className="saved-picture-item">
                <Image height={150} width={150} style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}} src={picture.url} alt={picture.title} className="saved-picture-image" />
                <p style={{fontFamily:'cursive'}}>{picture.title}</p>
                <button onClick={() => handleRemoveSavedPicture(picture.id)} className="button remove-button">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SavedPictures;
