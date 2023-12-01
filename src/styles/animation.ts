import { keyframes } from '@emotion/react';

export const Spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

export const Grow = (size?: number) => {
  if (size) {
    return keyframes`
          to {
              width: ${size}px;
              height: ${size}px;
              margin-top: -8px;
              right: 13px;
          }`;
  }

  return keyframes`
      to {
          width: 14px;
          height: 14px;
          margin-top: -8px;
          right: 13px;
      }
     `;
};
