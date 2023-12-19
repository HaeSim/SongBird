import { detectInAppBrowser } from '@/utils/common';

import { SocialLoginButton, SocialLoginIcon } from '../index.styled';

const GoogleLoginButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}> = ({ ...props }) => {
  const { disabled, isLoading, ...rest } = props;

  return (
    <SocialLoginButton
      type="button"
      backgroundColor="#fff"
      backgroundColorHover="rgba(225, 225, 225, 0.5)"
      fontColor="#000"
      disabled={disabled || detectInAppBrowser()}
      isLoading={isLoading}
      {...rest}
    >
      <SocialLoginIcon
        loading="lazy"
        height="24"
        width="24"
        id="provider-logo"
        src="/icons/google.svg"
        alt="google logo"
      />
      {detectInAppBrowser() ? (
        <span>disallow in app browser</span>
      ) : (
        <span>Sign in with Google</span>
      )}
    </SocialLoginButton>
  );
};

export default GoogleLoginButton;
