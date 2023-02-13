/* React */
import React, { useEffect } from "react";

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

/* Interfaces */
import { ISideMenuProps } from "../../components/SideMenu/SideMenu";
import { ISideGroupProps } from "../../components/SideGroup/SideGroup";

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
    urlIcon:
      "https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-1/307840742_5590371681025446_113209348334201931_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeEoN3cSXjMWVPRd04qFQ6seVDiRpsFMQ1ZUOJGmwUxDVmE8hDWjua2qN6gberuAixBtSiqH3jDgeAvjK3ZP8xuD&_nc_ohc=AV9yFP3-3LYAX9sarEm&tn=n3O6v_yY3uAmZKrx&_nc_ht=scontent-otp1-1.xx&oh=00_AfAaMQVmIVFOoB1AtuVZ8uDc3QOUA6ETUIBu4zA1lKzNeA&oe=63E8384A",
    url: "https://www.google.com",
    name: "Morohoschi Daniel-Iosif",
    status: "online",
  },
  {
    urlIcon:
      "https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-1/237052691_4060455614053345_1199709775228937183_n.jpg?stp=c0.9.200.200a_dst-jpg_p200x200&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeEA7WKeQx2L-uMxP75SKyXNb4m33OtqYT9vibfc62phP-VgXB91cPe1p0HXFUBPgBAuZ2-Jx1ALRvuXa6DUC-yp&_nc_ohc=5F4v5E5IW0IAX_7Ixf5&_nc_ht=scontent-otp1-1.xx&oh=00_AfAs99VXVqP410ZbuZd0maMJyUGJQvVUwJvoNzaofC1oBw&oe=63EB5432",
    url: "https://www.google.com",
    name: "Alexandru Gabriel",
    status: "away",
  },
  {
    urlIcon:
      "https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-1/312016986_8288044681268503_8211581930910836586_n.jpg?stp=dst-jpg_s200x200&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeGDjfQHBnoOD_0utEtngpEc-QCcDgZuLvH5AJwOBm4u8ew3DvRrQUTFsMG5Zae9yHPCj6I3g5EV9Yyssvqpdmug&_nc_ohc=jGSy0C1uZ5MAX98FbPN&tn=n3O6v_yY3uAmZKrx&_nc_ht=scontent-otp1-1.xx&oh=00_AfCMMXdb8DOIjgKxW7Pff1nrlsGYLtyU9jwrT6swfgWxZw&oe=63EA7711",
    url: "https://www.google.com",
    name: "Ochis Alin",
    status: "online",
  },
  {
    urlIcon:
      "https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-1/311010100_1535668880227539_5528203846347179944_n.jpg?stp=c0.39.200.200a_dst-jpg_p200x200&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeGgr1BdCzhXPiKNwFE1J97PlO-Urcs2RZCU75StyzZFkNksA4GtxQqvgo9dS5fjRNR8YoFSYHDkdizn73CqsXam&_nc_ohc=FDeXUQrw5HQAX-cDCLf&_nc_ht=scontent-otp1-1.xx&oh=00_AfC4TXAL92uiMOnXmeuYwSsKj9n7QHHDofzuEYHvLS4qjA&oe=63EFC4AD",
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

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const [token, setToken, removeToken] = useCookies(["access-token"]);
  const cookieToken = token["access-token"] || undefined;

  useEffect(() => {
    isAuth(cookieToken)
      .then((userData) => console.log(userData))
      .catch((_err) => navigate("/login"));
  }, []);

  return (
    <>
      <Header />
      <div className=" w-full flex justify-between h-screen bg-gray-100 ">
        <LeftSide
          extraClassName="hidden md:block lg:block"
          events={eventsData}
          messages={messageData}
        />
        <div className="absolute inset-x-0 mx-auto my-6 p-4 2xl:max-w-screen-md md:max-w-screen-md">
          {" "}
          <Box extraClassName="my-2">asd</Box>
          <Box extraClassName="my-2">asd</Box>
        </div>

        <RightSide
          extraClassName="hidden md:block lg:block"
          menu={sideMenuData}
          groups={sideGroupData}
        />
      </div>
    </>
  );
};

export default Home;
