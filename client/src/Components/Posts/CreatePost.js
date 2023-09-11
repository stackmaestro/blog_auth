import React from 'react';
import { Formik, Form } from 'formik';
import InputField from '../InputField';
import ApiService from '../../api/ApiService';
import { postSchema } from '../../utils/Schemas';

const initialValues = {
  title: '',
  content: '',
};

function CreatePost({ insertNewPost }) {
  const [error, setError] = React.useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await ApiService.createPost(values);
      if (result.errors) {
        setError(result.errors[0].msg);
      } else {
        resetForm(initialValues);
        insertNewPost(result);
      }
    } catch (e) {
      setError(e);
    }
  };

  return (
    <>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={postSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="create-post-form">
            <h2 className="mb-5 text-center">Create Post</h2>
            <InputField label="Title" name="title" type="text" />
            <InputField label="Body" name="content" type="textarea" rows={7} />
            <div className="d-flex w-100 justify-content-end">
              <button className="btn btn-primary mt-3" type="submit">
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CreatePost;
