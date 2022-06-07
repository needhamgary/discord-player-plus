import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
import { playTracks } from ".";
import { CreateCommandFunc } from "../types/commands";
import { trackToMarkdown, urlToMarkdown } from "../utils/player";

export const createAddCommand: CreateCommandFunc = (playerManager, options) => {
  return {
    name: "add",
    description: playerManager.translations.add.description,
    options: [
      {
        name: "query",
        description: playerManager.translations.play.optionDescription,
        type: ApplicationCommandOptionTypes.STRING,
        required: true,
      },
    ],
    run: async (interaction) => {
      const searchResult = await playTracks(
        interaction,
        playerManager,
        false,
        options
      );
      if (!searchResult) return;

      if (searchResult.playlist) {
        return await interaction.followUp({
          content: playerManager.translations.add.successPlaylist.replace(
            "{playlist}",
            urlToMarkdown(
              searchResult.playlist.title,
              searchResult.playlist.url
            )
          ),
        });
      }

      await interaction.followUp({
        content: playerManager.translations.add.successTrack.replace(
          "{track}",
          trackToMarkdown(searchResult.tracks[0])
        ),
      });
    },
  };
};