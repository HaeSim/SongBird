import { Button } from '@mui/material';

import useClientStore from '@/store/client';

interface ILoginButtonProps {
  isLogin: boolean;
}

const LoginButton = ({ isLogin }: ILoginButtonProps) => {
  const { openMessageModal, closeModal } = useClientStore((state) => state);
  const handleLoginClick = () => {
    // confirm modal
    openMessageModal(
      '삭제 확인',
      ['이미지를 삭제하시겠습니까?'],
      [
        { label: '취소', callback: closeModal, variant: 'outlined' },
        {
          label: '확인',
          callback: () => {
            closeModal();
          },
          variant: 'contained',
        },
      ]
    );
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
