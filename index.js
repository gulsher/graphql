const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt , GraphQLNonNull} = require('graphql');
const app = express();
const port = 5000;

const authors= [{id:1,name:"Jk"},{id:2,name:"AB"},{id:3,name:"GS"}]

const books = [{id:1, name: "harry 1",authorId:1},
{id:2, name: "harry 2",authorId:1},
{id:3, name: "harry 3",authorId:1},
{id:4, name: "harry 4",authorId:1},
{id:5, name: "harry 5",authorId:2},
{id:6, name: "harry 6",authorId:2},
{id:7, name: "harry 7",authorId:3},
{id:8, name: "harry 8",authorId:3}]


const BookType = new GraphQLObjectType({
    name:'Books',
    description:'this is a book',
    fields:()=>({
        id:{type:GraphQLNonNull(GraphQLInt)},
        name:{type:GraphQLNonNull(GraphQLString)},
        authorId:{type:GraphQLNonNull(GraphQLInt)},
        author:{type:AuthorType,
            resolve:(book)=>{
            return authors.find(author=>author.id === book.authorId
            )}}
    })
})

const AuthorType = new GraphQLObjectType({
    name:'Author',
    description:'this is a author desc',
    fields:()=>({
        id:{type:GraphQLNonNull(GraphQLInt)},
        name:{type:GraphQLNonNull(GraphQLString)},
    })
})

const RootQueryType = new GraphQLObjectType({
    name:'Query',
    description:'Root Query',
    fields:()=>({
        books:{
            type:new GraphQLList(BookType),
            description:'list of books',
            resolve:()=> books //in real time application it would be database values
        },
        authors:{
            type:new GraphQLList(AuthorType),
            description:'list of author',
            resolve:()=> authors //in real time application it would be database values
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})

app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql: true
}))


app.listen(port,() => {
console.log('listening on port ' + port);
});