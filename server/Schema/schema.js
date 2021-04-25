const graphql = require('graphql');
const _Book = require('../Models/Book');
const _Author = require('../Models/Author');
const Book = require('../Models/Book');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;


var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];
//// Types 
const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _Author.findById(parent.authorId);
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        id: { type: GraphQLID },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return _Book.find({ authorId: parent.id })
            }
        }
    })
})


///Fetch Queries...
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return _Book.find({});
            }
        },
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                const { id } = args;
                return _Book.findById(id)
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent, args) {
                return _Author.find({});
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                const { id } = args;
                return _Book.findById(id);
            }
        },

    }
})

//Mutation Queries

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: { name: { type: GraphQLString }, age: { type: GraphQLInt } },
            resolve(parent, args) {
                const { name, age } = args;
                const author = new _Author({
                    name, age
                })
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: { name: { type: GraphQLString }, genre: { type: GraphQLString }, authorId: { type: GraphQLID } },
            resolve(parent, args) {
                const { name, genre, authorId } = args;
                const book = new _Book({
                    name, genre, authorId
                })
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})