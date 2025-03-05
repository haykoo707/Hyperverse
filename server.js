const TelegramBot = require("node-telegram-bot-api");

// Bot Token (տեղադրիր քո սեփականը)
const BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
const CHAT_ID = "YOUR_TELEGRAM_CHAT_ID"; // Քո անձնական ID-ն կամ խումբը

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Google Sheets-ից տվյալներ ստանալու ֆունկցիա
async function getDataFromGoogleSheets() {
    const doc = new GoogleSpreadsheet(SHEET_ID);
    await doc.useServiceAccountAuth({
        client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    if (rows.length === 0) return "No data available.";

    let message = "📊 *User Data from Google Sheets:*\n\n";
    rows.forEach((row, index) => {
        message += `👤 *User:* ${row.Username || "Unknown"}\n💳 *Wallet:* ${row.Wallet}\n🎮 *Score:* ${row.Score}\n\n`;
    });

    return message;
}

// Բոտի հրաման՝ տվյալները ստանալու համար
bot.onText(/\/get_data/, async (msg) => {
    const chatId = msg.chat.id;
    
    if (chatId.toString() !== CHAT_ID) {
        bot.sendMessage(chatId, "❌ You don't have access to this data.");
        return;
    }

    const dataMessage = await getDataFromGoogleSheets();
    bot.sendMessage(chatId, dataMessage, { parse_mode: "Markdown" });
});
