require("dotenv").config();
const axios = require("axios");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { NODE_ENV, SLACK_BOT_TOKEN } = process.env;
const port = process.env.PORT || 3000;
const BOT_CHANNEL_ID = "C03T65C2Y6T";
const CHANNEL_ID = "C03TC6WJRJ7";
const SLACK_CHANNEL = NODE_ENV === "development" ? BOT_CHANNEL_ID : CHANNEL_ID;
const SLACK_WEB_API_BASE_URL = "https://slack.com/api";

// Middleware
app.use(bodyParser.json());

const axiosConfig = {
	headers: {
		Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
	},
};

const postMessageToChannelWithApi = async ({ name, text }) => {
	const payload = {
		channel: SLACK_CHANNEL,
		text: `${name}: ${text}`,
	};

	try {
		await axios.post(
			`${SLACK_WEB_API_BASE_URL}/chat.postMessage`,
			payload,
			axiosConfig
		);
	} catch (error) {
		// handle error
	}
};

// Routes
app.post("/relay-to-slack", async ({ body }, res) => {
	const { name, sender_type, text } = body;

	if (sender_type !== "bot") {
		postMessageToChannelWithApi({ name, text });
	}

	res.end();
});

app.listen(port, () => {
	console.log(`Express server start on port ${port}`);
});
