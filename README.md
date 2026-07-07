# 🎈 Birthday Card

A simple web app for making cute, personalized birthday cards. Just add a name, a photo, and an age, and watch it turn into an animated card with a party hat and birthday music

🌐 Live Site: https://ruefabahussain.github.io/HappyBirthday/

=====================================

## How It Works

- Invite (index.html) — the sender enters their name and the recipient's name and creates a link
- Card (card.html) — the recipient opens the link, uploads their photo, enters their age, then taps "Seal & Open" to reveal the card

=====================================

## Features

- Two-Step Flow — a simple invite form generates a personalized link (`card.html?sender=...&recipient=...`)
- Personalized Reveal — recipient's name, age, and uploaded photo displayed inside a framed circle with a party hat
- Birthday Music — background music starts automatically when the card is opened, with a mute/unmute toggle

=====================================

## File Structure

```
├── index.html    → Step 1: invite form (sender/recipient names)
├── card.html     → Step 2: photo/age setup + reveal screen
├── script.js     → shared logic for both pages
├── style.css     → shared styling
└── *.mp4         → background birthday music (audio-only track)
```

=====================================

## Deploy

1. Create a new repository on GitHub
2. Upload all files (`index.html`, `card.html`, `script.js`, `style.css`, and the music file)
3. Go to **Settings → Pages → Select "main" branch**
4. Share the invite page with people at:
   `https://yourusername.github.io/birthday-card/index.html`

=====================================

## Customize

### 🎵 Change the Music
Add your audio/video file to the project root, then update the filename in `script.js` (inside `startMusic()`):
```js
audioElement = new Audio('your-file-name.mp4');
```
> ⚠️ If your filename contains spaces, parentheses, or commas, either rename it to something simpler (e.g. `music.mp3`) or URL-encode it in the code to avoid playback issues.

### 🎨 Change Colors & Fonts
Edit the CSS variables at the top of `style.css` (`--rose`, `--gold`, `--plum-*`, `--font-display`, etc.)

=====================================

## Built With

- HTML5
- CSS3 (Animations & Flexbox)
- JavaScript (FileReader API, URLSearchParams)

=====================================

Built by Reoof Abahussain ★ 
