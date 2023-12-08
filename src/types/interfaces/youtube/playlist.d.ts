interface YoutubeThumbnail {
  url: string;
  width: number;
  height: number;
}

interface YoutubeSnippetLocalized {
  description: string;
  title: string;
}

interface YoutubeSnippet {
  channelId: string;
  channelTitle: string;
  description: string;
  localized: YoutubeSnippetLocalized;
  title: string;
  publishedAt: string;
  thumbnails: {
    default: YoutubeThumbnail;
    high: YoutubeThumbnail;
    maxres: YoutubeThumbnail;
    medium: YoutubeThumbnail;
    standard: YoutubeThumbnail;
  };
}

interface YoutubeContentDetails {
  itemCount: number;
}

interface YoutubePlaylistItemStatus {
  privacyStatus: 'public' | 'private' | 'unlisted';
}

interface YoutubePlaylistItem {
  kind: string;
  etag: string;
  id: string;
  snippet: YoutubeSnippet;
  contentDetails: YoutubeContentDetails;
  status: YoutubePlaylistItemStatus;
}

interface YoutubePlaylistResponse {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubePlaylistItem[];
}
