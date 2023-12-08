import React from 'react';

import { StyledCard, StyledFaceBack, StyledFaceFront } from './index.styled';

interface FlipCardProps {
  isFlipped: boolean;
  frontSide?: React.ReactNode;
  backSide?: React.ReactNode;
  width?: string;
  height?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
  isFlipped,
  frontSide,
  backSide,
  width = '300px',
  height = '300px',
}) => {
  return (
    <StyledCard isFlipped={isFlipped} width={width} height={height}>
      <StyledFaceFront className="front">{frontSide}</StyledFaceFront>
      <StyledFaceBack className="back">{backSide}</StyledFaceBack>
    </StyledCard>
  );
};

export default FlipCard;
