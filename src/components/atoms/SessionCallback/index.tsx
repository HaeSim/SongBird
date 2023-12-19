import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import {
  authenticatedCallback,
  loadingCallback,
  unauthenticatedCallback,
} from './callback';

const SessionCallback = () => {
  const { data: session, status } = useSession();

  // 상태에 따른 전역 콜백 함수 호출
  useEffect(() => {
    if (status === 'authenticated' && session) {
      // 사용자 정보를 Datadog RUM에 설정
      authenticatedCallback(session);
    } else if (status === 'loading') {
      loadingCallback();
    } else {
      unauthenticatedCallback();
    }
  }, [status]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default SessionCallback;
