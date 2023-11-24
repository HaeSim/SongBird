import { Toolbar, Typography } from '@mui/material';

import MetaInfo from '@/components/atoms/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <MetaInfo
        title="Home | 🎵 Music Quiz 🎵"
        description="This is the home page of the 🎵 Music Quiz 🎵 app."
      />
      <div style={{ display: 'flex' }}>
        <main style={{ flexGrow: 1 }}>
          <Toolbar />
          <Typography paragraph>홈</Typography>
        </main>
      </div>
    </>
  );
};

Home.getLayout = generateGetLayout(Default);

export default Home;
