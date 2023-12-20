import { Container, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import GithubLoginButton from '@/components/atoms/SocialLoginButton/GithubLoginButton';
import GoogleLoginButton from '@/components/atoms/SocialLoginButton/GoogleLoginButton';
import TooltipWithClick from '@/components/atoms/TooltipWithClick';

const SignInModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  // oauth provider를 구분하기 위해 provider를 상태로 관리
  const [provider, setProvider] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setProvider('google');
    await signIn('google', { redirect: false });
    // 페이지 이동까지 로딩으로 인식시키기 위해 setIsLoading(false)를 사용하지 않음
    // onClose();
  };

  const handleGithubLogin = async () => {
    setIsLoading(true);
    setProvider('github');
    await signIn('github', { redirect: false });
    // 페이지 이동까지 로딩으로 인식시키기 위해 setIsLoading(false)를 사용하지 않음
    // onClose();
  };

  return (
    <Container sx={{ display: 'grid', gap: '16px', padding: '16px' }}>
      <Typography variant="h5" sx={{ textAlign: 'center' }} fontWeight="bold">
        로그인
      </Typography>
      <TooltipWithClick
        title="깃허브 로그인은 현재 준비중입니다."
        placement="top"
        arrow
      >
        <GithubLoginButton
          onClick={handleGithubLogin}
          disabled
          isLoading={provider === 'github' && isLoading}
        />
      </TooltipWithClick>
      <GoogleLoginButton
        onClick={handleGoogleLogin}
        disabled={isLoading}
        isLoading={provider === 'google' && isLoading}
      />
    </Container>
  );
};

export default SignInModal;
