import type { ReactElement } from 'react';
import React, { useState } from 'react';

export interface HTMLAudioState {
  buffered: {
    start: number;
    end: number;
  };
  time: number;
  duration: number;
  paused: boolean;
  waiting: boolean;
  playbackRate: number;
  endedCallback: Function;
}

export interface HTMLAudioControls {
  play: () => Promise<void> | void;
  pause: () => void;
  seek: (time: number) => void;
  setPlaybackRate: (rate: number) => void;
  setEndedCallback: (callback: Function) => void;
}

interface HTMLAudioProps {
  src: string;
  autoPlay?: boolean;
  startPlaybackRate?: number;
  formats?: Array<{
    mimeType: string;
    src: string;
  }>;
  setError?: Function;
}

/**
 * Shout-out to:
 * https://github.com/streamich/react-use/blob/master/src/util/createHTMLMediaHook.ts
 *💐 💪
 */

export const states = {};

const parseTimeRange = (ranges: TimeRanges) =>
  ranges.length < 1
    ? {
        start: 0,
        end: 0,
      }
    : {
        start: ranges.start(0),
        end: ranges.end(0),
      };

const useAudioControls = ({
  src,
  autoPlay = false,
  startPlaybackRate = 1,
  formats = [],
  // eslint-disable-next-line no-console
  setError = (error: string) => console.error(error),
}: HTMLAudioProps): {
  state: HTMLAudioState;
  element: HTMLAudioElement | HTMLVideoElement | null;
  controls: HTMLAudioControls;
  elementNode: ReactElement;
} => {
  const [state, setOrgState] = useState<HTMLAudioState>({
    buffered: {
      start: 0,
      end: 0,
    },
    time: 0,
    duration: 0,
    paused: true,
    waiting: false,
    playbackRate: 1,
    endedCallback: () => {},
  });
  const setState = (partState: Partial<HTMLAudioState>) =>
    setOrgState((prevState) => ({ ...prevState, ...partState }));
  const ref = React.useRef<HTMLAudioElement | null>(null);

  const element = React.createElement<HTMLAudioElement>(
    'audio',
    {
      ...(formats.length === 0 ? { src } : {}),
      controls: false,
      ref,
      onPlay: () => setState({ paused: false }),
      onPause: () => setState({ paused: true }),
      onWaiting: () => setState({ waiting: true }),
      onPlaying: () => setState({ waiting: false }),
      onEnded: state.endedCallback,
      onDurationChange: () => {
        const el = ref.current;
        if (!el) {
          return;
        }
        const { duration, buffered } = el;
        setState({
          duration,
          buffered: parseTimeRange(buffered),
        });
      },
      onTimeUpdate: () => {
        const el = ref.current;
        if (!el) {
          return;
        }
        setState({ time: el.currentTime });
      },
      onProgress: () => {
        const el = ref.current;
        if (!el) {
          return;
        }
        setState({ buffered: parseTimeRange(el.buffered) });
      },
      onRateChange: () => {
        const el = ref.current;
        if (!el) {
          return;
        }
        setState({ playbackRate: el.playbackRate });
      },
      onError: () => setError('There was an error playing the audio file'),
    } as any,
    formats.map(({ mimeType, src: srcProp }) => [
      React.createElement('source', {
        type: mimeType,
        src: srcProp,
        onError: () => setError('There was an error loading the audio file'),
        key: mimeType,
      }),
    ])
  );

  // Some browsers return `Promise` on `.play()` and may throw errors
  // if one tries to execute another `.play()` or `.pause()` while that
  // promise is resolving. So we prevent that with this lock.
  // See: https://bugs.chromium.org/p/chromium/issues/detail?id=593273
  let lockPlay: boolean = false;

  const controls: HTMLAudioControls = {
    play: () => {
      const el = ref.current;
      if (!el) {
        return undefined;
      }

      if (!lockPlay) {
        const promise = el.play();
        const isPromise = typeof promise === 'object';
        if (isPromise) {
          lockPlay = true;
          const resetLock = () => {
            lockPlay = false;
          };
          promise.then(resetLock, resetLock);
        }

        return promise;
      }
      return undefined;
    },
    pause: () => {
      const el = ref.current;
      if (el && !lockPlay) {
        return el.pause();
      }
      return undefined;
    },
    seek: (time: number) => {
      const el = ref.current;
      if (!el || state.duration === undefined) {
        return;
      }
      el.currentTime = Math.min(state.duration, Math.max(0, time)) || 0;
    },
    setPlaybackRate: (rate: number) => {
      const el = ref.current;
      if (!el || state.duration === undefined) {
        return;
      }

      setState({
        playbackRate: rate,
      });
      el.playbackRate = rate;
    },
    setEndedCallback: (callback: Function) => {
      setState({ endedCallback: callback });
    },
  };

  React.useEffect(() => {
    const el = ref.current!;
    setState({
      paused: el?.paused,
    });

    controls.setPlaybackRate(startPlaybackRate);

    // Start media, if autoPlay requested.
    if (autoPlay && el.paused) {
      controls.play();
    }
  }, [src]);

  return {
    state,
    element: ref?.current || null,
    elementNode: element,
    controls,
  };
};

export default useAudioControls;
