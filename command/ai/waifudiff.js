export default {
  command: ["waifudiff", "waidiff", "widiff", "wiff"],
  example: `Example: %p *@tagUser*`,
  description: "generate waifu using ai",
  name: "waifudiff",
  tags: "ai",

  loading: true,

  run: async (m, { text, conn}) => {
    if (!text) {
      setTimeout(() => {
        m.reply(`Input the query\n\nexample\n\n${ m.prefix + m.command } long hair`)
      }, 1000)
    } else {
    const query = text
    m.reply(`https://api.ryzendesu.vip/api/ai/waifu-diff?prompt=${encodeURIComponent(query)}`)
    }
  }
}
