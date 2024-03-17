// pages/index.tsx
import React from 'react';
import PictureSection from '../components/PictureSection';
import PostSection from '../components/PostSection';
import SavedPictures from '../components/SavedPictures';
import SavedPosts from '../components/SavedPosts';


const Home: React.FC = () => {
  return (
    <>
    <h1 className='title'>Welcome to Photo Post</h1>
    <div className="layout">  
      <div className="main-content">
        <PictureSection />
        <PostSection />
        <SavedPictures />
        <SavedPosts />
      </div>
    </div>
    </>
  );
};

export default Home;
