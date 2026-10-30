
const express = require("express");
const axios = require("axios");

const books = require("./booksdb.js");
const { isValid, users } = require("./auth_users.js");

const public_users = express.Router();
const BASE_URL = "http://localhost:5000";

// ==========================================
// TASK 7: Register a new user
// ==========================================

public_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (
        typeof username !== "string" ||
        typeof password !== "string" ||
        !username.trim() ||
        !password.trim()
    ) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    if (isValid(username)) {
        return res.status(409).json({
            message: "Username already exists"
        });
    }

    users.push({ username, password });

    return res.status(201).json({
        message: "User successfully registered. Now you can login"
    });
});

// ==========================================
// TASK 2: Retrieve all books
// ==========================================

public_users.get("/", (req, res) => {
    return res.status(200).json(books);
});

// ==========================================
// TASK 3: Retrieve book by ISBN
// ==========================================

public_users.get("/isbn/:isbn", (req, res) => {
    const isbn = req.params.isbn;

    if (books[isbn]) {
        return res.status(200).json(books[isbn]);
    }

    return res.status(404).json({
        message: "Book not found"
    });
});

// ==========================================
// TASK 4: Retrieve books by author
// ==========================================

public_users.get("/author/:author", (req, res) => {
    const author = req.params.author.toLowerCase();

    const matchingBooks = Object.values(books).filter(
        (book) => book.author.toLowerCase() === author
    );

    if (matchingBooks.length > 0) {
        return res.status(200).json(matchingBooks);
    }

    return res.status(404).json({
        message: "No books found for this author"
    });
});

// ==========================================
// TASK 5: Retrieve books by title
// ==========================================

public_users.get("/title/:title", (req, res) => {
    const title = req.params.title.toLowerCase();

    const matchingBooks = Object.values(books).filter(
        (book) => book.title.toLowerCase() === title
    );

    if (matchingBooks.length > 0) {
        return res.status(200).json(matchingBooks);
    }

    return res.status(404).json({
        message: "No books found with this title"
    });
});

// ==========================================
// TASK 6: Retrieve book reviews
// ==========================================

public_users.get("/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;

    if (books[isbn]) {
        return res.status(200).json(books[isbn].reviews);
    }

    return res.status(404).json({
        message: "Book not found"
    });
});

// ==========================================
// TASK 11: Get all books using Async/Await
// ==========================================

async function getAllBooks() {
    try {
        const response = await axios.get(BASE_URL + "/");

        console.log("All Books:", response.data);

        return response.data;
    } catch (error) {
        console.error("Error retrieving books:", error.message);
        throw error;
    }
}

// ==========================================
// TASK 12: Get book by ISBN using Promises
// ==========================================

function getBookByISBN(isbn) {
    return axios.get(
        `${BASE_URL}/isbn/${encodeURIComponent(isbn)}`
    )
    .then((response) => {
        console.log("Book by ISBN:", response.data);

        return response.data;
    })
    .catch((error) => {
        console.error("ISBN search failed:", error.message);
        throw error;
    });
}

// ==========================================
// TASK 13: Get books by author using Async/Await
// ==========================================

async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(
            `${BASE_URL}/author/${encodeURIComponent(author)}`
        );

        console.log("Books by Author:", response.data);

        return response.data;
    } catch (error) {
        console.error("Author search failed:", error.message);
        throw error;
    }
}

// ==========================================
// TASK 14: Get books by title using Promises
// ==========================================

function getBooksByTitle(title) {
    return axios.get(
        `${BASE_URL}/title/${encodeURIComponent(title)}`
    )
    .then((response) => {
        console.log("Books by Title:", response.data);

        return response.data;
    })
    .catch((error) => {
        console.error("Title search failed:", error.message);
        throw error;
    });
}

// ==========================================
// Export router and Axios functions
// ==========================================

module.exports.general = public_users;
module.exports.getAllBooks = getAllBooks;
module.exports.getBookByISBN = getBookByISBN;
module.exports.getBooksByAuthor = getBooksByAuthor;
module.exports.getBooksByTitle = getBooksByTitle;
