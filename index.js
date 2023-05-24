const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');
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

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({ 
        name:"helloWorld",
        fields:()=>({
            message:{
                type:GraphQLString,
                resolve:() => 'Hello world'
            }
        })
    })
})

app.use('/graphql', graphqlHTTP({
    schema:schema,
    graphiql: true
}))


app.listen(port,() => {
console.log('listening on port ' + port);
});