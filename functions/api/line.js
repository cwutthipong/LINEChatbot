const axios = require("axios");

const LINE_API_URL = "https://api.line.me/v2/bot";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
};

// Helper function for LINE Messaging API
const messagingAPI = async (endpoint, payload) => {
  try {
    const response = await axios({
      method: "post",
      url: `${LINE_API_URL}/${endpoint}`,
      headers: LINE_HEADER,
      data: payload,
    });

    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error(`Error sending LINE message to ${endpoint}:`, errorMessage);
    return { success: false, error: errorMessage };
  }
};

exports.reply = async (token, msg) => {
  return messagingAPI("message/reply", { replyToken: token, messages: msg });
};

exports.push = async (userId, msg) => {
  return messagingAPI("message/push", { to: userId, messages: msg });
};

exports.loading = async (userId) => {
  return messagingAPI("chat/loading/start", {
    chatId: userId,
    loadingSeconds: 30,
  });
};
