import { Toolbar, Typography } from '@mui/material';

import MetaInfo from '@/components/atoms/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

const Quiz: NextPageWithLayout = () => {
  return (
    <>
      <MetaInfo
        title="Quiz | 🎵 SongBird 🎵"
        description="This is the Quiz page of the 🎵 SongBird 🎵 app."
      />
      <div style={{ display: 'flex' }}>
        <main style={{ flexGrow: 1 }}>
          <Toolbar />
          <Typography paragraph>퀴즈메뉴</Typography>
        </main>
      </div>
    </>
  );
};

Quiz.getLayout = generateGetLayout(Default);

export default Quiz;
