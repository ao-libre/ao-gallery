import gql from 'graphql-tag'

export const IMAGE_GET_BY_ID = gql`
    query GetImageById($imageId: ID!) {
        image(id: $imageId)
        {
            id
            name
            urls
            createdAt
            category
            description
            origin
            indexingData
            dateoData
            uploadedBy {
                id
                name
            }
            votes {
                id
                user{
                    id
                }
            }
        }
    }
`
