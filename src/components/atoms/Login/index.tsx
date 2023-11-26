import { Button } from '@mui/material';

import SignInModal from '@/components/molecules/SignInModal';
import useClientStore from '@/store/client';

interface ILoginButtonProps {
  isLogin: boolean;
}

const LoginButton = ({ isLogin }: ILoginButtonProps) => {
  const { openComponentModal, closeModal } = useClientStore((state) => state);
  const handleLoginClick = () => {
    openComponentModal(<SignInModal onClose={closeModal} />);
  };

  if (isLogin) {
    return (
      <Button
        type="button"
        variant="text"
        color="warning"
        onClick={() => undefined}
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
      onClick={() => handleLoginClick()}
    >
      로그인
    </Button>
  );
};

export default LoginButton;
