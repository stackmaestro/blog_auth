import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../api/ApiService';
import PostEditable from './PostEditable';
import AllComments from '../Comments/AllComments';
import useAuth from '../../hooks/useAuth';
import { AppContext } from '../../context/AppContext';

function PostDetails() {
  const { data, setData } = React.useContext(AppContext);
  const [post, setPost] = React.useState(null);
  const { user, authenticating } = useAuth();
  const [error, setError] = React.useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const preCheck = () => {
    if (data?.allposts || data?.authorPosts) {
      const allIndexPost = data?.allposts?.find((item) => item._id === id);
      if (allIndexPost) {
        setPost(allIndexPost);
        return true;
      }

      const authorIndexPost = data?.authorPosts?.find(
        (item) => item._id === id
      );
      if (authorIndexPost) {
        setPost(authorIndexPost);
        return true;
      }
    }
    return false;
  };

  const publishPostContext = (publishedPost) => {
    const allposts = data?.allposts ?? [];
    allposts.unshift(publishedPost);
    const authorPosts = data?.authorPosts ?? [];
    const authorIndexPost = authorPosts?.findIndex(
      (item) => item._id === publishedPost._id
    );
    if (authorIndexPost >= 0) {
      authorPosts[authorIndexPost] = publishedPost;
    }
    setData({ ...data, allposts, authorPosts });
  };

  React.useEffect(() => {
    const fetchPost = async () => {
      const result = await ApiService.getPostDetails({ id });
      if (result.errors) {
        setError(result.errors[0].msg);
      } else {
        setPost(result);
      }
    };
    if (!preCheck()) fetchPost();
  }, [id]);

  const publishPost = () => {
    const publishedPost = JSON.parse(JSON.stringify(post));
    publishedPost.published = true;
    setPost(publishedPost);
    publishPostContext(publishedPost);
  };

  if (post && post?.published !== true && !user && !authenticating) {
    navigate('/posts');
  }

  return (
    <div className="container d-flex flex-column">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <h1 className="text-center">Post Details</h1>
      <div className="post-item-wrapper p-5 mb-5">
        {post && <PostEditable {...post} publishPost={publishPost} />}
      </div>
      {post && post.published ? (
        <AllComments id={id} postAuthor={post?.author} />
      ) : null}
    </div>
  );
}

export default PostDetails;
