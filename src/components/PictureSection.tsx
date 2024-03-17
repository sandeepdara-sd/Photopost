import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { savePicture, removeSavedPicture } from '../features/savedPicturesSlice';
import axios from 'axios';
import Image from 'next/image';

interface Picture {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string; 
}

const PictureSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const savedPictures = useSelector((state: RootState) => state.savedPictures.pictures);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await axios.get<Picture[]>('https://jsonplaceholder.typicode.com/photos');
        const totalPagesCount = Math.ceil(response.data.length / 20);
        setTotalPages(totalPagesCount);
        setPictures(response.data);
      } catch (error) {
        console.error('Error fetching pictures:', error);
      }
    };

    fetchPictures();
  }, []);

  const handleSavePicture = (pictureId: number) => {
    const pictureToSave = pictures.find(picture => picture.id === pictureId);
    if (pictureToSave && !savedPictures.some(p => p.id === pictureToSave.id)) {
      dispatch(savePicture(pictureToSave));
    }
  };

  const handleRemoveSavedPicture = (pictureId: number) => {
    dispatch(removeSavedPicture(pictureId));
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const filteredPictures = pictures.filter(picture =>
    picture.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * 20;
  const endIndex = startIndex + 20;
  const currentPagePictures = filteredPictures.slice(startIndex, endIndex);

  return (
    <div className="picture-section">
      <h2 style={{color:'orange',fontFamily:'sans-serif'}}>Explore and Save Pictures</h2>
      <input
        type="text"
        placeholder="Search pictures..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="input"
      />
      <br/>
      <br/>
      <br/>
      <ul className="picture-list">
        {currentPagePictures.map(picture => (
          <li key={picture.id} className="picture-item">
           
            <Image width={150} height={150} style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}} src={picture.thumbnailUrl} alt={picture.title} className="picture-image" />
            <p style={{fontFamily:'cursive'}}>{picture.title}</p>
            <div className="picture-overlay">
              <button onClick={() => handleSavePicture(picture.id)} className="button save-button">
                Save
              </button>
              {savedPictures.some(p => p.id === picture.id) && (
                <button onClick={() => handleRemoveSavedPicture(picture.id)} className="button remove-button">
                  Remove
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={currentPage === pageNumber ? 'button active' : 'button'}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PictureSection;
