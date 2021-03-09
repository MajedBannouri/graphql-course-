import {GraphQLServer} from 'graphql-yoga'

// Type definitions (schema)
const typeDefs = `
    type Query {
        add(numbers: [Float!]): Float!
        greeting(name: String, position: String): String!
        grades: [Int!]!
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
        add(paret,args,ctx, info){
            if(args.numbers.length === 0 ){
                return 0
            }  else {
                return args.numbers.reduce ((accumulator, currentValue) => {
                        return accumulator+ currentValue
                })
            }
        },
        grades(parent, args, cyx, info){
            return [99,999,876]
        },
        greeting(parent,args,ctx,info){
            
            if(args.name && args.position){
                return `Hello ${args.name}!! You are my favourite ${args.position}`
            }else {
                return "Hello!!!"
            }  
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