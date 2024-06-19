## Description
Fullstack typeracer-like application. The premise is simple; the player types out song lyrics against the clock, the game can be played solo or against other players. Includes api for fetching song 'snippets' created through a bit a creative web scraping. Try it [here](https://rocket-racer-production-9242.up.railway.app/).
 
<img src="https://i.imgur.com/kwD0hNw.gif" alt="practice">   
<img src="https://i.imgur.com/WcHJk0i.gif" alt="two_player">

## Stack
```
- Express
- React
- ReST API
- Websockets
- Tailwindcss
- Railway
```

### Adendum
This project was a fun first go using React. If I were to do this again I would do things a bit differently. Still, it's good to keep this unchanged to document my learning.
1. Webscraping for lyrics was fun, however there weren't alot of considerations for the quality of the data, turns out song lyrics (especially if your have something super repetitive) were a bit hit or miss for this type of game. Book passages would probably have been better.
2. Separation of frontend and backend (frontend consumes backend API) was unnecessary. I could of created a single app that serves a build of the frontend.
3. I had no knowledge of the suspense component pattern when I built this, which would of come in handy for data fetching and creating a better UI user experience.
