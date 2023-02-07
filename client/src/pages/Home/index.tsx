import axios from "axios";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store/store";
import isAuth from "../../utils/isAuth";

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const [token, setToken, removeToken] = useCookies(["access-token"]);
  const cookieToken = token["access-token"] || undefined;

  useEffect(() => {
    isAuth(cookieToken)
      .then((userData) => console.log(userData))
      .catch((_err) => navigate("/login"));
  });

  return (
    <>
      <div>Homepage</div>
    </>
  );
};

export default Home;
