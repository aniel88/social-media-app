/* React */
import React, { createContext, useEffect, useState } from "react";

/* Cookie */
import { useCookies } from "react-cookie";

/* Axios */
import axios from "axios";

/* Router */
import { useNavigate } from "react-router-dom";

/* Components */
import Box from "../../components/Box/Box";
import Header from "../../components/Heading/Header";
import LeftSide, {
  eventsData,
  messageData,
} from "../../components/LeftSide/LeftSide";
import RightSide, {
  sideGroupData,
  sideMenuData,
} from "../../components/RightSide/RightSide";
import AddPost, { IAddedPost } from "../../components/AddPost/AddPost";
import Post, { IPostProps } from "../../components/Post/Post";

/* Interfaces */
import { User } from "../../models/user";

/* Utils */
import isAuth from "../../utils/isAuth";
import { selectPostData, selectUserData } from "../../utils/selectors";

/* Redux */
import { setUserData } from "../../redux/reducers/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { setPostData } from "../../redux/reducers/post/postSlice";
import NoPosts from "../../components/NoPosts/NoPosts";

interface IInitialData {
  userData: User;
  postData: Array<IPostProps>;
}

export const initialData: IInitialData = {
  userData: {
    email: "",
    firstName: "",
    userName: "",
    iat: 0,
    id: 0,
    isValidate: 0,
    lastName: "",
  },
  postData: [],
};

const Home = (): JSX.Element => {
  /* User Data */
  const userData = useSelector(selectUserData);
  /* User Posts */
  const userPosts = useSelector(selectPostData);
  const navigate = useNavigate();
  const [token, setToken, removeToken] = useCookies(["access-token"]);
  const cookieToken = token["access-token"] || undefined;
  const dispatch = useDispatch<AppDispatch>();

  let page = 0;
  let hasMorePosts = true;
  let limit = 10;

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);

    /* Fetch posts */
    const fetchData = async () => {
      /* Check user authentication */
      try {
        const userData = await isAuth(cookieToken);
        console.log(userData);
        /* Dispatch user data */
        dispatch(setUserData({ userData: userData }));
        const postData = await axios.get(
          `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/posts/${userData.id}?limit=${limit}&page=${page}`
        );
        /* Dispatch post data */
        dispatch(setPostData({ postData: postData.data }));
      } catch (err) {
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  const infiniteScroll = async () => {
    const windowInnerHeight = window.innerHeight;
    const scrollToTop = document.documentElement.scrollTop;
    const offsetHeight = document.documentElement.offsetHeight;

    if (windowInnerHeight + scrollToTop === offsetHeight) {
      if (hasMorePosts) {
        const postData = await axios.get(
          `http://${process.env.REACT_APP_DOMAIN}:${
            process.env.REACT_APP_SERVER_PORT
          }/api/posts/171?limit=${limit}&page=${(page += 1)}`
        );

        postData.data.length === 0
          ? (hasMorePosts = false)
          : (hasMorePosts = true);

        /* Dispatch post data */
        dispatch(setPostData({ postData: postData.data }));
      }
    }
  };

  return (
    <div>
      <Header menu={sideMenuData} />
      <div className="w-full flex justify-between min-h-[calc(100vh-3.5rem)] bg-gray-100">
        {/* Left side */}
        <LeftSide
          extraClassName="hidden md:block lg:block"
          events={eventsData}
          messages={messageData}
        />

        <div className="inset-x-0 mx-auto my-6 p-4 w-full md:w-1/2 lg:max-w-4xl">
          {/* Add post section */}
          <Box extraClassName="mb-10 p-5">
            <AddPost />
          </Box>
          {/* Posts sections */}
          {userPosts.length === 0 ? (
            <NoPosts />
          ) : (
            userPosts.map(
              (post: {
                firstName: string;
                lastName: string;
                id: number;
                userId: number;
                createdAt: string;
                likes: number;
                comments: number;
                liked: string;
                desc: string | undefined;
                img: string | undefined;
              }) => (
                <Box key={post.id} extraClassName="mb-10 p-5">
                  <Post
                    firstName={post.firstName}
                    lastName={post.lastName}
                    id={post.id}
                    userId={post.userId}
                    createdAt={post.createdAt}
                    likes={post.likes}
                    comments={post.comments}
                    liked={post.liked}
                    desc={post.desc}
                    img={post.img}
                  />
                </Box>
              )
            )
          )}
        </div>
        {/* Right side */}
        <RightSide
          extraClassName="hidden md:block lg:block"
          menu={sideMenuData}
          groups={sideGroupData}
        />
      </div>
    </div>
  );
};

export default Home;
