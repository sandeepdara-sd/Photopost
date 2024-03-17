import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { savePost, removeSavedPost } from '../features/savedPostsSlice';
import { useDispatch } from 'react-redux';

const SavedPosts: React.FC = () => {
  const dispatch = useDispatch();
  const savedPosts = useSelector((state: RootState) => state.savedPosts.posts);
  const handleRemoveSavedPost = (postId: number) => {
    dispatch(removeSavedPost(postId));
  };

  return (
    <div className=''>
      <h2 style={{color:'orange',fontFamily:'sans-serif'}}>Saved Posts</h2>
      {savedPosts.length === 0 ? (
          <p className="post-body">No posts saved yet.</p>
        ) : (
      <ul>
        {savedPosts.map(post => (
          <li key={post.id}>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
            <button onClick={() => handleRemoveSavedPost(post.id)} className="button remove-button">
                  Remove
                </button>
          </li>
        ))}
      </ul>
        )}
    </div>
  );
};

export default SavedPosts;
