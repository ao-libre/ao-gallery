import gql from 'graphql-tag'

export const VOTE_IMAGE_MUTATION = gql`
    mutation VoteImageMutation($imageId: ID!) {
        voteImage(imageId: $imageId) {
            id
            image {
                votes {
                    id
                    user {
                        id
                    }
                }
            }
            user {
                id
            }
        }
    }
`
