import { FC } from "react";
import styled from "styled-components";

const StyledBackgroundOverlay = styled.div`
  background-oolor: rgba(0, 88, 228, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: "100%;
`;

const BackgroundOverlay: FC = () => <StyledBackgroundOverlay />;

export default BackgroundOverlay;
