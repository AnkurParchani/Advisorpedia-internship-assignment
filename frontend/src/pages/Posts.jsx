import { useEffect, useState } from "react";
import { handleApiError } from "../utils/handleApiError";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import newRequest from "../utils/newRequest";
import Post from "../ui/Post";
import { useAuth } from "../contexts/useAuth";

const Posts = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  // Getting all the posts according to a particular page
  useEffect(() => {
    async function getPosts() {
      try {
        setIsLoading(true);
        const res = await newRequest.get(`/posts/${page}`, {
          withCredentials: true,
        });

        if (res.data?.posts)
          setPosts((prevPosts) => [...prevPosts, ...res.data.posts]);
      } catch (err) {
        if (err?.response?.data?.message === "Login first to continue") {
          navigate("/login");
          setIsLoggedIn(false);
          toast("Login first to view posts", { type: "error" });
        } else return handleApiError(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (isLoggedIn) {
      if (inView && !isLoading) {
        setPage((prevPage) => prevPage + 1);
        getPosts();
      }
    }
  }, [page, inView, isLoading, navigate, setIsLoggedIn, isLoggedIn]);

  return (
    <div className="sm:max-w-6xl max-w-xl mx-auto px-8">
      <h1 className="font-semibold text-purple-900 text-3xl mt-3">Posts:</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 py-5">
        {posts.map((post, i) => (
          <Post post={post} key={i} />
        ))}
      </div>
      <Spinner
        className="flex justify-center py-2"
        color="secondary"
        size="md"
        ref={ref}
      />
    </div>
  );
};

export default Posts;
