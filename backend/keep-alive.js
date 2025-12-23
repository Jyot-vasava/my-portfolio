
import https from "https";

const SERVER_URL = "https://my-portfolio-email-service.onrender.com/api/ping";
const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes

function pingServer() {
  https
    .get(SERVER_URL, (res) => {
      console.log(
        `✅ Ping successful: ${res.statusCode} at ${new Date().toISOString()}`
      );
    })
    .on("error", (err) => {
      console.error(
        `❌ Ping failed: ${err.message} at ${new Date().toISOString()}`
      );
    });
}

// Initial ping
pingServer();

// Set up recurring pings
setInterval(pingServer, PING_INTERVAL);

console.log("🔄 Keep-alive service started. Pinging every 10 minutes...");
