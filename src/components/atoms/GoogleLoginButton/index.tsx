import { Button } from '@mui/material';
import Image from 'next/image';

const GoogleLoginButton: React.FC<{ onClick: () => void }> = ({ ...props }) => {
  return (
    <Button
      type="button"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        width: '100%',
        height: '48px',
        padding: '0 16px',
        backgroundColor: '#fff',
        color: '#000',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
      }}
      {...props}
    >
      <Image
        loading="lazy"
        height="24"
        width="24"
        id="provider-logo"
        src="https://authjs.dev/img/providers/google.svg"
        alt="google logo"
      />
      <span>Sign in with Google</span>
    </Button>
  );
};

export default GoogleLoginButton;
