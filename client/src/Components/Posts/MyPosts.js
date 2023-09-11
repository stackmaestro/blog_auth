import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useParams } from 'react-router-dom';
import ApiService from '../../api/ApiService';
import CreatePost from './CreatePost';
import useAuth from '../../hooks/useAuth';
import 'react-tabs/style/react-tabs.css';
import PostItem from './PostItem';
import NotFound from '../../Pages/NotFound';
import Loader from '../Loader';
import { AppContext } from '../../context/AppContext';

function MyPosts() {
  const { data, setData } = React.useContext(AppContext);
  const [posts, setPosts] = React.useState(data?.authorPosts ?? []);
  const [hasPublished, setHaspub] = React.useState(false);
  const [hasNonpub, setHasnonpub] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  const { user } = useAuth();
  const { author } = useParams();

  const refreshStates = (postsCollection) => {
    setPosts(postsCollection);
    setHaspub(postsCollection.some((item) => item.published));
    setHasnonpub(postsCollection.some((item) => !item.published));
    setData({ ...data, authorPosts: postsCollection });
  };

  React.useEffect(() => {
    const fetchPosts = async () => {
      const result = await ApiService.getUserPosts();
      if (result.errors) {
        setError(result.errors[0].msg);
      } else {
        refreshStates(result);
      }
    };
    if (!data.authorPosts) {
      fetchPosts();
    } else {
      refreshStates(data.authorPosts);
    }
    setLoading(false);
  }, []);

  const insertNewPost = (newPost) => {
    const allPosts = JSON.parse(JSON.stringify(posts));
    allPosts.unshift(newPost);
    refreshStates(allPosts);
  };

  const publishPost = (publishedPost) => {
    let allPosts = JSON.parse(JSON.stringify(posts));
    allPosts = allPosts.map((post) =>
      post._id === publishedPost._id ? publishedPost : post
    );
    const allContextPosts = data.allposts ?? [];
    allContextPosts.unshift(publishedPost);
    setData({ ...data, allposts: allContextPosts });
    refreshStates(allPosts);
  };

  if (user && user?.name !== author) {
    return <NotFound />;
  }

  return (
    <div className="container">
      <h1 className="text-center">My Posts</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {user && <CreatePost insertNewPost={insertNewPost} />}
      <div className="py-5">
        {!loading ? (
          <Tabs>
            <TabList>
              <Tab>Non-Published</Tab>
              <Tab>Published</Tab>
            </TabList>

            <TabPanel>
              {hasNonpub ? (
                <div className="d-flex flex-wrap">
                  {posts.length > 0 &&
                    posts.map((post) => {
                      if (!post.published) {
                        return (
                          <div
                            key={post._id}
                            className="p-2 mb-5 col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
                          >
                            <PostItem {...post} publishPost={publishPost} />
                          </div>
                        );
                      }
                      return null;
                    })}
                </div>
              ) : (
                <h1 className="text-center text-warning">
                  No Non-Published Posts Found
                </h1>
              )}
            </TabPanel>
            <TabPanel>
              {hasPublished ? (
                <div className="d-flex flex-wrap">
                  {posts.length > 0 &&
                    posts.map((post) => {
                      if (post.published) {
                        return (
                          <div
                            key={post._id}
                            className="p-2 mb-5 col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
                          >
                            <PostItem {...post} publishPost={publishPost} />
                          </div>
                        );
                      }
                      return null;
                    })}
                </div>
              ) : (
                <h1 className="text-center text-warning">
                  No Published Posts Found
                </h1>
              )}
            </TabPanel>
          </Tabs>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default MyPosts;
