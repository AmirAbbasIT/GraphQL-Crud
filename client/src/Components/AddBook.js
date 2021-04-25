import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo';

const query = gql`
{
    books{
        name
        genre
        id
        author{
            name
            age
        }
    }
}

`
const getAuthors = gql`
{
    authors{
        name
        id
    }
}
`
const addBookMutation = gql`
    mutation($name:String,$genre:String,$authorId:ID){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;
const AddBook = () => {
    const [formData, setFormData] = useState({
        name: "",
        genre: "",
        authorId: ""
    })
    const { data } = useQuery(getAuthors)
    const [addBook, { loading, data: SavedData }] = useMutation(addBookMutation)

    useEffect(() => {
        SavedData && console.log(SavedData)
    }, [SavedData])
    const handleSubmit = e => {
        e.preventDefault();
        addBook({
            variables: {
                name: formData.name,
                genre: formData.genre,
                authorId: formData.authorId
            },
            refetchQueries: [{ query: query }]
        })
    }

    const { name, genre, authorId } = formData;
    return (
        <div>
            <form>
                <input type="text" value={name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Please Enter Book Name" />
                <input type="text" value={genre} onChange={e => setFormData({ ...formData, genre: e.target.value })} placeholder="Please enter genre" />
                <select value={authorId} onChange={e => setFormData({ ...formData, authorId: e.target.value })}>
                    <option selected value="">Select an author</option>
                    {
                        data && data.authors.map(author => (
                            <option value={author.id}>{author.name}</option>
                        ))
                    }
                </select>
                <button onClick={handleSubmit} >Add Book</button>
            </form>
        </div>
    )
}

export default AddBook
