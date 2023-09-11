/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostContent from './PostContent';
import ApiService from '../../api/ApiService';

function PostItem(props) {
  const { _id, published, publishPost } = props;
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();
  const handlePostClick = () => {
    navigate(`/post/${_id}`);
  };

  const handlePublish = async () => {
    const result = await ApiService.publishPost({ id: _id });
    if (result.errors) {
      setError(result.errors[0].msg);
    } else {
      publishPost(result);
    }
  };

  return (
    <>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {!published && (
        <button
          type="button"
          className="btn btn-success w-100 mb-2"
          onClick={handlePublish}
        >
          Publish
        </button>
      )}
      <div
        className="d-flex flex-column post-item-wrapper post-item-clickable h-100 p-2"
        onClick={handlePostClick}
      >
        <PostContent {...props} />
      </div>
    </>
  );
}

export default PostItem;
