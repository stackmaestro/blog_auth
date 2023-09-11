import React from 'react';
import { Formik, Form } from 'formik';
import InputField from '../InputField';
import ApiService from '../../api/ApiService';
import { commentSchema } from '../../utils/Schemas';

function AddComment({ postId, insertNewComment }) {
  const [error, setError] = React.useState(false);

  const initialValues = {
    text: '',
    postId: postId || '',
  };

  const handleUpdate = async (values, { resetForm }) => {
    setError('');
    const result = await ApiService.addComment(values);
    if (result.errors) setError(result.errors[0].msg);
    else {
      resetForm(initialValues);
      insertNewComment(result);
    }
  };

  return (
    <>
      <h2 className="text-center"> Add Comment</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={commentSchema}
        onSubmit={handleUpdate}
        enableReinitialize
      >
        {() => (
          <Form className="create-post-form">
            <InputField label="Body" name="text" type="textarea" rows={5} />
            <div className="d-flex w-100 justify-content-end">
              <button className="btn btn-primary mt-3" type="submit">
                Add Comment
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddComment;
