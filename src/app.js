const form = document.getElementById('book-form');
const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const authorFilter = document.getElementById('author-filter');
const clearFilterBtn = document.getElementById('clear-filter');
const bookList = document.getElementById('book-list');
const countBadge = document.getElementById('count-badge');

// In-memory collection; replaceable with storage if needed.
const books = [
  { title: 'The Pragmatic Programmer', author: 'Andrew Hunt' },
  { title: 'Clean Code', author: 'Robert C. Martin' },
  { title: 'Atomic Habits', author: 'James Clear' },
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman' }
];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  if (!title || !author) return;

  books.unshift({ title, author });
  titleInput.value = '';
  authorInput.value = '';
  render();
  titleInput.focus();
});

authorFilter.addEventListener('input', () => {
  render();
});

clearFilterBtn.addEventListener('click', () => {
  authorFilter.value = '';
  render();
  authorFilter.focus();
});

function getFilteredBooks() {
  const query = authorFilter.value.trim().toLowerCase();
  if (!query) return books;
  return books.filter(({ author }) => author.toLowerCase().includes(query));
}

function render() {
  const filtered = getFilteredBooks();
  bookList.innerHTML = '';

  if (filtered.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = 'No books match this author filter yet.';
    bookList.appendChild(empty);
  } else {
    filtered.forEach((book) => {
      const card = document.createElement('article');
      card.className = 'card';

      const textBlock = document.createElement('div');
      const titleEl = document.createElement('h3');
      titleEl.textContent = book.title;
      const authorEl = document.createElement('p');
      authorEl.className = 'author';
      authorEl.textContent = book.author;

      textBlock.appendChild(titleEl);
      textBlock.appendChild(authorEl);
      card.appendChild(textBlock);
      bookList.appendChild(card);
    });
  }

  countBadge.textContent = `${filtered.length} / ${books.length}`;
}

render();
