// components/atoms/PlaylistCard.tsx
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

interface PlaylistCardProps {
  image: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  image,
  title,
  channelTitle,
  publishedAt,
}) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt="Playlist Thumbnail"
        height="140"
        image={image}
      />
      <CardContent>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="caption" color="textSecondary">
          {channelTitle}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {new Date(publishedAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlaylistCard;
