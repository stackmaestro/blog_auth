import React from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import InputField from '../InputField';
import useAuth from '../../hooks/useAuth';
import ApiService from '../../api/ApiService';
import { postSchema } from '../../utils/Schemas';
import successMessages from '../../utils/success';
import warningMessages from '../../utils/warning';
import { AppContext } from '../../context/AppContext';

function PostEditable(props) {
  const { title, content, _id, author, published, publishPost } = props;
  const { data, setData } = React.useContext(AppContext);
  const { user } = useAuth();
  const [error, setError] = React.useState(false);
  const [updated, setUpdated] = React.useState(false);
  const disabled = !(user && user?.email === author?.email);
  const navigate = useNavigate();

  const initialValues = {
    id: _id || '',
    title: title || '',
    content: content || '',
  };

  const isSame = (values) => {
    const prevPost = data.authorPosts?.find((item) => item._id === _id);
    if (prevPost)
      return (
        prevPost.title === values.title.trim() &&
        prevPost.content === values.content.trim()
      );
    return values.title.trim() === title && values.content.trim() === content;
  };

  const updateContext = (postObject) => {
    const allposts = data?.allposts;
    let authorPosts = data?.authorPosts;
    const allIndex = allposts?.findIndex((post) => post._id === postObject._id);
    const authorIndex = authorPosts?.findIndex(
      (post) => post._id === postObject._id
    );
    if (allIndex >= 0) allposts[allIndex] = postObject;
    if (authorIndex >= 0) authorPosts[authorIndex] = postObject;
    else {
      authorPosts = [];
      authorPosts.push(postObject);
    }
    setData({ ...data, allposts, authorPosts });
  };

  const deleteContext = (postObject) => {
    const allposts = data?.allposts;
    const authorPosts = data?.authorPosts;
    const allIndex = allposts?.findIndex((post) => post._id === postObject._id);
    const authorIndex = authorPosts?.findIndex(
      (post) => post._id === postObject._id
    );
    if (allIndex >= 0) allposts.splice(allIndex, 1);
    if (authorIndex >= 0) authorPosts.splice(authorIndex, 1);
    setData({ ...data, allposts, authorPosts });
  };

  const handleUpdate = async (values) => {
    setError('');
    setUpdated('');
    if (isSame(values)) return;
    const result = await ApiService.updatePost(values);
    if (result.errors) setError(result.errors[0].msg);
    else {
      updateContext(result);
      setUpdated(successMessages.postUpdated);
    }
  };

  const handleDelete = async () => {
    setError('');
    setUpdated('');
    // eslint-disable-next-line no-alert
    if (window.confirm(warningMessages.confirmPostDeletion)) {
      const result = await ApiService.deletePost({ id: _id });
      if (result.errors) setError(result.errors[0].msg);
      else {
        deleteContext(result);
        navigate(-1);
      }
    }
  };

  const handlePublish = async () => {
    setError('');
    setUpdated('');
    const result = await ApiService.publishPost({ id: _id });
    if (result.errors) {
      setError(result.errors[0].msg);
    } else {
      setUpdated(successMessages.postPublished);
      publishPost();
    }
  };

  return (
    <>
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
      {author && <div>Created By: {author.name}</div>}
      <Formik
        initialValues={initialValues}
        validationSchema={postSchema}
        onSubmit={handleUpdate}
        enableReinitialize
      >
        {() => (
          <Form className="create-post-form">
            {!disabled && <h2 className="mb-5 text-center">Update Post</h2>}
            <InputField
              label="Title"
              name="title"
              type="text"
              disabled={disabled}
            />
            <InputField
              label="Body"
              name="content"
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
                {!published && (
                  <button
                    className="btn btn-success mt-3 w-25"
                    onClick={handlePublish}
                    type="button"
                  >
                    Publish
                  </button>
                )}
                <button className="btn btn-primary mt-3" type="submit">
                  Update
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}

export default PostEditable;
