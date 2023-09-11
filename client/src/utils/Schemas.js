import * as Yup from 'yup';
import errorMessages from './errors';

export const authSchema = () =>
  Yup.object({
    name: Yup.string()
      .trim()
      .required(errorMessages.nameRequired)
      .max(15, errorMessages.nameMax),
    email: Yup.string()
      .trim()
      .email(errorMessages.emailInvalid)
      .required(errorMessages.emailRequired),
    password: Yup.string()
      .min(6, errorMessages.minPassword)
      .required(errorMessages.passRequired),
  });

export const loginSchema = () =>
  Yup.object({
    email: Yup.string()
      .trim()
      .email(errorMessages.emailInvalid)
      .required(errorMessages.emailRequired),
    password: Yup.string().trim().required(errorMessages.passRequired),
  });

export const postSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required(errorMessages.postTitleRequired)
    .min(15, errorMessages.postTitleMin),
  content: Yup.string()
    .trim()
    .required(errorMessages.postContentRequired)
    .min(50, errorMessages.postContentMin),
});

export const commentSchema = Yup.object({
  text: Yup.string().trim().required(errorMessages.commentTextRequired),
});
