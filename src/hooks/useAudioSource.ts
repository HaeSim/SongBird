import { useEffect } from 'react';

import { useGetAudioSourceQuery } from '@/store/server/features/youtube/queries';
import type { Audio as AudioType } from '@/types/interfaces/youtube/ytdl';

export enum STATE {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

const INITIAL_AUDIO = {
  url: '',
  author: '',
  title: '',
};

interface AudioSource {
  state: STATE;
  info: string;
  data: AudioType;
  reload: () => void;
}

const useAudioSource = (videoID: string): AudioSource => {
  const {
    data: audioSource,
    status,
    refetch: getAudio,
  } = useGetAudioSourceQuery(videoID);

  useEffect(() => {
    getAudio();
  }, [videoID]);

  return {
    state: status as STATE,
    info: status,
    data: audioSource || INITIAL_AUDIO,
    reload: getAudio,
  };
};

export default useAudioSource;
