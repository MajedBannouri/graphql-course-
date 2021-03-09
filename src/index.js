import {GraphQLServer} from 'graphql-yoga'

// Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
    }
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int

    }
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`
    



// Resolvers
const resolvers = {
    Query: {
         me(){
             return {
                 id: '122334322',
                 name: "Majed",
                 email: "majed@exmaple.com"
             }
         },
         post(){
             return {
                 id: '12344',
                 title: 'The graphQL',
                 body: 'test body here',
                 published: false
             }
         }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})


server.start(()=>{
    console.log("Server start running")
})