import React from 'react';
import PostItem from './PostItem';
import ApiService from '../../api/ApiService';
import Loader from '../Loader';
import { AppContext } from '../../context/AppContext';

function AllPosts() {
  const { data, setData } = React.useContext(AppContext);

  const [allPosts, setAllposts] = React.useState(data?.allposts ?? []);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPosts = async () => {
      const result = await ApiService.getAllPosts();
      if (result.errors) {
        setError(result.errors[0].msg);
      } else {
        setAllposts(result);
        setData({ ...data, allposts: result });
      }
    };
    if (!data.allposts) {
      fetchPosts();
    }
    setLoading(false);
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">All Posts</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {!loading ? (
        <div className="d-flex flex-wrap">
          {allPosts.length > 0 ? (
            allPosts.map((post) => (
              <div
                key={post._id}
                className="p-2 mb-5 col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
              >
                <PostItem {...post} />
              </div>
            ))
          ) : (
            <h1 className="text-center text-warning w-100">No Posts Found</h1>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default AllPosts;
