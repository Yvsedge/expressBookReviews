
const {
    getAllBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle
} = require("./router/general.js");

async function runTests() {
    try {
        console.log("\n=== All Books ===");
        await getAllBooks();

        console.log("\n=== Search by ISBN ===");
        await getBookByISBN("1");

        console.log("\n=== Search by Author ===");
        await getBooksByAuthor("Jane Austen");

        console.log("\n=== Search by Title ===");
        await getBooksByTitle("Pride and Prejudice");

        console.log("\nAll four Axios tests passed!");
    } catch (error) {
        console.error("Axios test failed:", error.message);
        process.exitCode = 1;
    }
}

runTests();
