export default {
  command: ["menu", "help", "m"],
  description: "Menampilkan list menu",
  name: "menu",
  tags: "main",

  run: async (m, { conn, args }) => {
    const selectedCategory = args[0];

    if (!selectedCategory) {
      let body =
      "Hello *" + m.pushName + "*\n\n\n_*" + ucapan + "*_\n\n\n`thank you for using this bot, but This Bot is still being developed, so, some features may still have errors`\n\n";

      const categories = new Set();

      for (const [filePath, command] of Object.entries(global.plugins)) {
        const cmd = command.default || command;
        if (
          !cmd ||
          !cmd.command ||
          !Array.isArray(cmd.command) ||
          !cmd.command[0]
        ) {
          continue;
        }

        const category = cmd.tags || "General";
        categories.add(category);
      }

      const sections = [
        {
          title: "Categories",
          rows: Array.from(categories).map((category) => ({
            title: category,
            id: `.menu ${category}`,
            description: `View commands in the ${category} category`,
          })),
        },
      ];

      return conn.sendListM(m.chat, body,"Made with love by " + global.name + "\n\n" + wm, sections, "", m);
    } else {
      let body = `Commands in the ${selectedCategory} category:\n\n`;

      const commandsInCategory = [];

      for (const [filePath, command] of Object.entries(global.plugins)) {
        const cmd = command.default || command;
        if (
          !cmd ||
          !cmd.command ||
          !Array.isArray(cmd.command) ||
          !cmd.command[0]
        ) {
          continue;
        }

        const category = cmd.tags || "General";
        if (category.toLowerCase() === selectedCategory.toLowerCase()) {
          commandsInCategory.push(cmd);
        }
      }

      commandsInCategory.forEach((cmd) => {
        body += `• ${cmd.name}: ${cmd.description || "No description"}\n`;
      });

      if (commandsInCategory.length === 0) {
        body = `No commands found in the ${selectedCategory} category.`;
      }

      return conn.sendMessage(m.chat, { text: body }, { quoted: m });
    }
  },
};