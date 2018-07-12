const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphqlTools = require('graphql-tools');

let data = require('./todos.json');

function byId(id) {
  return data.find((todo) => todo.id === id);
}

const schema = `
  type Query {
    hello: String
    todos(first: Int, offset: Int): [Todo]!
  }

  type Todo {
    id: Int
    title: String
    text: String
    done: Boolean
  }

  type Error {
    message: String
  }

  union DoneResult = Todo | Error

  type Mutation {
    done(id: Int!): DoneResult!
  }
`;

const root = {
  hello: () => {
    return 'Hello world!';
  },
  todos: ({first, offset}) => {
    first = first || data.length;
    offset = offset || 0;
    return data.slice(offset, offset + first)
  },
  done: ({id}) => {
    const todo = byId(id)
    if (todo) {
      todo.done = true;
      return todo;
    } else {
      return {
        message: `There is no todo with the ID ${id}.`
      };
    }
  }
};

const resolvers = {
  DoneResult: {
    __resolveType(obj, context, info){
      if (obj.message) {
        return 'Error';
      } else {
        return 'Todo';
      }
    },
  },
};

var app = express();
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
app.use('/graphql', graphqlHTTP({
  schema: graphqlTools.makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolvers
  }),
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
