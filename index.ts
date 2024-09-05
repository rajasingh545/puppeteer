import express, { Response } from "express";
import puppeteer from "puppeteer";

const app = express();

app.get("/", (req, res) => {
  return res.send("Application is working");
});

app.get("/puppeteer", async (req, res: Response) => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, // Use the installed Chromium
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage", // Prevents /dev/shm usage which may be too small
      "--single-process", // Ensures Chromium runs as a single process
      "--disable-gpu",
      "--window-size=1280,1024", // Set window size to ensure enough space for rendering
      "--disable-software-rasterizer",
      "--disable-accelerated-2d-canvas",
    ],
    timeout: 0, // Increase or disable timeout for browser launch
    protocolTimeout: 300000 // Increase protocol timeout to 5 minutes (adjust as needed)
  });
  const page = await browser.newPage();
  await page.setContent(`<h1>My pdf is working</h1>`);
  const pdf = await page.pdf({ path: "output.pdf" });

  await browser.close();

  return res.send("PDF is working");
});

app.listen(3000, () => {
  console.log("Server is listining on port 3000");
});
