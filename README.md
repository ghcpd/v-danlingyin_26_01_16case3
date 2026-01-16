# Book Library Catalog

A lightweight, backend-free web app to add books (title + author), list them, and filter by author in real time.

## Project structure
- index.html — entry point wiring the UI
- src/styles.css — styling (dark, glassy theme)
- src/app.js — behavior (state, render, filtering)
- input_ui_spec.txt — provided spec

## Run locally
Choose any static file server; here are two options:

1) Python 3 built-in server
```
python -m http.server 8000
```
Then open http://localhost:8000 in your browser.

2) VS Code Live Server (extension)
- Install the "Live Server" extension.
- Right-click index.html → "Open with Live Server".

No build step is required.

## Usage
- Add: fill Title and Author, click "Add Book" (or press Enter).
- Filter: type in "Author contains" to live-filter (case-insensitive, partial match).
- Clear: use "Clear Filter" to show all books again.
