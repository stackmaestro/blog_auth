import React from 'react';
import { Formik, Form } from 'formik';
import InputField from '../InputField';
import ApiService from '../../api/ApiService';
import useAuth from '../../hooks/useAuth';
import { commentSchema } from '../../utils/Schemas';
import successMessages from '../../utils/success';
import warningMessages from '../../utils/warning';

function Comment(props) {
  const {
    text,
    _id,
    postId,
    author,
    removeComment,
    postAuthor,
    updateComment,
  } = props;
  const [error, setError] = React.useState(false);
  const [updated, setUpdated] = React.useState(false);
  const { user } = useAuth();
  const disabled = !(
    author?.email &&
    (user?.email === author?.email || user?.email === postAuthor?.email)
  );
  const updateDisabled = !(author?.email && user?.email === author?.email);
  const initialValues = {
    text: text || '',
    cid: _id || '',
    postId: postId || '',
  };

  const handleUpdate = async (values) => {
    setError('');
    setUpdated('');
    if (values.text.trim() === text) return;
    const result = await ApiService.updateComment(values);
    if (result.errors) setError(result.errors[0].msg);
    else {
      setUpdated(successMessages.commentUpdated);
      updateComment(result);
    }
  };

  const handleDelete = async () => {
    setError('');
    setUpdated('');
    // eslint-disable-next-line no-alert
    if (window.confirm(warningMessages.confirmCommentDeletion)) {
      const result = await ApiService.deleteComment({ postId, cid: _id });
      if (result.errors) setError(result.errors[0].msg);
      else removeComment(result);
    }
  };

  return (
    <div className="d-flex flex-wrap flex-column comment-wrapper p-2 mb-2">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {updated && (
        <div className="alert alert-success" role="alert">
          {updated}
        </div>
      )}
      <strong>Created By: {author?.email}</strong>
      <strong>Name: {author?.name}</strong>
      <Formik
        initialValues={initialValues}
        validationSchema={commentSchema}
        onSubmit={handleUpdate}
        enableReinitialize
      >
        {() => (
          <Form className="create-post-form">
            <InputField
              label="Body"
              name="text"
              type="textarea"
              rows={7}
              disabled={disabled}
            />
            {!disabled && (
              <div className="d-flex w-100 justify-content-between">
                <button
                  className="btn btn-danger mt-3"
                  onClick={handleDelete}
                  type="button"
                >
                  Delete
                </button>
                {!updateDisabled && (
                  <button className="btn btn-primary mt-3" type="submit">
                    Update
                  </button>
                )}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Comment;
