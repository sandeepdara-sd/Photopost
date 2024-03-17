import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { savePost, removeSavedPost } from '../features/savedPostsSlice';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const savedPosts = useSelector((state: RootState) => state.savedPosts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
        const totalPagesCount = Math.ceil(response.data.length / 20);
        setTotalPages(totalPagesCount);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleSavePost = (postId: number) => {
    const postToSave = posts.find(post => post.id === postId);
    if (postToSave && !savedPosts.some(p => p.id === postToSave.id)) {
      dispatch(savePost(postToSave));
    }
  };

  const handleRemoveSavedPost = (postId: number) => {
    dispatch(removeSavedPost(postId));
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * 20;
  const endIndex = startIndex + 20;
  const currentPagePosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <div className="post-section">
      <h2 style={{color:'orange',fontFamily:'sans-serif'}}>Explore and Save Posts</h2>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="input"
      />
      <ul className="post-list">
        {currentPagePosts.map(post => (
          <li key={post.id} className="post-item">
            <div className="post-content">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-body">{post.body}</p>
            </div>
            <div className="post-actions">
              <button onClick={() => handleSavePost(post.id)} className="button save-button">
                Save
              </button>
              {savedPosts.some(p => p.id === post.id) && (
                <button onClick={() => handleRemoveSavedPost(post.id)} className="button remove-button">
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

export default PostSection;
