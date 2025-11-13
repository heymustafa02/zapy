import axios from "axios";

export async function sendTelegram(metadata: { chatId: string; message: string; }) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
    chat_id: metadata.chatId,
    text: metadata.message,
  });
}
