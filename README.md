# Experiments with GraphQL

Start with
```
npm start
```
and visit [http://localhost:4000/graphql](http://localhost:4000/graphql)

## Example Queries

### Query Hello

```
query Query{
 hello
}
```

### Query Todos

```
query Query {
  todos {
    id
  }
}
```

### Query the first 2 Todos starting with the 2nd

```
query Query {
  todos(first: 2, offset: 1) {
    id
  }
}
```

### Mark Todo as Done

```
mutation Mutation{
  done(id: 1) {
    __typename
    ... on Error {
      message
    }
    ... on Todo {
      id, title, text, done
    }
  }
}
```

