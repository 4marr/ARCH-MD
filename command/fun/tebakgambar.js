import similarity from 'similarity';

const threshold = 0.92;
const timeout = 10;
const winScore = 3499;

const handler = {
    command: ['tebakgambar'],
    description: 'Mulai game Tebak Gambar',
    name: 'tebakgambar',
    tags: 'games',
    game: true,
    group: true,
    run: async (m, { conn }) => {
        conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {};
        const tebakgambar_id = m.chat;

        if (tebakgambar_id in conn.tebakgambar) {
            await conn.reply(
                m.chat,
                'Masih ada game Tebak Gambar yang belum terjawab di chat ini',
                conn.tebakgambar[tebakgambar_id].msg
            );
            return false;
        }

        conn.caklontong = conn.caklontong ? conn.caklontong : {};
        const caklontong_id = m.chat;

        if (caklontong_id in conn.caklontong) {
            m.reply(
                'Masih ada game Cak Lontong yang belum terjawab di chat ini',
                conn.caklontong[caklontong_id].msg)
            return false;
        }

        conn.asahotak = conn.asahotak ? conn.asahotak : {};
        const asahotak_id = m.chat;

        if (asahotak_id in conn.asahotak) {
            m.reply(
                'Masih ada game Tebak Lirik yang belum terjawab di chat ini',
                conn.asahotak[asahotak_id].msg)
            return false;
        }

        conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {};
        const siapakahaku_id = m.chat;

        if (siapakahaku_id in conn.siapakahaku) {
            m.reply(
                'Masih ada game Siapakah Aku yang belum terjawab di chat ini',
                conn.siapakahaku[siapakahaku_id].msg)
            return false;
        }

        conn.susunkata = conn.susunkata ? conn.susunkata : {};
        const susunkata_id = m.chat;

        if (susunkata_id in conn.susunkata) {
            m.reply(
                'Masih ada game Susun Kata yang belum terjawab di chat ini',
                conn.susunkata[susunkata_id].msg)
            return false;
        }

        conn.tebakkalimat = conn.tebakkalimat ? conn.tebakkalimat : {};
        const tebakkalimat_id = m.chat;

        if (tebakkalimat_id in conn.tebakkalimat) {
            m.reply(
                'Masih ada game Susun Kata yang belum terjawab di chat ini',
                conn.tebakkalimat[tebakkalimat_id].msg)
            return false;
        }

        conn.tebaklirik = conn.tebaklirik ? conn.tebaklirik : {};
        const tebaklirik_id = m.chat;

        if (tebaklirik_id in conn.tebaklirik) {
            m.reply(
                'Masih ada game Tebak Lirik yang belum terjawab di chat ini',
                conn.tebaklirik[tebaklirik_id].msg)
            return false;
        }



        let json = await func.fetchJson(
            'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json'
        );
        json = json[Math.floor(Math.random() * json.length)];

        let caption = `[ TEBAK GAMBAR ]

• *Timeout :* 60 seconds
• *Question :* ${json.soal}
• *Clue :* ${json.deskripsi}

Reply to this message to answer the question
Type *nyerah* to surrender`.trim();
        conn.tebakgambar[tebakgambar_id] = {
            tebakgambar_id,
            msg: await m.reply(json.img, { caption, mimetype: 'image/jpeg' }),
            ...json,
            terjawab: false,
            winScore,
            timeout: setTimeout(() => {
                if (conn.tebakgambar[tebakgambar_id]) {
                    conn.reply(
                        m.chat,
                        `Waktu habis! Jawaban yang benar adalah: *${json.jawaban}*`,
                        conn.tebakgambar[tebakgambar_id].msg
                    );
                    delete conn.tebakgambar[tebakgambar_id];
                }
            }, timeout),
        };
    },

    before: async (m) => {
        conn.tebakgambar = conn.tebakgambar || {};
        let id = m.chat;

        if (!conn.tebakgambar[id]) return;

        let json = conn.tebakgambar[id];
        let reward = db.data.users[m.sender];

        if (
            m.body.toLowerCase() === 'nyerah' ||
            m.body.toLowerCase() === 'surrender'
        ) {
            clearTimeout(conn.tebakgambar[id].timeout);

            m.reply(
                `Game Over!! Kamu menyerah! Jawaban yang benar adalah: *${json.jawaban}*`,
                json.msg
            );
            delete conn.tebakgambar[id];
        } else if (
            m.body.toLowerCase() === json.jawaban.toLowerCase() ||
            similarity(m.body.toLowerCase(), json.jawaban.toLowerCase()) >= threshold
        ) {
            reward.balance += json.winScore;
            reward.limit += 5;

            clearTimeout(conn.tebakgambar[id].timeout);
            await conn.sendQuick(
                m.chat,
                `Selamat 🎉 Jawaban kamu benar!


Mau main lagi?`,
                wm,
                null,
                [['Main Lagi', '.tebakgambar']],
                m
            );
            delete conn.tebakgambar[id];
        } else {
            conn.sendMessage(m.chat, {
                react: {
                    text: '❌',
                    key: m.key,
                },
            });
        }
    },
};

export default handler;