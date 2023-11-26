import { Toolbar, Typography } from '@mui/material';

import MetaInfo from '@/components/atoms/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <MetaInfo
        title="Home | 🎵 SongBird 🎵"
        description="This is the home page of the 🎵 SongBird 🎵 app."
      />

      <Toolbar />
      <Typography paragraph>홈</Typography>
    </>
  );
};

Home.getLayout = generateGetLayout(Default);

export default Home;
