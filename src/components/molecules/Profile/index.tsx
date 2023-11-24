import { Avatar, Toolbar, Typography } from '@mui/material';
import type { FC } from 'react';

interface IProfileProps {
  avatar: string;
  name: string;
}

const Profile: FC<IProfileProps> = ({ avatar, name }) => {
  return (
    <Toolbar
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
      }}
    >
      <Avatar
        alt={`${name} Avatar`}
        src={avatar}
        sx={{ width: 64, height: 64, marginBottom: '8px' }}
      />
      <Typography variant="h6" noWrap>
        {name}
      </Typography>
    </Toolbar>
  );
};

export default Profile;
