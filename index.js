const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');

const contents = fs.readFileSync('bookstore-schema.gql').toString();
console.log(`schema ${contents}`)
const schema = buildSchema(contents)


const authors = [
    'Charles Dickens',
    'Jules Verne',
    'Robert Frost'
]

const books = [
    {
        title: 'Pickwick Papers',
        isbn: '12345678',
        author: 'Charles Dickens',
        year: 1980,
        pages: 300
    },
    {
        title: 'Oliver Twist',
        isbn: 'ABCDEFGH',
        author: 'Charles Dickens',
        year: 1980,
        pages: 300
    },
    {
        title: 'Around the world in 80 days',
        isbn: '12345678',
        author: 'Jules Verne',
        year: 1980,
        pages: 300
    },
    {
        title: 'Journey to the center of the earth',
        isbn: '12345678',
        author: 'Jules Verne',
        year: 1980,
        pages: 300
    }
]

const booksWithResolvers = [
    {
        id: () => {
            const id = '12345678'
            console.log(`selecting id ${id}`)
            return id

        },
        title: () => {
            const title = 'Pickwick Papers'
            console.log(`selecting title ${title}`)
            return title
        },
        isbn: () => {
            const isbn = '12345678'
            console.log(`selecting isbn ${isbn}`)
            return isbn
        },
        author: () => {
            const author = 'Charles Dickens'
            console.log(`selecting author ${author}`)
            return author
        },
        year: () => {
            const year = 1990
            console.log(`selecting year ${year}`)
            return year
        },
        pages: () => {
            const pages = 500
            console.log(`selecting pages ${pages}`)
            return pages
        }
    }
]






const booksX = [
    // {
    //     'id': 'c51f681d-8c83-4d50-a37b-bcecaaa0c1f3',
    //     'title': 'The Pickwick Papers',
    //     'year': 1836,
    //     'isbn': '9783862678532',
    //     'author': 'Charles Dickens'
    // },
    {
        id: () => { 
            console.log('fetching id'); 
            return 'eea4a182-d809-4c4f-8e76-a1ddd2c079af'; 
        },
        title: () => {
            console.log('fetching title');
            return 'Oliver Twist';
        },
        year: () => {
            console.log('fetching year');
            return 1839;
        },
        isbn: () => {
            console.log('fetching isbn');
            return '9780140430172';
        },
        author: () => {
            console.log('fetching author');
            return 'Charles Dickens';
        }
    }

]



const resolvers = {
    getAuthors: () => authors,
    getAuthorsByName: ({name}) => authors.filter((author) => author === name),
    getBooks: () => {
        console.log(`selecting all books`)
        return booksWithResolvers
    },
    addBook: ({book}) => {
        console.log('book is ' + JSON.stringify(book))
        return book
    }
}

var app = express();



app.get('/books', (req, res) => {
    res.json(books)
})

app.get('/authors', (req, res) => {
    res.json(authors)
})




app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))



app.listen(8080)
console.log(`>>> application started`)
