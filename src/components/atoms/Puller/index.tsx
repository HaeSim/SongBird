import { Box, styled } from '@mui/material';

const Puller = styled(Box)`
  width: 30px;
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  position: absolute;
  top: 8px;
  left: calc(50% - 15px);
`;

export default Puller;
