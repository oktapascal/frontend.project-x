import { css } from "@emotion/react";

export default function BackgroundOverlay() {
  return (
    <div
      css={css`
        background-color: rgba(0, 88, 228, 0.2);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      `}
    ></div>
  );
}
