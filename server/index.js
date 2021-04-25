const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./Schema/schema')

const app = express();

app.use(express.json())
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.get("*", (req, res) => {
    return res.status(200).send({ message: "Hi Im Runing..." })
})

app.listen(4000, () => {
    console.log("Server is Up...")
})