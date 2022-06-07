import { CreateCommandFunc } from "../types/commands";

export const createShuffleCommand: CreateCommandFunc = (
  playerManager,
  options
) => {
  return {
    name: "shuffle",
    description: playerManager.translations.shuffle.description,
    run: async (interaction) => {
      const player = playerManager.find(interaction.guildId);
      if (!player) {
        return await interaction.reply({
          content: playerManager.translations.global.noGuildPlayer,
          ephemeral: options?.ephemeralError ?? true,
        });
      }

      player.shuffle();

      await interaction.reply({
        content: playerManager.translations.shuffle.success,
        ephemeral: options?.ephemeral,
      });
    },
  };
};