// Book Library Application
class BookLibrary {
    constructor() {
        this.books = [];
        this.filteredBooks = [];
        this.currentFilter = '';
        this.init();
    }

    init() {
        // Load books from localStorage
        this.loadBooks();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Render initial book list
        this.renderBooks();
    }

    setupEventListeners() {
        // Add book form submission
        const addBookForm = document.getElementById('addBookForm');
        addBookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addBook();
        });

        // Author filter input
        const authorFilter = document.getElementById('authorFilter');
        authorFilter.addEventListener('input', (e) => {
            this.filterByAuthor(e.target.value);
        });

        // Clear filter button
        const clearFilterBtn = document.getElementById('clearFilter');
        clearFilterBtn.addEventListener('click', () => {
            this.clearFilter();
        });
    }

    addBook() {
        const titleInput = document.getElementById('bookTitle');
        const authorInput = document.getElementById('bookAuthor');

        const title = titleInput.value.trim();
        const author = authorInput.value.trim();

        if (!title || !author) {
            alert('Please enter both title and author');
            return;
        }

        // Create new book object
        const book = {
            id: Date.now(),
            title: title,
            author: author,
            dateAdded: new Date().toISOString()
        };

        // Add to books array
        this.books.push(book);

        // Save to localStorage
        this.saveBooks();

        // Clear form inputs
        titleInput.value = '';
        authorInput.value = '';
        titleInput.focus();

        // Re-apply current filter if any
        if (this.currentFilter) {
            this.filterByAuthor(this.currentFilter);
        } else {
            this.renderBooks();
        }

        // Show success feedback
        this.showNotification('Book added successfully!');
    }

    deleteBook(bookId) {
        if (confirm('Are you sure you want to delete this book?')) {
            // Remove book from array
            this.books = this.books.filter(book => book.id !== bookId);
            
            // Save to localStorage
            this.saveBooks();
            
            // Re-render with current filter
            if (this.currentFilter) {
                this.filterByAuthor(this.currentFilter);
            } else {
                this.renderBooks();
            }

            this.showNotification('Book deleted successfully!');
        }
    }

    filterByAuthor(authorName) {
        this.currentFilter = authorName.trim();

        if (!this.currentFilter) {
            this.filteredBooks = [...this.books];
        } else {
            // Case-insensitive filter
            const filterLower = this.currentFilter.toLowerCase();
            this.filteredBooks = this.books.filter(book => 
                book.author.toLowerCase().includes(filterLower)
            );
        }

        this.renderBooks();
    }

    clearFilter() {
        this.currentFilter = '';
        this.filteredBooks = [...this.books];
        document.getElementById('authorFilter').value = '';
        this.renderBooks();
    }

    renderBooks() {
        const bookListContainer = document.getElementById('bookList');
        const bookCountElement = document.getElementById('bookCount');
        
        // Determine which books to display
        const booksToDisplay = this.currentFilter ? this.filteredBooks : this.books;

        // Update book count
        const totalBooks = this.books.length;
        const displayedBooks = booksToDisplay.length;
        
        if (this.currentFilter) {
            bookCountElement.textContent = `Showing ${displayedBooks} of ${totalBooks} books`;
        } else {
            bookCountElement.textContent = `Total books: ${totalBooks}`;
        }

        // Clear current list
        bookListContainer.innerHTML = '';

        // Check if there are books to display
        if (booksToDisplay.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'empty-message';
            
            if (this.currentFilter && this.books.length > 0) {
                emptyMessage.textContent = `No books found by author "${this.currentFilter}"`;
            } else if (this.books.length === 0) {
                emptyMessage.textContent = 'No books in the library yet. Add your first book above!';
            }
            
            bookListContainer.appendChild(emptyMessage);
            return;
        }

        // Render each book
        booksToDisplay.forEach(book => {
            const bookElement = this.createBookElement(book);
            bookListContainer.appendChild(bookElement);
        });
    }

    createBookElement(book) {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.dataset.bookId = book.id;

        const bookInfo = document.createElement('div');
        bookInfo.className = 'book-info';

        const bookTitle = document.createElement('div');
        bookTitle.className = 'book-title';
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement('div');
        bookAuthor.className = 'book-author';
        bookAuthor.innerHTML = `<strong>Author:</strong> ${book.author}`;

        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => this.deleteBook(book.id));

        bookItem.appendChild(bookInfo);
        bookItem.appendChild(deleteBtn);

        return bookItem;
    }

    saveBooks() {
        localStorage.setItem('bookLibrary', JSON.stringify(this.books));
    }

    loadBooks() {
        const stored = localStorage.getItem('bookLibrary');
        if (stored) {
            try {
                this.books = JSON.parse(stored);
                this.filteredBooks = [...this.books];
            } catch (e) {
                console.error('Error loading books from localStorage:', e);
                this.books = [];
                this.filteredBooks = [];
            }
        }
    }

    showNotification(message) {
        // Simple notification (could be enhanced with better UI)
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 15px 25px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const bookLibrary = new BookLibrary();
    
    // Expose to window for debugging (optional)
    window.bookLibrary = bookLibrary;
});
