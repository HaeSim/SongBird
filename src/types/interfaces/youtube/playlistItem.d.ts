interface YoutubeThumbnail {
  url: string;
  width: number;
  height: number;
}

interface YoutubeSnippet {
  channelId: string;
  channelTitle: string;
  description: string;
  playlistId: string;
  position: number;
  publishedAt: string;
  resourceId: {
    kind: string;
    videoId: string;
  };
  thumbnails: {
    default: YoutubeThumbnail;
    medium: YoutubeThumbnail;
    high: YoutubeThumbnail;
    standard: YoutubeThumbnail;
    maxres: YoutubeThumbnail;
  };
  title: string;
  videoOwnerChannelId: string;
  videoOwnerChannelTitle: string;
}

interface YoutubePlaylistItemStatus {
  privacyStatus: 'public' | 'private' | 'unlisted';
}

interface YoutubePlaylistItem {
  etag: string;
  id: string;
  kind: string;
  snippet: YoutubeSnippet;
  contentDetails: {
    videoId: string;
    videoPublishedAt: string;
  };
  status: YoutubePlaylistItemStatus;
}

interface YoutubePlaylistItemResponse {
  kind: string;
  etag: string;
  items: YoutubePlaylistItem[];
  pageInfo: {
    // add pageInfo properties based on your actual data
  };
}
