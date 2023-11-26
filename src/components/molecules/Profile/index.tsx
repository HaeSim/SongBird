import { Avatar, Toolbar, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import type { FC } from 'react';

import LoginButton from '@/components/atoms/Login';

interface IProfileProps {}

const Profile: FC<IProfileProps> = () => {
  const { data: session } = useSession();

  return (
    <Toolbar
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
      }}
    >
      {session && session.user ? (
        <>
          <Avatar
            alt={`${session.user.name}의 프로필 사진`}
            src={session.user.image as string}
            sx={{ width: 64, height: 64, marginBottom: '8px' }}
          />
          <Typography variant="h6" noWrap>
            {session.user.name}
          </Typography>
        </>
      ) : (
        <>
          <Avatar
            alt="Guest의 프로필 사진"
            src="/images/song-bird_image.webp"
            // outline or box-shadow
            sx={{
              width: 64,
              height: 64,
              marginBottom: '8px',
              border: '2px solid #f5f2e7',
            }}
          />
          <Typography variant="h6" noWrap>
            로그인이 필요합니다.
          </Typography>
        </>
      )}
      <LoginButton isLogin={!!session} />
    </Toolbar>
  );
};

export default Profile;
