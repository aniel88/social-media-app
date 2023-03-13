/* React */
import React, { useEffect, useRef, useState } from "react";

/* Default user image */
import defaultUserImage from "../../assets/default-user-image.jpg";

/* Default user cover image */
import defaultCoverImage from "../../assets/default-cover-image.jpg";

/* Font Awesome icon */
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* Axios */
import axios from "axios";

/* Cookie */
import { useCookies } from "react-cookie";

/* Redux */
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../../redux/reducers/post/postSlice";
import { setUserData } from "../../redux/reducers/user/userSlice";
import { AppDispatch } from "../../redux/store/store";

/* Router */
import { useNavigate, useParams } from "react-router-dom";

/* Components */
import Box from "../../components/Box/Box";
import Button from "../../components/Button/Button";
import Header from "../../components/Heading/Header";
import LeftSide, {
  eventsData,
  messageData,
} from "../../components/LeftSide/LeftSide";
import NoPosts from "../../components/NoPosts/NoPosts";
import Post from "../../components/Post/Post";
import RightSide, {
  sideGroupData,
  sideMenuData,
} from "../../components/RightSide/RightSide";

/* Utils */
import isAuth from "../../utils/isAuth";
import { selectPostData, selectUserData } from "../../utils/selectors";
import UserProfileHeader from "../../components/UserProfileHeader/UserProfileHeader";

const UserProfile = () => {
  const userData = useSelector(selectUserData);
  const userPosts = useSelector(selectPostData);
  const [userProfileImage, setUserProfileImage] = useState([]);
  const [userProfileImageUrl, setUserProfileImageUrl] = useState("");
  const [userCoverImage, setUserCoverImage] = useState([]);
  const [userCoverImageUrl, setUserCoverImageUrl] = useState("");
  const inputCoverImageRef = useRef<HTMLInputElement>(null);
  const inputUserProfileImageRef = useRef<HTMLInputElement>(null);
  const { userName } = useParams();
  console.log(userName, userData.userName);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [token, setToken, removeToken] = useCookies(["access-token"]);
  const cookieToken = token["access-token"] || undefined;
  console.log(userProfileImage);
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
        /* Dispatch user data */
        dispatch(setUserData({ userData: userData }));
        const postData = await axios.get(
          `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/posts/user/${userData.userName}?limit=${limit}&page=${page}`
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
          }/api/posts/${userData.userName}?limit=${limit}&page=${(page += 1)}`
        );

        postData.data.length === 0
          ? (hasMorePosts = false)
          : (hasMorePosts = true);

        /* Dispatch post data */
        dispatch(setPostData({ postData: postData.data }));
      }
    }
  };

  const onUploadCoverImage = () => {
    if (inputCoverImageRef.current !== null) {
      inputCoverImageRef.current.click();
    }
  };

  const onCoverImageChange = (e: { target: { files: any } }) => {
    setUserCoverImage(e.target.files);
  };

  const onUploadUserProfileImage = () => {
    if (inputUserProfileImageRef.current !== null) {
      inputUserProfileImageRef.current.click();
    }
  };

  const onUserProfileImageChange = (e: { target: { files: any } }) => {
    setUserProfileImage(e.target.files);
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
          <div className="inset-x-0 mx-auto w-full lg:max-w-4xl">
            {/* <div className="relative mb-10 h-72">
              <button
                className="relative cursor-pointer group"
                onClick={() => onUploadCoverImage()}
              >
                <input
                  type="file"
                  className="hidden"
                  itemType="image/png"
                  ref={inputCoverImageRef}
                  id="coverImage"
                  name="coverImage"
                  onChange={onCoverImageChange}
                />
                <div className="cover-image rounded-2xl cursor-pointer h-48 w-full bg-white flex justify-center items-center overflow-hidden">
                  <img
                    className="object-cover min-h-full"
                    src={
                      userData.coverPic ? userData.coverPic : defaultCoverImage
                    }
                    alt="cover-image"
                  />
                </div>
                <div className="absolute rounded-2xl hidden bg-gray-400 top-0 left-0 w-full h-full change-photo justify-center items-center group-hover:block group-hover:flex">
                  <FontAwesomeIcon className="h-12 w-12" icon={faCamera} />
                </div>
              </button>
              <button
                className="h-auto"
                onClick={() => onUploadUserProfileImage()}
              >
                <input
                  type="file"
                  className="hidden"
                  itemType="image/png"
                  ref={inputUserProfileImageRef}
                  id="userProfileImage"
                  name="userProfileImage"
                  onChange={onUserProfileImageChange}
                />
                <div className="profile-image group cursor-pointer absolute h-32 w-32 rounded-full bg-blue-500 flex justify-center items-center top-40 left-6 overflow-hidden border-4 border-white">
                  <img
                    className="object-cover min-h-full"
                    src={
                      userData.profilePic
                        ? userData.profilePic
                        : defaultUserImage
                    }
                    alt="profile-image"
                  />
                  <div className="absolute hidden bg-gray-400 top-0 left-0 w-full h-full change-photo justify-center items-center group-hover:block group-hover:flex">
                    <FontAwesomeIcon className="h-12 w-12" icon={faCamera} />
                  </div>
                </div>
              </button>
              <div className="ml-40 mt-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-lg">
                    {userData.firstName} {userData.lastName}
                  </div>
                  <div>1.3k followers</div>
                </div>
                {userName === userData.userName ? (
                  ""
                ) : (
                  <Button size="small">Follow</Button>
                )}
              </div>
            </div> */}
            <UserProfileHeader />
          </div>
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

export default UserProfile;
