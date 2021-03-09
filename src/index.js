import {GraphQLServer} from 'graphql-yoga'
//  Demo users data
const users = [{
    id: '1',
    name: 'Majed',
    email: 'myemail@example.com'
},
{
    id: '2',
    name: 'John',
    email: 'John@example.com'
},
{
    id: '3',
    name: 'Eva',
    email: 'Eva@example.com'
},
]
const posts = [{
    id: '1',
    title: 'The great gatsby',
    body: 'some text here'
},
{
    id: '2',
    title: 'Elon Musk Hobbies',
    body: 'some text here '
},
{
    id: '3',
    title: 'Jeff Bizos cutting edge visionary',
    body: 'some text here '
},
]
// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
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
        users(parent, args, ctx, info){

            return users.filter(user => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info){
            return posts.filter(post =>{
                return post.body.toLowerCase().includes(args.query.toLowerCase()) || post.title.toLowerCase().includes(args.query.toLowerCase())
            })
        },
         me(){
             return {
                 id: '122334322',
                 name: "Majed",
                //  email: "majed@exmaple.com"
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