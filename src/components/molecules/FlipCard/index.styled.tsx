import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Card } from '@mui/material';

// StyledCard component
// shouldForwardProp : isFlipped, width, height
const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isFlipped',
})<{
  isFlipped: boolean;
  width: string;
  height: string;
}>`
  position: relative;
  margin: 0.5rem;
  text-align: center;
  color: #ecf0f1;
  background-color: transparent;
  border-radius: 0.8rem;
  transform-style: preserve-3d;
  box-shadow: none;
  height: ${({ height }) => height}; /* Set the desired height */
  width: ${({ width }) => width}; /* Set the desired width */

  ${({ isFlipped }) =>
    isFlipped &&
    css`
      .front {
        transform: rotateY(-180deg);
      }
      .back {
        transform: rotateY(0deg);
      }
    `}
`;

const StyledFace = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  border-radius: 0.8rem;
  background-size: cover;
  background-position: center center;
  backface-visibility: hidden;
  transition: transform 0.5s ease-in-out;
`;

// StyledFaceFront and StyledFaceBack components
const StyledFaceFront = styled(StyledFace)`
  font-size: 3rem;
  width: 100%; /* Ensure the front side takes the full width */
  height: 100%; /* Ensure the front side takes the full height */
`;

const StyledFaceBack = styled(StyledFace)`
  font-size: 3rem;
  width: 100%; /* Ensure the back side takes the full width */
  height: 100%; /* Ensure the back side takes the full height */
  transform: rotateY(-180deg);
`;

export { StyledCard, StyledFace, StyledFaceBack, StyledFaceFront };
