import { datadogRum } from '@datadog/browser-rum';
import type { Session } from 'next-auth';

const authenticatedCallback = (session: Session) => {
  const { user } = session;
  // console.log('authenticated', user);
  datadogRum.setUser({
    name: user.name,
    email: user.email,
    image: user.image,
  });
};

const loadingCallback = () => {
  // console.log('loading');
};

const unauthenticatedCallback = () => {
  // console.log('unauthenticated');
};

export { authenticatedCallback, loadingCallback, unauthenticatedCallback };
