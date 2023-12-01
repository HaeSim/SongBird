import { Container, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import GithubLoginButton from '@/components/atoms/SocialLoginButton/GithubLoginButton';
import GoogleLoginButton from '@/components/atoms/SocialLoginButton/GoogleLoginButton';

const SignInModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await signIn('google', { redirect: false });
    // 페이지 이동까지 로딩으로 인식시키기 위해 setIsLoading(false)를 사용하지 않음
    // onClose();
  };

  const handleGithubLogin = async () => {
    setIsLoading(true);
    await signIn('github', { redirect: false });
    // 페이지 이동까지 로딩으로 인식시키기 위해 setIsLoading(false)를 사용하지 않음
    // onClose();
  };

  return (
    <Container sx={{ display: 'grid', gap: '16px', padding: '16px' }}>
      <Typography variant="h5" sx={{ textAlign: 'center' }} fontWeight="bold">
        로그인 {isLoading.toString()}
      </Typography>
      <GithubLoginButton onClick={handleGithubLogin} isLoading={isLoading} />
      <GoogleLoginButton onClick={handleGoogleLogin} isLoading={isLoading} />
    </Container>
  );
};

export default SignInModal;
