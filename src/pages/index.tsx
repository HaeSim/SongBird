import { Toolbar } from '@mui/material';
import { useEffect } from 'react';

import MetaInfo from '@/components/atoms/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import { AppConfig } from '@/utils/AppConfig';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';
import { snow } from '@/utils/confetti';

const Home: NextPageWithLayout = () => {
  useEffect(() => {
    snow({
      duration: 10000,
    });
  }, []);
  return (
    <>
      <MetaInfo title="홈" description={AppConfig.description} />
      <Toolbar />
    </>
  );
};

Home.getLayout = generateGetLayout(Default);

export default Home;
