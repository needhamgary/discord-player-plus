import { PlayerOptions, StreamOptions, TrackStream } from "./player";

export interface PlayerEngine {
  search(query: string, options?: SearchOptions): Promise<SearchResult[]>;
  getStream(
    track: Track,
    playerOptions: PlayerOptions,
    streamOptions?: StreamOptions
  ): Promise<TrackStream | null>;
}

export interface SearchOptions {
  /**
   * The source where tracks should be searched. If not provided, will automatically detect the source or fall back to YouTube.
   */
  source?: TrackSource;
  /** Limit number of tracks to search. */
  limit?: number;
}

export interface SearchResult {
  tracks: Track[];
  playlist?: Playlist;
  source: TrackSource;
}

export interface Track {
  title: string;
  /** Track url. If using local file url/path, set `source` to `file`. */
  url: string;
  thumbnailUrl?: string;
  /** Duration in seconds. */
  duration: number;
  artist?: string;
  source: TrackSource;
  playlist?: Playlist;
}

export interface Playlist {
  title: string;
  url: string;
  thumbnailUrl?: string;
}

export type TrackSource = "file" | "youtube" | "spotify";
