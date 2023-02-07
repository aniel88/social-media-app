import axios from "axios";

import { User } from "../models/user";

const isAuth = async (token: string) => {
  const userData: Promise<User> = new Promise(async (resolve, reject) => {
    if (token !== undefined) {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/auth/isAuth`,
          {},
          {
            headers: { "x-access-token": token },
          }
        );
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    } else reject(new Error("Token required"));
  });
  return userData;
};

export default isAuth;
