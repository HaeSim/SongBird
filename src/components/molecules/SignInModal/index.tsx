import { Container, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';

import GithubLoginButton from '@/components/atoms/GithubLoginButton';
import GoogleLoginButton from '@/components/atoms/GoogleLoginButton';

const SignInModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const handleGoogleLogin = () => {
    signIn('google', { redirect: false });
    onClose();
  };

  const handleGithubLogin = () => {
    signIn('github', { redirect: false });
    onClose();
  };

  return (
    <Container sx={{ display: 'grid', gap: '16px', padding: '16px' }}>
      <Typography variant="h5" sx={{ textAlign: 'center' }}>
        로그인
      </Typography>
      <GoogleLoginButton onClick={handleGoogleLogin} />
      <GithubLoginButton onClick={handleGithubLogin} />
      <GoogleLoginButton onClick={handleGoogleLogin} />
    </Container>
  );
};

export default SignInModal;
