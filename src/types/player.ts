import { StreamType } from "@discordjs/voice";
import { VoiceBasedChannel } from "discord.js";
import { Readable } from "stream";
import { Translations } from "./commands";
import { PlayerEngine, Track } from "./engines";

export interface PlayerEvents {
  trackStart: (track: Track) => void;
  trackEnd: () => void;
  destroyed: () => void;
  queueEnd: () => void;
}

export interface TrackStream {
  /**
   * If the input is given as a string, then the inputType option will be overridden and FFmpeg will be used.
   */
  stream: Readable | string;
  type?: StreamType;
}

export interface PlayOptions {
  /** Voice channel to play in. */
  channel: VoiceBasedChannel;
  /** Tracks to play / add to queue. */
  tracks: Track[];
  stream?: StreamOptions;
}

export interface StreamOptions {
  /** Number of milliseconds to seek/skip. */
  seek?: number;
}

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface PlayerOptions {
  /**
   * Audio quality.
   *
   * @default "high"
   */
  quality?: "low" | "medium" | "high";
  /**
   * Setting to `true` will enable the player to change the volume of the played tracks.
   * Set to `false` for slightly better performance.
   *
   * @default true
   */
  inlineVolume?: boolean;
  /**
   * Initial player volume for all tracks between 0 and 200. Can also be an (async) function that returns the volume.
   */
  initialVolume?: number | ((guildId: string) => number | Promise<number>);
  /**
   * Path to the folder where local files should be playable from. Must be set if local files should be playable.
   * For security reasons files outside this directory are refused to play.
   *
   * @example
   * ```ts
   * // files outside of this public folder wont be playable
   * fileRoot: path.join(__dirname, "../public")
   * ```
   */
  fileRoot?: string;
  /** Custom player engines to provide additional streaming services or override existing ones. */
  customEngines?: Record<string, PlayerEngine>;
  /**
   * When `true` and the player is already playing in voice channel A, player will be allowed to switch to
   * voice channel B. If `false`, player wont connect to another voice channel when he is already playing in a voice channel.
   *
   * @default true
   *
   */
  allowSwitchChannels?: boolean;
}

export interface AudioPlayerMetadata {
  channel: VoiceBasedChannel;
  track: Track;
}

export interface PlayerManagerOptions {
  /** Player options that should be applied for all guilds. Guild specific options can be overridden when calling `playerManager.get(guildId)`. */
  playerDefault?: PlayerOptions;
  /** Translations for the pre-build commands. Default: en */
  translations?: Translations;
}

export enum PlayerRepeatMode {
  NONE,
  TRACK,
}
