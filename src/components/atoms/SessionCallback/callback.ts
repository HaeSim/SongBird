import { datadogRum } from '@datadog/browser-rum';
import type { Session } from 'next-auth';

const authenticatedCallback = (session: Session) => {
  // eslint-disable-next-line no-console
  const { user } = session;
  // console.log('authenticated', user);
  // datadong RUM을 위한 사용자 정보 설정
  datadogRum.setUser({
    name: user.name,
    email: user.email,
    image: user.image,
  });

  // ChannelTalk 사용자 정보 설정
  // TODO: ChannelTalk 사용자 정보 설정(해시암호화 필요)
  // ChannelService.updateUser({
  //   profile: {
  //     name: user.name,
  //     email: user.email,
  //     image: user.image,
  //   },
  // });
};

const loadingCallback = () => {
  // console.log('loading');
};

const unauthenticatedCallback = () => {
  // console.log('unauthenticated');
};

export { authenticatedCallback, loadingCallback, unauthenticatedCallback };
