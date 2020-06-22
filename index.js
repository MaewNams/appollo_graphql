const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Book {
        title: String
        authorInfo: [Author]
    }

    type Author {
        id: String
        name: String
        surname: String
        bookInfo: [Book]
    }

    type Query {
        books: [Book]
        authors: [Author]
    }
`

const books = [
    {
        title: 'A white cat name White',
        authorInfo: ['A', 'B', 'C'],
    },
    {
        title: 'A rabbit in my room',
        authorInfo: ['A', 'D']
    },

];

const authors = [
    { id: 'A', name: 'Apple', surname: 'AA' },
    { id: 'B', name: 'Bee', surname: 'Hello' },
    { id: 'C', name: 'Cat', surname: "sdf" },
    { id: 'D', name: 'Dog', surname: "4564" },
]


const resolvers = {
    Query: {
        books: () => books,
        authors: () => authors,
    },
    Book: {
        authorInfo: (param) => {
            const authorsInfo = []
            for (const authorId of param.authorInfo) {
                const author = authors.find(a => a.id == authorId)
                authorsInfo.push(author)
            }
            return authorsInfo
        }
    }
};


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url} OwO//`)
})
