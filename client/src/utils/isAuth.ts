import axios from "axios";

import { User } from "../models/user";

const isAuth = async (token: string) => {
  const userData: Promise<User> = new Promise(async (resolve, reject) => {
    if (token !== undefined) {
      try {
        const response = await axios.post(
          `http://${
            process.env.NODE_ENV === "development"
              ? process.env.REACT_APP_DEVELOPMENT_SERVER_DOMAIN
              : process.env.REACT_APP_PRODUCTION_SERVER_DOMAIN
          }:${
            process.env.NODE_ENV === "development"
              ? process.env.REACT_APP_DEVELOPMENT_SERVER_PORT
              : process.env.REACT_APP_PRODUCTION_SERVER_PORT
          }/api/auth/isAuth`,
          {},
          {
            headers: { "x-access-token": token },
          }
        );

        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    } else reject("Token required");
  });
  return userData;
};

export default isAuth;
