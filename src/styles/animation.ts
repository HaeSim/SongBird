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

export const FadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const FadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

export const SlideIn = keyframes`
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0%);
    }
`;

export const SlideOut = keyframes`
    from {
        transform: translateX(0%);
    }
    to {
        transform: translateX(100%);
    }
`;

export const SlideUp = keyframes`
    from {
        transform: translateY(10%);
    }
    to {
        transform: translateY(0%);
    }
`;

export const SlideDown = keyframes`
    from {
        transform: translateY(0%);
    }
    to {
        transform: translateY(100%);
    }
`;

export const SlideUpFadeIn = keyframes`
    from {
        transform: translateY(5%);
        opacity: 0;
    }
    to {
        transform: translateY(0%);
        opacity: 1;
    }
`;
