import { useEffect } from 'react';

import {
  getBrowserTypeByUserAgent,
  getOSTypeByUserAgent,
} from '@/utils/common';

import type { HTMLAudioControls } from './useAudioControls';

type MediaSessionAction =
  | 'play'
  | 'pause'
  | 'seekbackward'
  | 'seekforward'
  | 'seekto';

interface Props {
  element: HTMLAudioElement;
  mediaMetadata: MediaMetadata;
  controls: HTMLAudioControls;
}

const useMediaSession = ({
  element,
  mediaMetadata: { title, album, artist, artwork },
  controls,
}: Props) => {
  // metadata, controls 설정
  useEffect(() => {
    if (!element || !('mediaSession' in navigator)) return;

    // metadata 설정
    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist,
      album,
      artwork: [...artwork],
    });

    // controls 설정
    const ACTION: MediaSessionAction[] = [
      'play',
      'pause',
      'seekbackward',
      'seekforward',
      'seekto',
    ];
    ACTION.forEach((action) => {
      navigator.mediaSession.setActionHandler(
        action,
        // eslint-disable-next-line consistent-return
        (details?: { seekTime?: number }) => {
          switch (action) {
            case 'play':
              return controls.play();
            case 'pause':
              return controls.pause();
            case 'seekbackward':
              return controls.seek(element.currentTime - 10);
            case 'seekforward':
              return controls.seek(element.currentTime + 10);
            case 'seekto':
              return controls.seek(details?.seekTime ?? 0);
            default:
          }
        }
      );
    });
  }, [element]);

  // 화면에 보여지는 시간, 재생속도, 재생위치 설정
  useEffect(() => {
    if (!element || !('mediaSession' in navigator)) return;
    // duration이 2배로 나오는 문제가 있어서
    // IOS 이거나 safari 브라우저일 경우 duration을 2로 나눠줌
    const duration =
      getOSTypeByUserAgent() === 'IOS' ||
      getBrowserTypeByUserAgent() === 'Safari'
        ? element.duration / 2
        : element.duration;
    navigator.mediaSession.setPositionState({
      duration: Math.ceil(duration || 0),
      playbackRate: element.playbackRate,
      position: Math.floor(element.currentTime || 0),
    });
  }, [element?.duration, element?.playbackRate, element?.currentTime]);
};

export default useMediaSession;
