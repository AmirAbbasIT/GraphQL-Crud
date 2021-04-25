import React from 'react'
import { useQuery } from 'react-apollo'
import { gql } from 'apollo-boost'

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

const BookList = () => {

    const { data, loading, error, refetch } = useQuery(query)
    return (
        <>
            {
                loading ? <h2>Loading...</h2> :
                    data ? <ul>
                        {
                            data?.books?.map(book => (
                                <li>{book.name} ( {book.genre} ) by {book.author.name}</li>
                            ))
                        }
                    </ul> : <></>
            }
            <ul>

            </ul>
        </>
    )
}

export default BookList
