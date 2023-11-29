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

import {
  PlayerStates,
  useYoutube,
} from '@/components/organisms/YoutubePlayer/YoutubeProvider';
import { formatTime } from '@/utils/common';

interface IMusicPlayerProps {
  title: string;
}

const MusicPlayer: React.FC<IMusicPlayerProps> = ({ title }) => {
  const { status, currentTime, duration, pause, play, seekTo } = useYoutube();

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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {status !== PlayerStates?.PLAYING &&
          status !== PlayerStates?.PAUSED ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              <IconButton onClick={() => seekTo(currentTime - 10)}>
                <Replay10Icon />
              </IconButton>
              <IconButton
                onClick={status === PlayerStates?.PLAYING ? pause : play}
              >
                {status === PlayerStates?.PLAYING ? (
                  <PauseIcon />
                ) : (
                  <PlayArrowIcon />
                )}
              </IconButton>
              <IconButton onClick={() => seekTo(currentTime + 10)}>
                <Forward10Icon />
              </IconButton>
            </>
          )}
        </Box>

        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography>{formatTime(currentTime)}</Typography>
            <Typography>{formatTime(duration)}</Typography>
          </Box>
          <Slider
            value={currentTime}
            max={duration}
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
