import styled from "styled-components";

const RegisterImageLayout = styled.div`
  position: relative;
  z-index: 1;
  flex-shrink: 1;
`;

const RegisterImage = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 40px;
  height: 100%;
  width: 100%;
  background: rgb(100, 100, 128);
  background: linear-gradient(
    90deg,
    rgba(100, 100, 128, 0.74) 0%,
    rgba(100, 100, 128, 0.74) 100%
  );
`;

const RegisterImageTitle = styled.div`
  font-weight: bold;
  font-size: 60px;
  line-height: 50px;
  text-align: left;
  color: white;
`;

const RegisterImageText = styled.div`
  font-size: 16px;
  text-align: left;
  margin: 30px 0;
  line-height: 20px;
  color: white;
`;

export {
  RegisterImageLayout,
  RegisterImage,
  RegisterImageTitle,
  RegisterImageText,
};
