import { Button } from '@mui/material';

interface ILoginButtonProps {
  isLogin: boolean;
  signIn: () => void;
  signOut: () => void;
}

const LoginButton = ({ isLogin, signIn, signOut }: ILoginButtonProps) => {
  if (isLogin) {
    return (
      <Button
        type="button"
        variant="text"
        color="warning"
        onClick={() => signOut()}
      >
        로그아웃
      </Button>
    );
  }
  return (
    <Button
      type="button"
      variant="text"
      color="primary"
      onClick={() => signIn()}
    >
      로그인
    </Button>
  );
};

export default LoginButton;
