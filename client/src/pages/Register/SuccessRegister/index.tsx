/* React */
import React, { useEffect } from "react";

/* Route */
import { useNavigate, useParams } from "react-router-dom";

/* Components */
import Box from "../../../components/Box/Box";
import Button from "../../../components/Button/Button";
import Container from "../../../components/Container/Container";
import Heading from "../../../components/Heading/Heading";
import Href from "../../../components/Href/Href";
import Layout from "../../../components/Layout/Layout";
import Text from "../../../components/Text/Text";

/* Font awesome */
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* Axios */
import axios from "axios";

const baseClassIcon = "checked-icon";
const templateClassIcon = "!h-32 text-[#c3beff]";

const SuccessRegister = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(
        `http://${
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEVELOPMENT_SERVER_DOMAIN
            : process.env.REACT_APP_PRODUCTION_SERVER_DOMAIN
        }:${
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEVELOPMENT_SERVER_PORT
            : process.env.REACT_APP_PRODUCTION_SERVER_PORT
        }/api/auth/register/success/${token}`
      )
      .then((_resp) => {})
      .catch((error) => {
        navigate("/login");
      });
  });
  const className = `${baseClassIcon} ${templateClassIcon}`;

  return (
    <Layout extraStyle={{ backgroundColor: "#c3beff" }}>
      <Container width="1/2" height="1/2">
        <Box
          flexDirection="column"
          extraStyle={{ width: "100%", height: "100%" }}
        >
          {" "}
          <FontAwesomeIcon icon={faEnvelopeCircleCheck} className={className} />
          <Heading extraStyle={{ padding: "10px" }}>
            Account successfully created
          </Heading>
          <Text extraStyle={{ padding: "10px" }}>
            A verification link has been sent to your email account.
          </Text>
          <Href href="/#/login">
            <Button type="button" size="small" extraStyle={{ margin: "20px" }}>
              Go to Login page
            </Button>
          </Href>
        </Box>
      </Container>
    </Layout>
  );
};

export default SuccessRegister;
