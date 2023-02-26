/* React */
import React, { createContext, useEffect, useState } from "react";

/* Query-string */
import queryString from "query-string";

/* Cookie */
import { useCookies } from "react-cookie";

/* Axios */
import axios from "axios";

/* Router */
import { useNavigate } from "react-router-dom";

/* Components */
import Box from "../../components/Box/Box";
import { IEventProps } from "../../components/SideEvent/SideEvent";
import Header from "../../components/Heading/Header";
import LeftSide, { Message } from "../../components/LeftSide/LeftSide";
import RightSide from "../../components/RightSide/RightSide";
import AddPost, { IAddedPost } from "../../components/AddPost/AddPost";
import Post, { IPostProps } from "../../components/Post/Post";

/* Interfaces */
import { ISideMenuProps } from "../../components/SideMenu/SideMenu";
import { ISideGroupProps } from "../../components/SideGroup/SideGroup";
import { User } from "../../models/user";

/* Utils */
import isAuth from "../../utils/isAuth";

/* Font Awesome */
import {
  faCartShopping,
  faHome,
  faPeopleGroup,
  faTv,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

/* Assets */
import gamerXCommunityImage from "../../assets/gamerXCommunnity.jpeg";
import photoshopImage from "../../assets/photoshop.jpeg";
import cssImage from "../../assets/css.jpeg";
import codImage from "../../assets/callofduty.jpeg";

/* Data for Right side and Left side */
const eventsData: Array<IEventProps> = [
  {
    day: 25,
    month: "December",
    title: "Christmas Day",
    url: "google.com",
    location: { street: "Maitama Park", country: "Abuja" },
  },
  {
    day: 26,
    month: "December",
    title: "Boxing Day",
    url: "google.com",
    location: { street: "Maitama Park", country: "Abuja" },
  },
];

const messageData: Array<Message> = [
  {
    urlIcon: "",
    url: "https://www.google.com",
    name: "Morohoschi Daniel-Iosif",
    status: "online",
  },
  {
    urlIcon: "",
    url: "https://www.google.com",
    name: "Alexandru Gabriel",
    status: "away",
  },
  {
    urlIcon: "",
    url: "https://www.google.com",
    name: "Ochis Alin",
    status: "online",
  },
  {
    urlIcon: "",
    url: "https://www.google.com",
    name: "Motofelea Emanuel",
    status: "offline",
  },
];

const sideGroupData: Array<ISideGroupProps> = [
  { title: "GamerX Community", imageUrl: gamerXCommunityImage, url: "" },
  { title: "Photoshop Romania", imageUrl: photoshopImage, url: "" },
  { title: "Best Ankara Styles", imageUrl: cssImage, url: "" },
  { title: "CODM Romania", imageUrl: codImage, url: "" },
  { title: "CODM Europe", imageUrl: codImage, url: "" },
];

const sideMenuData: Array<ISideMenuProps> = [
  {
    text: "Feed",
    icon: faHome,
    url: "",
  },
  {
    text: "Watch",
    icon: faTv,
    url: "",
  },
  {
    text: "Friends",
    icon: faUserGroup,
    url: "",
  },
  {
    text: "Groups",
    icon: faPeopleGroup,
    url: "",
  },
  {
    text: "Marketplace",
    icon: faCartShopping,
    url: "",
  },
];

interface IInitialData {
  userData: User;
  postData: Array<IPostProps>;
}

const initialData: IInitialData = {
  userData: {
    email: "",
    firstName: "",
    iat: 0,
    id: 0,
    isValidate: 0,
    lastName: "",
  },
  postData: [],
};
export const UserContext = createContext<User>(initialData.userData);

const Home = (): JSX.Element => {
  const [data, setData] = useState(initialData);
  const navigate = useNavigate();
  const [token, setToken, removeToken] = useCookies(["access-token"]);
  const cookieToken = token["access-token"] || undefined;
  console.log(data.postData[0]);
  let page = 0;
  let hasMorePosts = true;
  let limit = 10;

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);

    /* Fetch posts */
    const fetchData = async () => {
      let userData: User = {
        email: "",
        firstName: "",
        iat: 0,
        id: 0,
        isValidate: 0,
        lastName: "",
      };

      /* Check user authentication */
      try {
        userData = await isAuth(cookieToken);
        const postData = await axios.get(
          `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/posts/${userData.id}?limit=${limit}&page=${page}`
        );
        setData({ userData, postData: postData.data });
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
          }/api/posts/130?limit=${limit}&page=${(page += 1)}`
        );

        postData.data.length === 0
          ? (hasMorePosts = false)
          : (hasMorePosts = true);

        setData((prevData) => {
          return {
            userData: prevData.userData,
            postData: [...prevData.postData, ...postData.data],
          };
        });
      }
    }
  };

  const deletePostHandler = (event: any) => {
    const filtredData = data.postData.filter((post) => post.id !== event);

    setData((current) => {
      return {
        userData: current.userData,
        postData: current.postData.filter((post) => post.id !== event),
      };
    });
  };

  const addPostHandler = (event: IAddedPost) => {
    setData((prevData) => {
      const postAdded: IPostProps = {
        firstName: data.userData.firstName,
        lastName: data.userData.lastName,
        id: event.id,
        desc: event.description,
        userId: data.userData.id,
        createdAt: "just now",
        img: event.imageUrl,
        likes: 0,
        comments: 0,
        liked: "",
      };

      return {
        userData: prevData.userData,
        postData: [postAdded, ...prevData.postData],
      };
    });
  };

  return (
    <UserContext.Provider value={data.userData}>
      <Header menu={sideMenuData} />
      <div className=" w-full flex justify-between h-full bg-gray-100 ">
        <LeftSide
          extraClassName="hidden md:block lg:block"
          events={eventsData}
          messages={messageData}
        />
        <div className="inset-x-0 mx-auto my-6 p-4 w-full md:w-1/2 lg:max-w-4xl">
          {/* Add post section */}
          <Box extraClassName="mb-10 p-5">
            <AddPost onAddPost={(event: IAddedPost) => addPostHandler(event)} />
          </Box>
          {/* Posts sections */}
          {data.postData.map((post, index) => (
            <Box key={index} extraClassName="mb-10 p-5">
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
                onDeletePost={(event: any) => deletePostHandler(event)}
              />
            </Box>
          ))}
        </div>

        <RightSide
          extraClassName="hidden md:block lg:block"
          menu={sideMenuData}
          groups={sideGroupData}
        />
      </div>
    </UserContext.Provider>
  );
};

export default Home;
