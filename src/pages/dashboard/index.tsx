import { Toolbar, Typography } from '@mui/material';

import MetaInfo from '@/components/atoms/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <MetaInfo
        title="Dashboard | 🎵 Music Quiz 🎵"
        description="This is the Dashboard page of the 🎵 Music Quiz 🎵 app."
      />
      <div style={{ display: 'flex' }}>
        <main style={{ flexGrow: 1 }}>
          <Toolbar />
          <Typography paragraph>대시보드</Typography>
        </main>
      </div>
    </>
  );
};

Dashboard.getLayout = generateGetLayout(Default);

export default Dashboard;
