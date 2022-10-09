const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');

const contents = fs.readFileSync('bookstore-schema.gql').toString();
console.log(`schema ${contents}`)
const schema = buildSchema(contents)

const resolvers = {
    books: () => {
        console.log('books')
        return ['books']
    },
    sooks: () => {
        console.log('sooks')
        return ['sooks']
    },
    query: {
        books: () => {
            console.log('books')
            return ['books']
        }
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
