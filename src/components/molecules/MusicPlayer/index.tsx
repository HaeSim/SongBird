import Forward10Icon from '@mui/icons-material/Forward10';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Replay10Icon from '@mui/icons-material/Replay10';
import {
  Box,
  CircularProgress,
  IconButton,
  Slider,
  Typography,
} from '@mui/material';

import useAudioControls from '@/hooks/useAudioControls';
import useAudioSource from '@/hooks/useAudioSource';
import { formatTime } from '@/utils/common';

interface IMusicPlayerProps {
  title: string;
  videoId: string;
}

const MusicPlayer: React.FC<IMusicPlayerProps> = ({ title, videoId }) => {
  const source = useAudioSource(videoId);
  const controls = useAudioControls({
    src: source.data.url,
    // eslint-disable-next-line no-console
    setError: (error: string) => console.log(error),
    // @TODO: add audio formats (video formats are not supported)
    // const audioFormats = Object.keys(audio.data.formats || {}).map((key) => ({
    //   mimeType: key,
    //   src: (audio.data.formats && audio.data.formats[key]) ?? '',
    // }));
    // formats: audioFormats,
  });

  const { state: sourceState } = source;
  const {
    controls: { play, pause, seek: seekTo },
    state: controlsState,
  } = controls;

  return (
    <Box
      sx={{
        minWidth: 300,
      }}
    >
      <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        {controls.elementNode}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {sourceState === 'loading' ? (
            <CircularProgress color="inherit" />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                width: '100%',
              }}
            >
              <IconButton onClick={() => seekTo(controlsState.time - 10)}>
                <Replay10Icon />
              </IconButton>
              <IconButton onClick={controlsState.paused ? play : pause}>
                {controlsState.paused ? <PlayArrowIcon /> : <PauseIcon />}
              </IconButton>
              <IconButton onClick={() => seekTo(controlsState.time + 10)}>
                <Forward10Icon />
              </IconButton>
            </Box>
          )}
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography>{formatTime(controlsState.time)}</Typography>
            <Typography>{formatTime(controlsState.duration)}</Typography>
          </Box>
          <Slider
            value={controlsState.time}
            max={controlsState.duration}
            onChange={(_, value) => seekTo(value as number)}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => formatTime(value as number)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MusicPlayer;
