/* React */
import {
  faCamera,
  faLocationDot,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import Button from "../Button/Button";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import UserIcon from "../UserIcon/UserIcon";

export interface IAddPostProps {
  onAddPost: any;
}

export interface IAddedPost {
  imageUrl?: string;
  description: string;
  id: number;
}

const AddPost = ({ onAddPost }: IAddPostProps) => {
  const [image, setImage] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [token, setToken, removeToken] = useCookies(["access-token"]);
  let currentToken = "";
  currentToken = token["access-token"];
  const inputImageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (image.length < 1) return;
    const newImageUrl = [];
    newImageUrl.push(URL.createObjectURL(image[0]));
    setImageUrl(newImageUrl[0]);
  }, [image]);

  const onImageChange = (e: { target: { files: any } }) => {
    setImage(e.target.files);
  };

  const onUploadImageClick = () => {
    if (inputImageRef.current !== null) {
      inputImageRef.current.click();
    }
  };

  const onAddPostHandler = async () => {
    const formData = new FormData();
    formData.append("postImage", image[0]);
    formData.append("description", description);

    const addedPostId = await axios.post(
      `http://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/api/posts/add`,
      formData,
      {
        headers: {
          "x-access-token": currentToken,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    onAddPost({ imageUrl: imageUrl, description, id: addedPostId.data });
    setImageUrl("");
    setDescription("");
  };

  return (
    <div className="add-post-wrapper w-full lex flex-col">
      <div className="flex flex-row items-center">
        <div>
          <UserIcon showStatus={false} icon="" />
        </div>

        <div className="flex flex-row justify-between w-full">
          <input
            type="text"
            name="image"
            accept="image/*"
            className="user-post flex items-center w-full mx-3 placeholder-gray-400 resize-none p-2 focus:rounded-2xl"
            placeholder="What's on your mind, Daniel-Iosif?"
            value={description}
            onChange={(event) => setDescription(event?.target.value)}
          />
          {imageUrl[0] ? (
            <img className="h-14 w-14" src={imageUrl} alt="image-upload" />
          ) : (
            ""
          )}
        </div>
      </div>
      <HorizontalLine customClassName="bg-gray-200" />
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <button
            onClick={() => onUploadImageClick()}
            className="flex flex-row items-center text-gray-400 text-sm mr-3"
            title="Add image"
          >
            <input
              type="file"
              className="hidden"
              itemType="image/png"
              ref={inputImageRef}
              id="postImage"
              name="postImage"
              onChange={onImageChange}
            />
            <FontAwesomeIcon
              className="text-green-600 text-xl mr-2"
              icon={faCamera}
            />
            Add image
          </button>
          <button
            className="flex flex-row items-center text-gray-400 text-sm mr-3"
            title="Add location"
          >
            <FontAwesomeIcon
              className="text-blue-600 text-xl mr-2"
              icon={faLocationDot}
            />
            Add location
          </button>
          <button
            className="flex flex-row items-center text-gray-400 mr-3 text-sm"
            title="Tag friend"
          >
            <FontAwesomeIcon
              className="text-yellow-600 text-xl mr-2"
              icon={faUserTag}
            />
            Tag friend
          </button>
        </div>
        <Button
          isDisabled={description.length === 0 && imageUrl.length === 0}
          size="small"
          onClick={() => onAddPostHandler()}
        >
          Share
        </Button>
      </div>
    </div>
  );
};

export default AddPost;
