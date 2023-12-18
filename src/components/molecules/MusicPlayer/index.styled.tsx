import { styled, Typography } from '@mui/material';

import theme from '@/styles/theme';

// eslint-disable-next-line @typescript-eslint/no-shadow
const Widget = styled('div')`
  padding: 16;
  border-radius: 16px;
  width: 343px;
  max-width: 100%;
  height: 265px;
  margin: auto;
  position: relative;
  z-index: 1;
  background-color: ${theme.palette.mode === 'dark'
    ? 'rgba(0,0,0,0.6)'
    : 'rgba(255,255,255,0.4)'};
  backdrop-filter: blur(40px);
  /* 모든 하위 요소에 fadeIn 효과를 준다. */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  & > * {
    animation: fadeIn 300ms ease-in-out;
  }
`;

const CoverImage = styled('div')`
  width: 100px;
  height: 100px;
  object-fit: cover;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.08);
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TinyText = styled(Typography)`
  font-size: 0.75rem;
  opacity: 0.38;
  font-weight: 500;
  letter-spacing: 0.2;
`;

const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
const lightIconColor =
  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

export { CoverImage, lightIconColor, mainIconColor, TinyText, Widget };
