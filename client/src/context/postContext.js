import { useState, createContext, useContext, useEffect } from "react";
import { getPostsRequests, createPostRequests } from "../api/posts";

const context = createContext();

export const usePosts = () => {
  return useContext(context);
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await getPostsRequests();
    setPosts(res.data);
  };

  const createPost = async (post) => {
    const res = await createPostRequests(post);
    setPosts([...posts, res.data]);
  };

  useEffect(() => {
    getPosts();
    createPost();
  }, []);

  return (
    <context.Provider
      value={{
        posts,
        getPosts,
        createPost,
      }}
    >
      {children}
    </context.Provider>
  );
};
