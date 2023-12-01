import { Button, css, styled } from '@mui/material';
import Image from 'next/image';

import { Grow, Spin } from '@/styles/animation';
import theme from '@/styles/theme';

const SocialLoginButton = styled(Button)<{
  backgroundColor: string;
  backgroundColorHover: string;
  fontColor: string;
  isLoading: boolean;
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

  @media (max-width: ${({ theme: th }) => th.breakpoints.values.sm}px) {
    justify-content: center;
  }

  ${(props) =>
    props.isLoading &&
    css`
      padding-right: 40px;
      &:after {
        content: '';
        position: absolute;
        border-radius: 100%;
        right: 6px;
        top: 50%;
        width: 0px;
        height: 0px;
        margin-top: -2px;
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-left-color: ${theme.palette.primary.main};
        border-top-color: ${theme.palette.primary.main};
        animation: ${Spin} 0.6s infinite linear,
          ${Grow()} 0.3s forwards ease-out;
      }
    `}
`;

const SocialLoginIcon = styled(Image)`
  border-radius: 50%;
`;

export { SocialLoginButton, SocialLoginIcon };
