import styled from "styled-components";
import Section from ".";

const Box = styled(Section)<{ flexDirection?: string }>`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection === "column" ? "column" : "row"};
  flex-shrink: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 0;
  height: auto;
  width: auto;
  border-radius: 10px;
  overflow: hidden;
  -webkit-box-shadow: 0px 0px 18px -5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 18px -5px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 18px -5px rgba(0, 0, 0, 0.75);
`;

export default Box;
