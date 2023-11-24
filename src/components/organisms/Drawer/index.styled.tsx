import { keyframes, styled } from '@mui/material';

const neonAnimation = keyframes`
   0% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.6);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
  }
`;

const AreaForDrawerOpenByHover = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 24px;
  background-color: rgba(225, 174, 174, 0.1);
  z-index: 1;
  animation: ${neonAnimation} 2s infinite;
`;

export default AreaForDrawerOpenByHover;
