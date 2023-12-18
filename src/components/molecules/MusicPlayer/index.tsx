import {
  FastForwardRounded,
  FastRewindRounded,
  Forward10Rounded,
  PauseRounded,
  PlayArrowRounded,
  Replay10Rounded,
  VolumeDownRounded,
  VolumeUpRounded,
} from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  IconButton,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import useAudioControls from '@/hooks/useAudioControls';
import useAudioSource from '@/hooks/useAudioSource';
import useMediaSession from '@/hooks/useMediaSession';
import theme from '@/styles/theme';
import { AppConfig } from '@/utils/AppConfig';
import {
  getBrowserTypeByUserAgent,
  getOSTypeByUserAgent,
} from '@/utils/common';

import {
  CoverImage,
  lightIconColor,
  mainIconColor,
  TinyText,
  Widget,
} from './index.styled';

interface IMusicPlayerProps {
  videoId: string;
}

const MusicPlayer: React.FC<IMusicPlayerProps> = ({ videoId }) => {
  const { state: sourceState, data: sourceData } = useAudioSource(videoId);
  const {
    controls,
    state: controlsState,
    element: audioRefCurrent,
    elementNode: audioElementNode,
  } = useAudioControls({
    src: sourceData.url,
    // eslint-disable-next-line no-console
    setError: (error: string) => console.log(error),
    // @TODO: add audio formats (video formats are not supported)
    // const audioFormats = Object.keys(audio.data.formats || {}).map((key) => ({
    //   mimeType: key,
    //   src: (audio.data.formats && audio.data.formats[key]) ?? '',
    // }));
    // formats: audioFormats,
  });
  const { play, pause, seek: seekTo } = controls;

  const [currentTime, setCurrentTime] = useState(0);
  const [isSliderDragging, setSliderDragging] = useState(false);

  const formatDuration = (durationValue: number) => {
    const minute = Math.floor(durationValue / 60);
    const secondLeft = durationValue - minute * 60;
    // 반올림 처리
    return `${minute}:${
      Number(secondLeft.toFixed(0)) < 10
        ? `0${secondLeft.toFixed(0)}`
        : secondLeft.toFixed(0)
    }`;
  };

  useMediaSession({
    element: audioRefCurrent as HTMLAudioElement,
    mediaMetadata: {
      title: sourceData.title,
      artist: sourceData.author,
      album: `${AppConfig.site_name}`,
      artwork:
        sourceData?.images?.map((image) => ({
          src: image.url,
          sizes: `${image.width}x${image.height}`,
        })) ?? [],
    },
    controls,
  });

  // 타임라인 제어 (재생 중일 때만)
  useEffect(() => {
    if (!controlsState.paused) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => prev + 0.1);
      }, 100);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [controlsState.paused]);

  // 주기적으로 currentTime을 체크해서, controlsState.time과 동기화
  useEffect(() => {
    // slider를 조작하고 있지 않을 때만
    if (isSliderDragging) return;

    if (controlsState.time !== currentTime) {
      setCurrentTime(controlsState.time);
    }
  }, [controlsState.time]);

  // duration이 2배로 나오는 문제가 있어서
  // IOS 이거나 safari 브라우저일 경우 duration을 2로 나눠줌
  const duration =
    getOSTypeByUserAgent() === 'IOS' || getBrowserTypeByUserAgent() === 'Safari'
      ? controlsState.duration / 2
      : controlsState.duration;

  return (
    <Box
      sx={{
        minWidth: 300,
      }}
    >
      <Widget>
        {sourceState === 'loading' ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              height: '100%',
            }}
          >
            <CircularProgress color="inherit" />
            <Typography variant="caption" color="text.secondary">
              노래를 불러오는 중입니다...
            </Typography>
          </Box>
        ) : (
          <>
            {audioElementNode}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CoverImage>
                <img
                  alt="cover"
                  src={
                    sourceData && sourceData.images && sourceData.images[0]?.url
                  }
                />
              </CoverImage>
              <Box sx={{ ml: 1.5, minWidth: 0 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={500}
                  noWrap
                  display="block"
                  maxWidth={200}
                >
                  {sourceData && sourceData.author}
                </Typography>
                <Typography noWrap>
                  <b>{sourceData && sourceData.title} &mdash; </b>
                </Typography>
                <Typography noWrap letterSpacing={-0.25}>
                  {sourceData && sourceData.description}
                </Typography>
              </Box>
            </Box>
            <Slider
              aria-label="time-indicator"
              size="small"
              value={currentTime}
              valueLabelDisplay="auto"
              valueLabelFormat={formatDuration}
              onMouseDown={() => {
                setSliderDragging(true);
              }}
              onMouseUp={() => {
                setSliderDragging(false);
              }}
              onChange={(_, value) => {
                setSliderDragging(true);
                setCurrentTime(value as number);
              }}
              onChangeCommitted={(_, value) => {
                seekTo(value as number);
                setSliderDragging(false);
              }}
              min={0}
              step={1}
              max={duration}
              sx={{
                color:
                  theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                height: 4,
                '& .MuiSlider-thumb': {
                  width: 8,
                  height: 8,
                  transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                  '&:before': {
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                  },
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: `0px 0px 0px 8px ${
                      theme.palette.mode === 'dark'
                        ? 'rgb(255 255 255 / 16%)'
                        : 'rgb(0 0 0 / 16%)'
                    }`,
                  },
                  '&.Mui-active': {
                    width: 20,
                    height: 20,
                  },
                },
                '& .MuiSlider-rail': {
                  opacity: 0.28,
                },
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: -2,
              }}
            >
              <TinyText>{formatDuration(currentTime)}</TinyText>
              <TinyText>-{formatDuration(duration - currentTime)}</TinyText>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: -1,
              }}
            >
              <IconButton
                aria-label="previous song"
                // @TODO: add previous song
                disabled
              >
                <FastRewindRounded fontSize="large" />
              </IconButton>
              <IconButton
                aria-label="previous 10 seconds"
                onClick={() => {
                  seekTo(controlsState.time - 10);
                }}
              >
                <Replay10Rounded fontSize="large" htmlColor={mainIconColor} />
              </IconButton>
              <IconButton
                aria-label={controlsState.paused ? 'play' : 'pause'}
                onClick={controlsState.paused ? play : pause}
              >
                {controlsState.paused ? (
                  <PlayArrowRounded
                    sx={{ fontSize: '3rem' }}
                    htmlColor={mainIconColor}
                  />
                ) : (
                  <PauseRounded
                    sx={{ fontSize: '3rem' }}
                    htmlColor={mainIconColor}
                  />
                )}
              </IconButton>
              <IconButton
                aria-label="next 10 seconds"
                onClick={() => {
                  seekTo(controlsState.time + 10);
                }}
              >
                <Forward10Rounded fontSize="large" htmlColor={mainIconColor} />
              </IconButton>
              <IconButton
                aria-label="next song"
                // @TODO: add next song
                disabled
              >
                <FastForwardRounded fontSize="large" />
              </IconButton>
            </Box>
            <Stack
              spacing={2}
              direction="row"
              sx={{
                mt: 1,
                mb: 1,
                px: 1,
              }}
              alignItems="center"
            >
              <VolumeDownRounded htmlColor={lightIconColor} />
              <Slider
                aria-label="Volume"
                valueLabelDisplay="auto"
                defaultValue={100}
                sx={{
                  color:
                    theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                  '& .MuiSlider-track': {
                    border: 'none',
                  },
                  '& .MuiSlider-thumb': {
                    width: 24,
                    height: 24,
                    backgroundColor: '#fff',
                    '&:before': {
                      boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                    },
                    '&:hover, &.Mui-focusVisible, &.Mui-active': {
                      boxShadow: 'none',
                    },
                  },
                }}
                onChangeCommitted={(_, value) => {
                  if (audioRefCurrent) {
                    audioRefCurrent.volume = (value as number) / 100;
                  }
                }}
                // IOS 이거나 safari 브라우저일 경우 volume slider를 비활성화
                disabled={getOSTypeByUserAgent() === 'IOS'}
              />
              <VolumeUpRounded htmlColor={lightIconColor} />
            </Stack>
          </>
        )}
      </Widget>
    </Box>
  );
};

export default MusicPlayer;
