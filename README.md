# SaavanDL - JioSaavn Music Downloader

A Node.js web application that allows users to search and download music from JioSaavn. The app provides a clean, user-friendly interface to search for songs and download them in high quality.

## Features

- 🎵 Search songs from JioSaavn's vast music library
- 📥 Download songs in high quality (320kbps when available, 160kbps fallback)
- 🖼️ Display song thumbnails and artist information
- 📱 Responsive web interface
- ⚡ Fast search and download functionality

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templating engine, CSS
- **APIs**: JioSaavn API
- **Dependencies**: 
  - `express` - Web framework
  - `ejs` - Templating engine
  - `body-parser` - Parse incoming request bodies
  - `node-fetch` - HTTP client for API calls
  - `cors` - Cross-origin resource sharing

## Installation & Setup

### Prerequisites
- Node.js (v12 or higher)
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/vijaygupta18/Saavan-Music-Downloader.git
   cd SaavanDL
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   node app.js
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

1. **Search for music**: Enter the song name in the search box
2. **Browse results**: View the list of matching songs with thumbnails and artist details
3. **Download**: Click the "Download" button next to any song to download it

## API Endpoints

- `GET /` - Homepage with search interface
- `POST /` - Handle search form submission
- `GET /songname/:song` - Search results for a specific song

## Deployment

The application is configured for Heroku deployment with the included `Procfile`. The live demo was previously available at `https://saavandownload.herokuapp.com/`

### Deploy to Heroku

1. Create a new Heroku app
2. Connect your GitHub repository
3. Deploy the main branch
4. The app will automatically start using the Procfile configuration

## How It Works

The application uses JioSaavn's public API to:
1. Search for songs using the autocomplete endpoint
2. Fetch detailed song information including download URLs
3. Process URLs to get high-quality audio files (320kbps when available)
4. Present downloadable links to users

## File Structure

```
SaavanDL/
├── app.js              # Main application server
├── package.json        # Project dependencies and metadata
├── Procfile           # Heroku deployment configuration
├── public/
│   └── home.css       # Stylesheet for the web interface
├── views/
│   └── home.ejs       # Main page template
└── README.md          # Project documentation
```

## Contributing

Contributions are welcome! Please feel free to submit pull requests and report issues.

## License

ISC License

## Author

**Vijay Gupta**
- GitHub: [@vijaygupta18](https://github.com/vijaygupta18)

---

⭐ If you found this project helpful, please give it a star on GitHub!

## Disclaimer

This tool is for educational purposes only. Please respect copyright laws and the terms of service of music streaming platforms.