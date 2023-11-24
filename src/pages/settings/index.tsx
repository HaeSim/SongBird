import { Toolbar, Typography } from '@mui/material';

import MetaInfo from '@/components/atoms/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

const Index: NextPageWithLayout = () => {
  return (
    <>
      <MetaInfo
        title="Home | Nextjs Boilerplate"
        description="This is the home page of the Nextjs Boilerplate app."
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

Index.getLayout = generateGetLayout(Default);

export default Index;
