import React, { useState, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import './LatestPermalinkPost.scss';

function PermalinkPost() {
  const [latestPost, setLatestPost] = useState([]);
  const { sendRequest: fetchPost } = useHttp();

  useEffect(async () => {
    const baseUrl = gsReactScript.url;

    const posts = fetchPost({ url: `${baseUrl}/wp-json/cpt/v1/form-calculation` });

    posts.then((post) => {
      const newestPosts = post[0];

      setLatestPost((prevLatestPost) => [...prevLatestPost, newestPosts]);
    });
  }, [fetchPost]);

  return <div>New Post</div>;
}

export default PermalinkPost;
