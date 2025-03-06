from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update, WebAppInfo
from telegram.ext import Updater, CommandHandler, CallbackContext

def start(update: Update, context: CallbackContext) -> None:
    keyboard = [
        [InlineKeyboardButton("🔥 Let's go!", web_app=WebAppInfo(url="https://your-mini-app-url.com"))],
        [InlineKeyboardButton("Not Pixel community", url="https://t.me/notpixel")],
        [InlineKeyboardButton("🖌 How to play?", callback_data='how_to_play')]
    ]

    reply_markup = InlineKeyboardMarkup(keyboard)
    
    update.message.reply_text(
        "Hey, fren! This is Not Pixel 👋\n\n"
        "Paint pixels and get PX.\n\n"
        "How much is PX worth? Nothing so far. Don't get hung up on it and just paint.\n\n"
        "Friends nearby? It's a good time to invite them over:\n"
        "t.me/notpixel/app?startapp=f6460422175\n\n"
        "There's a little instruction at the bottom. That's probably all a beginner Pixel needs to know.",
        reply_markup=reply_markup
    )

def main():
    # Փոխարինեք Ձեր թոկենով
    updater = Updater("7520831618:AAMb-MERp0wB40YPgXst2cDIPgyAw98kg", use_context=True)
    dp = updater.dispatcher
    
    dp.add_handler(CommandHandler("start", start))
    
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()