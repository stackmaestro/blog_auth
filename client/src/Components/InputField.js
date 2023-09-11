import React from 'react';
import { useField, ErrorMessage } from 'formik';

function InputField({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="form-group mb-2">
      <label className="form-label w-100" htmlFor={field.name}>
        {label}
        {props.type !== 'textarea' && (
          <input
            className={`form-control ${
              meta.touched && meta.error && 'formik-field-invalid'
            }`}
            {...field}
            {...props}
          />
        )}
        {props.type === 'textarea' && (
          <textarea
            className={`form-control ${
              meta.touched && meta.error && 'formik-field-invalid'
            }`}
            {...field}
            {...props}
          />
        )}
      </label>
      {meta.touched && meta.error ? (
        <ErrorMessage
          component="div"
          name={field.name}
          className="formik-field-error"
        />
      ) : null}
    </div>
  );
}

export default InputField;
