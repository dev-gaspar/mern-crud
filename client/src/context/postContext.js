import { useState, createContext, useContext, useEffect } from "react";
import {
  getPostsRequest,
  createPostRequest,
  deletePostRequest,
  getPostRequest,
  updateRequest,
} from "../api/posts";

const context = createContext();

export const usePosts = () => {
  return useContext(context);
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await getPostsRequest();
    setPosts(res.data);
  };

  const createPost = async (post) => {
    try {
      const res = await createPostRequest(post);
      setPosts([...posts, res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (id) => {
    const res = await deletePostRequest(id);
    if (res.status === 204) {
      setPosts(posts.filter((post) => post._id !== id));
    }
  };

  const getPost = async (id) => {
    const res = await getPostRequest(id);
    return res.data;
  };

  const updatePost = async (id, post) => {
    const res = await updateRequest(id, post);
    setPosts(posts.map((post) => (post._id === id ? res.data : post)));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <context.Provider
      value={{
        posts,
        getPosts,
        createPost,
        deletePost,
        getPost,
        updatePost,
      }}
    >
      {children}
    </context.Provider>
  );
};
