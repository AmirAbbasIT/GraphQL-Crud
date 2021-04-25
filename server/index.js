const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./Schema/schema')
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://amirabbasIT:amir123@cluster0.9ieta.mongodb.net/GraphQLDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

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