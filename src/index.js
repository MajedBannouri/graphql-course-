import { GraphQLServer } from "graphql-yoga";
//  Demo users data
const users = [
  {
    id: "1",
    name: "Majed",
    email: "myemail@example.com",
  },
  {
    id: "2",
    name: "John",
    email: "John@example.com",
  },
  {
    id: "3",
    name: "Eva",
    email: "Eva@example.com",
  },
];
const posts = [
  {
    id: "1",
    title: "The great gatsby",
    body: "some text here",
    published: true,
    author: "1",
  },
  {
    id: "2",
    title: "Elon Musk Hobbies",
    body: "some text here ",
    published: true,
    author: "1",
  },
  {
    id: "3",
    title: "Jeff Bizos cutting edge visionary",
    body: "some text here ",
    published: true,
    author: "2",
  },
];

const comments = [
  {
    id: "111",
    text: "comment 1",
    author: "2",
  },
  {
    id: "123",
    text: "comment 2",
    author: "2",
  },
  {
    id: "223",
    text: "comment 3",
    author: "1",
  },
  {
    id: "332",
    text: "comment 4",
    author: "3",
  },
];

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!


    }
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        
    }
    type Comment {
        id: ID!
        text: String!
        author: User!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter((post) => {
        console.log(post);
        return (
          post.body.toLowerCase().includes(args.query.toLowerCase()) ||
          post.title.toLowerCase().includes(args.query.toLowerCase())
        );
      });
    },
    comments(parent, args, ctx, info) {
      return comments;
    },
    me() {
      return {
        id: "122334322",
        name: "Majed",
        //  email: "majed@exmaple.com"
      };
    },
    post() {
      return {
        id: "12344",
        title: "The graphQL",
        body: "test body here",
        published: false,
      };
    },
  },

  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },

    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author == parent.id;
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("Server start running");
});

