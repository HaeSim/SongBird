import { Button } from '@mui/material';
import { signOut } from 'next-auth/react';

import SignInModal from '@/components/molecules/SignInModal';
import useClientStore from '@/store/client';

interface ILoginButtonProps {
  isLogin: boolean;
}

const LoginButton = ({ isLogin }: ILoginButtonProps) => {
  const { openComponentModal, openMessageModal, closeModal } = useClientStore(
    (state) => state
  );
  const handleLoginClick = () => {
    openComponentModal(<SignInModal />);
  };

  const handleLogoutClick = () => {
    openMessageModal({
      title: '로그아웃',
      message: ['로그아웃 하시겠습니까?'],
      options: [
        { label: '취소', callback: closeModal, variant: 'outlined' },
        {
          label: '로그아웃',
          callback: () => {
            closeModal();
            signOut();
          },
          variant: 'contained',
          color: 'error',
        },
      ],
    });
  };

  if (isLogin) {
    return (
      <Button
        type="button"
        variant="text"
        color="warning"
        onClick={() => handleLogoutClick()}
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
