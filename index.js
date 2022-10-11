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
    getAuthorsByName: ({name}) => authors.filter((author) => author.toUpperCase().includes(name.toUpperCase())),
    getBooks: () => {
        console.log('books')
        return books
    },
    addBook: ({book}) => {
        console.log('book is ' + JSON.stringify(book))
        return book
    }
}

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))

app.listen(8080)
console.log(`>>> application started`)
