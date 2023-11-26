import { Button, styled } from '@mui/material';
import Image from 'next/image';

const SocialLoginButton = styled(Button)<{
  backgroundColor: string;
  backgroundColorHover: string;
  fontColor: string;
}>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
  height: 48px;
  padding: 0 32px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ fontColor }) => fontColor};
  &:hover {
    background-color: ${({ backgroundColorHover }) => backgroundColorHover};
  }
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    justify-content: center;
  }
`;

const SocialLoginIcon = styled(Image)`
  border-radius: 50%;
`;

export { SocialLoginButton, SocialLoginIcon };
