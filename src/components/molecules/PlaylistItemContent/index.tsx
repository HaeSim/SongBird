import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';

import { useYoutube } from '@/components/organisms/YoutubePlayer/YoutubeProvider';
import useClientStore from '@/store/client';

import MusicPlayer from '../MusicPlayer';

interface IMainContentProps {
  playlistItems: YoutubePlaylistItem[];
  isLoading: boolean;
}

const PlaylistItemContent: React.FC<IMainContentProps> = ({
  playlistItems,
  isLoading,
}) => {
  const COLUMN_NAMES = ['No', 'Title', 'Channel', 'Published Date', 'Play'];

  const { openComponentModal, modalVisible } = useClientStore((state) => state);
  const { setVideo } = useYoutube();

  const handlePlayClick = (newVideoId: string) => {
    setVideo(newVideoId);
    openComponentModal(
      <MusicPlayer
        title={
          playlistItems.find(
            (item) => item.snippet.resourceId.videoId === newVideoId
          )?.snippet.title ?? ''
        }
      />
    );
  };

  useEffect(() => {
    // modal닫히면 videoId 초기화
    if (!modalVisible) {
      setVideo('');
    }
  }, [modalVisible]);

  return (
    <Grid item xs={3} sx={{ minWidth: '100%' }}>
      <Paper style={{ minHeight: '100%', overflowY: 'auto' }}>
        {playlistItems && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {COLUMN_NAMES.map((column) => (
                    <TableCell
                      key={column}
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  playlistItems.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell>{item.snippet.title}</TableCell>
                      <TableCell
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        {item.snippet.videoOwnerChannelTitle}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        {new Date(
                          item.snippet.publishedAt
                        ).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() =>
                            handlePlayClick(item.snippet.resourceId.videoId)
                          }
                        >
                          <PlayArrowIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Grid>
  );
};

export default PlaylistItemContent;
