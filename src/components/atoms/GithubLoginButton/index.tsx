import { Button } from '@mui/material';
import Image from 'next/image';

const GithubLoginButton: React.FC<{ onClick: () => void }> = ({ ...props }) => {
  return (
    /*
<button type="submit" class="button" style="--provider-bg: #24292f; --provider-dark-bg: #24292f; --provider-color: #fff; --provider-dark-color: #fff; --provider-bg-hover: rgba(36, 41, 47, 0.8); --provider-dark-bg-hover: rgba(36, 41, 47, 0.8);"><img loading="lazy" height="24" width="24" id="provider-logo" src="https://authjs.dev/img/providers/github.svg"><img loading="lazy" height="24" width="24" id="provider-logo-dark" src="https://authjs.dev/img/providers/github.svg"><span>Sign in with GitHub</span></button>
*/
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
        backgroundColor: '#24292f',
        color: '#fff',
        '&:hover': {
          backgroundColor: 'rgba(36, 41, 47, 0.8)',
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
        src="https://authjs.dev/img/providers/github.svg"
        alt="github logo"
      />
      <span>Sign in with GitHub</span>
    </Button>
  );
};

export default GithubLoginButton;
