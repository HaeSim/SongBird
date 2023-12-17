import { useEffect } from 'react';
import type { Audio as AudioType } from 'src/types/interfaces/youtube/ytdl';

import { useGetAudioSourceQuery } from '@/store/server/features/youtube/queries';

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
