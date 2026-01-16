# 📚 Book Library Catalog

A simple, frontend-only book library management application built with vanilla HTML, CSS, and JavaScript.

## Features

- **Add Books**: Add new books with title and author information
- **Display Book List**: View all books in your collection
- **Filter by Author**: Real-time filtering of books by author name
- **Remove Books**: Delete books from your collection
- **Persistent Storage**: Books are saved to localStorage (persists across browser sessions)
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
book-library/
├── index.html      # Main HTML file with app structure
├── styles.css      # CSS styles and responsive design
├── app.js          # JavaScript application logic
└── README.md       # This file
```

## How to Run

### Option 1: Direct Browser Open
1. Navigate to the `book-library` folder
2. Double-click on `index.html` to open it in your default browser
3. The app is ready to use!

### Option 2: Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 3: Using Python HTTP Server
```bash
cd book-library
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Option 4: Using Node.js HTTP Server
```bash
# Install http-server globally (one time)
npm install -g http-server

# Run from the book-library directory
cd book-library
http-server
```
Then open `http://localhost:8080` in your browser.

## Usage Guide

### Adding a Book
1. Enter the book title in the "Title" field
2. Enter the author name in the "Author" field
3. Click "Add Book" or press Enter

### Filtering Books
1. Type an author's name in the "Filter by Author" field
2. The book list will filter in real-time as you type
3. Click "Clear Filter" to show all books again

### Removing a Book
1. Find the book you want to remove in the list
2. Click the "Remove" button next to it

## Technical Details

- **No Backend Required**: All data is stored in the browser's localStorage
- **No External APIs**: Completely self-contained application
- **No Build Tools**: Pure HTML/CSS/JavaScript - no compilation needed
- **Browser Support**: Works in all modern browsers (Chrome, Firefox, Safari, Edge)

## Screenshots

The application features:
- A clean, modern gradient design
- Card-based book display
- Smooth animations for adding books
- Mobile-responsive layout

---

Built with ❤️ using vanilla HTML, CSS, and JavaScript
