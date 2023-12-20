import { useEffect } from 'react';

import ChannelService from '../../../lib/channeltalk';

const ChanneltalkInit = () => {
  useEffect(() => {
    ChannelService.loadScript();
    ChannelService.boot({
      pluginKey: process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY as string,
    });
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default ChanneltalkInit;
