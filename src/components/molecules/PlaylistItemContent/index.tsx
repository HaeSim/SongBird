import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Checkbox,
  Dialog,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import YoutubePlayer from '@/components/organisms/YoutubePlayer';

interface IMainContentProps {
  playlistItems: YoutubePlaylistItem[];
}

const PlaylistItemContent: React.FC<IMainContentProps> = ({
  playlistItems,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleSelectAllClick = () => {
    if (selectedItems.length === playlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(playlistItems.map((item) => item.id));
    }
  };
  const handleCheckboxClick = (itemId: string) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter((id) => id !== itemId);
      }
      return [...prevSelected, itemId];
    });
  };

  const handlePlayClick = (videoId: string) => {
    setSelectedVideo(videoId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedVideo(null);
  };

  return (
    <Grid item xs={9} sx={{ width: '100%' }}>
      <Paper style={{ height: '80vh', overflowY: 'auto' }}>
        {playlistItems && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      indeterminate={
                        selectedItems.length > 0 &&
                        selectedItems.length < playlistItems.length
                      }
                      checked={selectedItems.length === playlistItems.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Channel</TableCell>
                  <TableCell>Published Date</TableCell>
                  <TableCell>Play</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {playlistItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxClick(item.id)}
                      />
                    </TableCell>
                    <TableCell>{item.snippet.title}</TableCell>
                    <TableCell>{item.snippet.videoOwnerChannelTitle}</TableCell>
                    <TableCell>
                      {new Date(item.snippet.publishedAt).toLocaleDateString()}
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
          {
            playlistItems.find(
              (item) => item.snippet.resourceId.videoId === selectedVideo
            )?.snippet.title
          }
        </Typography>
        {/* Embedded video player (you can replace the iframe with your video player component) */}
        {/* <iframe
          title="Embedded Video"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
          allowFullScreen
        /> */}
        <YoutubePlayer videoId={selectedVideo || ''} controller={false} />
      </Dialog>
    </Grid>
  );
};

export default PlaylistItemContent;
