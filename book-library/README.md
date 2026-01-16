# Book Library Catalog

A simple, lightweight frontend application for managing a personal book collection. Built with vanilla HTML, CSS, and JavaScript - no frameworks or backend required.

## Features

- ✅ **Add Books**: Enter book title and author to add to your collection
- ✅ **Display Books**: View all books in an organized, visually appealing list
- ✅ **Filter by Author**: Real-time filtering to find books by specific authors
- ✅ **Delete Books**: Remove books from your collection
- ✅ **Persistent Storage**: Books are saved to browser's localStorage
- ✅ **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
book-library/
├── index.html          # Main HTML file with app structure
├── style.css           # Styling and responsive design
├── app.js              # Application logic and functionality
└── README.md           # This file
```

## How to Run

### Method 1: Direct File Opening
1. Navigate to the `book-library` folder
2. Double-click `index.html` to open it in your default browser

### Method 2: Using a Local Server (Recommended)

**Option A - Using Python:**
```bash
cd book-library
python -m http.server 8000
```
Then open your browser to `http://localhost:8000`

**Option B - Using Node.js (with npx):**
```bash
cd book-library
npx http-server -p 8000
```
Then open your browser to `http://localhost:8000`

**Option C - Using VS Code Live Server:**
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## How to Use

### Adding a Book
1. Enter the book title in the "Title" field
2. Enter the author name in the "Author" field
3. Click "Add Book" button
4. The book will appear in the collection below

### Filtering Books
1. Type an author's name in the "Filter by Author" field
2. The book list will automatically update to show only matching books
3. The filter is case-insensitive and matches partial names
4. Click "Clear Filter" to show all books again

### Deleting a Book
1. Find the book you want to remove in the list
2. Click the "Delete" button next to that book
3. Confirm the deletion when prompted
4. The book will be permanently removed

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox/grid, gradients, and animations
- **JavaScript (ES6+)**: Object-oriented approach with classes
- **localStorage API**: Client-side data persistence

### Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

### Key Features Implementation

**Data Storage**: Books are stored in the browser's localStorage, allowing data to persist between sessions without a backend.

**Filtering Logic**: Real-time filtering implemented with case-insensitive string matching, supporting partial author name searches.

**Responsive Design**: Mobile-first approach with CSS media queries ensuring optimal display on all screen sizes.

## Code Organization

The application uses a class-based architecture:

- `BookLibrary` class encapsulates all functionality
- Separation of concerns: data management, UI rendering, and event handling
- Clean, readable code with comments for maintainability

## Limitations

- Data is stored locally in the browser only (no cloud sync)
- No user authentication or multi-user support
- Search is limited to author filtering only
- No edit functionality (must delete and re-add books)

## Future Enhancements

Possible improvements for future versions:
- Edit existing books
- Filter by title or multiple criteria
- Sort books (by title, author, date added)
- Export/import book list as JSON or CSV
- Book categories or tags
- Reading status (read/unread/reading)
- Book cover images
- Dark mode toggle

## License

Free to use and modify for personal or educational purposes.

---

**Created**: January 2026  
**Version**: 1.0.0
