import dotenv from "dotenv";
dotenv.config();
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// Start the bot
bot.launch();
console.log("\x1b[35m\x1b[1mBot is running...\x1b[0m");

//_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*

// bot.on(message("text"), async (ctx) => {
//   ctx.reply("invoiceLink");
// });

bot.on(message("text"), async (ctx) => {
  console.log(ctx.message.text);
  let invoiceLink;
  try {
    invoiceLink = await ctx.telegram.createInvoiceLink({
      title: "Product Name",
      description: "Product Description",
      payload: "unique-payload",
      provider_token: "", // Empty string for payments in Telegram Stars
      currency: "XTR",
      prices: [{ label: "Product Price", amount: 1000 }], // Amount in smallest units (e.g., 1000 = 10.00)
    });
  } catch (error) {
    console.error("Error creating invoice link:", error);
    return ctx.reply(
      "Sorry, there was an error creating the invoice link. Please try again later."
    );
  }
  ctx.reply(invoiceLink);
});
