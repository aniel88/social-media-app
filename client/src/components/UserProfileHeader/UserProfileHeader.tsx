/* React */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../utils/selectors";

/* Default user image */
import defaultUserImage from "../../assets/default-user-image.jpg";

/* Default user cover image */
import defaultCoverImage from "../../assets/default-cover-image.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

import { AppDispatch } from "../../redux/store/store";
import { changeUserProfileImage } from "../../redux/reducers/user/userSlice";

const UserProfileHeader = () => {
  const userData = useSelector(selectUserData);
  const [userProfileImage, setUserProfileImage] = useState([]);
  const [userProfileImageUrl, setUserProfileImageUrl] = useState("");
  const [userCoverImage, setUserCoverImage] = useState([]);
  const [userCoverImageUrl, setUserCoverImageUrl] = useState("");
  const [token, setToken, removeToken] = useCookies(["access-token"]);
  console.log(userData.coverPic);
  const cookieToken = token["access-token"] || undefined;
  const inputCoverImageRef = useRef<HTMLInputElement>(null);
  const inputUserProfileImageRef = useRef<HTMLInputElement>(null);
  const { userName } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    let newImageUrl = [];
    if (userProfileImage.length < 1) return;
    newImageUrl.push(URL.createObjectURL(userProfileImage[0]));
    setUserProfileImageUrl(newImageUrl[0]);

    if (userCoverImage.length < 1) return;
    newImageUrl = [];
    newImageUrl.push(URL.createObjectURL(userCoverImage[0]));
    setUserCoverImageUrl(newImageUrl[0]);
  }, [userProfileImage, userCoverImage]);

  const onUploadCoverImage = () => {
    if (inputCoverImageRef.current !== null) {
      inputCoverImageRef.current.click();
    }
  };
  console.log(userCoverImage);
  const onCoverImageChange = async (e: { target: { files: any } }) => {
    const formData = new FormData();
    formData.append("userCoverImage", e.target.files[0]);
    console.log(e.target.files[0]);
    const response = await axios.post(
      `http://localhost:8080/api/user/cover`,
      formData,
      {
        headers: {
          "x-access-token": cookieToken,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setToken("access-token", response.data, {
      path: "/",
    });

    setUserCoverImage(e.target.files);
  };

  const onUploadUserProfileImage = () => {
    if (inputUserProfileImageRef.current !== null) {
      inputUserProfileImageRef.current.click();
    }
  };

  const onUserProfileImageChange = async (e: { target: { files: any } }) => {
    const formData = new FormData();
    formData.append("userProfileImage", e.target.files[0]);
    console.log(e.target.files[0]);
    const response = await axios.post(
      `http://localhost:8080/api/user/profile`,
      formData,
      {
        headers: {
          "x-access-token": cookieToken,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    setToken("access-token", response.data.token, {
      path: "/",
    });

    dispatch(changeUserProfileImage(e.target.files));
    console.log(e.target.files);
    setUserProfileImage(e.target.files);
  };
  return (
    <div className="relative mb-10 h-72">
      <button
        className="relative cursor-pointer group min-w-full"
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
            className="object-cover min-h-full min-w-full"
            src={
              userCoverImageUrl.length === 0
                ? userData.coverPic
                  ? `http://localhost:8080/uploads/users/cover/${userData.coverPic}`
                  : defaultCoverImage
                : userCoverImageUrl
            }
            alt="cover-image"
          />
        </div>
        <div className="absolute rounded-2xl hidden bg-gray-400 top-0 left-0 w-full h-full change-photo justify-center items-center group-hover:block group-hover:flex">
          <FontAwesomeIcon className="h-12 w-12" icon={faCamera} />
        </div>
      </button>
      <button className="h-auto" onClick={() => onUploadUserProfileImage()}>
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
              userProfileImageUrl.length === 0
                ? userData.profilePic !== null
                  ? `http://localhost:8080/uploads/users/profile/${userData.profilePic}`
                  : defaultUserImage
                : userProfileImageUrl
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
    </div>
  );
};

export default UserProfileHeader;
