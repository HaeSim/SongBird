import { SocialLoginButton, SocialLoginIcon } from '../index.styled';

const GithubLoginButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}> = ({ ...props }) => {
  const { disabled, isLoading, ...rest } = props;
  return (
    <SocialLoginButton
      type="button"
      backgroundColor="#24292f"
      backgroundColorHover="rgba(36, 41, 47, 0.8)"
      fontColor="#fff"
      disabled={disabled}
      isLoading={isLoading}
      {...rest}
    >
      <SocialLoginIcon
        loading="lazy"
        height="24"
        width="24"
        id="provider-logo"
        src="/icons/github.svg"
        alt="github logo"
      />
      <span>Sign in with GitHub</span>
    </SocialLoginButton>
  );
};

export default GithubLoginButton;
