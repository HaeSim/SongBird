import { SocialLoginButton, SocialLoginIcon } from '../index.styled';

const GoogleLoginButton: React.FC<{ onClick: () => void }> = ({ ...props }) => {
  return (
    <SocialLoginButton
      type="button"
      backgroundColor="#fff"
      backgroundColorHover="rgba(225, 225, 225, 0.5)"
      fontColor="#000"
      {...props}
    >
      <SocialLoginIcon
        loading="lazy"
        height="24"
        width="24"
        id="provider-logo"
        src="https://authjs.dev/img/providers/google.svg"
        alt="google logo"
      />
      <span>Sign in with Google</span>
    </SocialLoginButton>
  );
};

export default GoogleLoginButton;
