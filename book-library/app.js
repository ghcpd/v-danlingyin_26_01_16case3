/**
 * Book Library Catalog Application
 * A simple frontend app to manage a book collection
 */

// Book storage array
let books = [];

// DOM Elements
const addBookForm = document.getElementById('add-book-form');
const bookTitleInput = document.getElementById('book-title');
const bookAuthorInput = document.getElementById('book-author');
const filterAuthorInput = document.getElementById('filter-author');
const clearFilterBtn = document.getElementById('clear-filter');
const bookListContainer = document.getElementById('book-list');
const bookCountSpan = document.getElementById('book-count');

/**
 * Generate a unique ID for each book
 * @returns {string} Unique identifier
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Add a new book to the library
 * @param {string} title - Book title
 * @param {string} author - Book author
 */
function addBook(title, author) {
    const book = {
        id: generateId(),
        title: title.trim(),
        author: author.trim()
    };
    books.push(book);
    saveToLocalStorage();
    renderBooks();
}

/**
 * Remove a book from the library
 * @param {string} id - Book ID to remove
 */
function removeBook(id) {
    books = books.filter(book => book.id !== id);
    saveToLocalStorage();
    renderBooks();
}

/**
 * Filter books by author name
 * @param {string} authorQuery - Author name to filter by
 * @returns {Array} Filtered array of books
 */
function filterBooksByAuthor(authorQuery) {
    if (!authorQuery || authorQuery.trim() === '') {
        return books;
    }
    const query = authorQuery.toLowerCase().trim();
    return books.filter(book => 
        book.author.toLowerCase().includes(query)
    );
}

/**
 * Render the book list to the DOM
 */
function renderBooks() {
    const filterQuery = filterAuthorInput.value;
    const filteredBooks = filterBooksByAuthor(filterQuery);
    
    // Update book count
    const totalCount = books.length;
    const filteredCount = filteredBooks.length;
    
    if (filterQuery && filterQuery.trim() !== '') {
        bookCountSpan.textContent = `(${filteredCount} of ${totalCount} books)`;
    } else {
        bookCountSpan.textContent = `(${totalCount} book${totalCount !== 1 ? 's' : ''})`;
    }
    
    // Clear current list
    bookListContainer.innerHTML = '';
    
    // Show empty message or books
    if (filteredBooks.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'empty-message';
        
        if (books.length === 0) {
            emptyMessage.textContent = 'No books in the library yet. Add your first book above!';
        } else {
            emptyMessage.textContent = `No books found by author "${filterQuery}"`;
        }
        
        bookListContainer.appendChild(emptyMessage);
        return;
    }
    
    // Create book items
    filteredBooks.forEach((book, index) => {
        const bookElement = createBookElement(book);
        // Add animation class for visual feedback
        if (index === filteredBooks.length - 1 && !filterQuery) {
            bookElement.classList.add('new');
        }
        bookListContainer.appendChild(bookElement);
    });
}

/**
 * Create a DOM element for a book
 * @param {Object} book - Book object
 * @returns {HTMLElement} Book item element
 */
function createBookElement(book) {
    const bookItem = document.createElement('div');
    bookItem.className = 'book-item';
    bookItem.dataset.id = book.id;
    
    const bookInfo = document.createElement('div');
    bookInfo.className = 'book-info';
    
    const titleElement = document.createElement('div');
    titleElement.className = 'book-title';
    titleElement.textContent = book.title;
    
    const authorElement = document.createElement('div');
    authorElement.className = 'book-author';
    authorElement.textContent = book.author;
    
    bookInfo.appendChild(titleElement);
    bookInfo.appendChild(authorElement);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.textContent = 'Remove';
    deleteBtn.addEventListener('click', () => removeBook(book.id));
    
    bookItem.appendChild(bookInfo);
    bookItem.appendChild(deleteBtn);
    
    return bookItem;
}

/**
 * Save books to localStorage for persistence
 */
function saveToLocalStorage() {
    localStorage.setItem('bookLibrary', JSON.stringify(books));
}

/**
 * Load books from localStorage
 */
function loadFromLocalStorage() {
    const stored = localStorage.getItem('bookLibrary');
    if (stored) {
        try {
            books = JSON.parse(stored);
        } catch (e) {
            console.error('Error loading books from localStorage:', e);
            books = [];
        }
    }
}

/**
 * Initialize the application
 */
function init() {
    // Load saved books
    loadFromLocalStorage();
    
    // Initial render
    renderBooks();
    
    // Event Listeners
    
    // Add book form submission
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = bookTitleInput.value;
        const author = bookAuthorInput.value;
        
        if (title && author) {
            addBook(title, author);
            
            // Clear form
            bookTitleInput.value = '';
            bookAuthorInput.value = '';
            bookTitleInput.focus();
        }
    });
    
    // Filter input - real-time filtering
    filterAuthorInput.addEventListener('input', () => {
        renderBooks();
    });
    
    // Clear filter button
    clearFilterBtn.addEventListener('click', () => {
        filterAuthorInput.value = '';
        renderBooks();
    });
}

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', init);
