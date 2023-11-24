import { Toolbar, Typography } from '@mui/material';

import MetaInfo from '@/components/atoms/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

const Settings: NextPageWithLayout = () => {
  return (
    <>
      <MetaInfo
        title="Settings | 🎵 Music Quiz 🎵"
        description="This is the Settings page of the 🎵 Music Quiz 🎵 app."
      />
      <div style={{ display: 'flex' }}>
        <main style={{ flexGrow: 1 }}>
          <Toolbar />
          <Typography paragraph>세팅메뉴</Typography>
        </main>
      </div>
    </>
  );
};

Settings.getLayout = generateGetLayout(Default);

export default Settings;
