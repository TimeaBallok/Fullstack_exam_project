import books from "../data";
export default {
    addBook: (parent, { input }, context, info) => {
        const book = {
            id: books.length + 1,
            title: input.title,
            author: input.author,
        };
        books.push(book);
        return book;
    },
    deleteBook: (parent, args, context, info) => {
        const book = books.find((book) => book.id === parseInt(args.id));
        books.splice(books.indexOf(book), 1);
        return book;
    }
};
