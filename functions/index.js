const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const crypto = require("crypto");
const line = require("./api/line");
const text = require("./msg/text");
const sticker = require("./msg/sticker");
setGlobalOptions({
  region: "asia-southeast1",
});

async function checkSignature(request, response) {
  try {
    if (request.method !== "POST") {
      throw new Error("Method Not Allowed");
    }

    const signature = crypto
      .createHmac("sha256", process.env.LINE_CHANNEL_SECRET)
      .update(request.rawBody)
      .digest("base64")
      .toString();

    if (signature !== request.headers["x-line-signature"]) {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    console.error("Signature verification failed:", error);
    response.status(401).send(error.message);
    return false;
  }
  return true;
}

exports.linewebhook = onRequest(
  {
    invoker: "public",
  },
  async (request, response) => {
    try {
      const isValid = await checkSignature(request, response);
      if (!isValid) {
        return;
      }

      const events = request.body.events;
      for (const event of events) {
        console.log(event);
        const { type, replyToken, message, source } = event;
        switch (type) {
          case "message":
            if (message.type === "text") {
              if (message.text === "สวัสดี") {
                await line.reply(replyToken, [
                  text.v1("สวัสดีค่ะ"),
                  sticker.v1("8515", "16581242"),
                ]);
              } else if (message.text === "สวัสดีครับ") {
                await line.reply(replyToken, [text.v1("สวัสดีครับ 123")]);
              } else {
                await line.loading(source.userId);
                //wait for 3 seconds
                await new Promise((resolve) => setTimeout(resolve, 3000));
                await line.reply(replyToken, [text.v1("สวัสดีค่ะ")]);
              }
            }
            break;
        }
      }
      return response.status(200).send("OK");
    } catch (error) {
      console.error("Webhook processing failed:", error);
      return response.status(500).send("Internal Server Error");
    }
  }
);
