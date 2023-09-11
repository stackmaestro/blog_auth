import React from 'react';
import Comment from './Comment';
import AddComment from './AddComment';
import ApiService from '../../api/ApiService';
import useAuth from '../../hooks/useAuth';
import { AppContext } from '../../context/AppContext';

function AllComments({ id, postAuthor }) {
  const { commentData, setCommentData } = React.useContext(AppContext);
  const [error, setError] = React.useState('');
  const [comments, setComments] = React.useState(commentData[id] ?? []);
  const { user } = useAuth();

  React.useEffect(() => {
    const fetchComments = async () => {
      const result = await ApiService.getComments({ id });
      if (result.errors) setError(result.errors[0].msg);
      else {
        setComments(result);
        setCommentData({ ...commentData, [id]: result });
      }
    };
    if (!commentData[id]) fetchComments();
  }, [id]);

  const insertNewComment = (newComment) => {
    const allComments = JSON.parse(JSON.stringify(comments));
    allComments.push(newComment);
    setComments(allComments);
    setCommentData({ ...commentData, [id]: allComments });
  };

  const updateComment = (updatedComment) => {
    const allComments = JSON.parse(JSON.stringify(comments));
    const index = allComments.findIndex(
      (item) => item._id === updatedComment._id
    );
    allComments[index] = updatedComment;
    setComments(allComments);
    setCommentData({ ...commentData, [id]: allComments });
  };

  const removeComment = (rComment) => {
    const allComments = JSON.parse(JSON.stringify(comments));
    allComments.forEach((com, index, object) => {
      if (com._id === rComment._id) {
        object.splice(index, 1);
      }
    });
    setComments(allComments);
    setCommentData({ ...commentData, [id]: allComments });
  };

  return (
    <div className="d-flex flex-column flex-wrap p-5 comments-container">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <h2 className="text-center">Comments</h2>
      {comments.length > 0 &&
        comments.map((comment) => (
          <Comment
            key={comment?._id}
            {...comment}
            postId={id}
            postAuthor={postAuthor}
            removeComment={removeComment}
            updateComment={updateComment}
          />
        ))}
      {user ? (
        <AddComment postId={id} insertNewComment={insertNewComment} />
      ) : null}
    </div>
  );
}

export default AllComments;
