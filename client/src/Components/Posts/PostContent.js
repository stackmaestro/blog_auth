import React from 'react';

function PostContent({ author, title, content, published }) {
  return (
    <>
      {published ? (
        <span className="text-success">Published</span>
      ) : (
        <span className="text-danger">Not Published</span>
      )}
      {author && <div>Created By: {author.name}</div>}
      <h3>{title}</h3>
      <p className="post-paragraph">{content}</p>
    </>
  );
}

export default PostContent;
