export default {
  command: ["donation", "donasi", "donate"],
  description: "donate if you want",
  name: "donate",
  tags: "main",

  run: async (m, { text }) => {
    if (!text) {
    m.reply(`if you want to support the owner, you can donate here\n\nTri: *${global.number.Tri}*\nDana: *${global.number.Tri}*\n\nSaweria: *-*\nTrakteer: -\n\n*Note: I don't force you to donate, it's all up to you, if you want to donate sincerely, I would like to thank you very much.*`)
    } else {
      m.reply('Don\'t add any word to this command!')
    }
  }
}
