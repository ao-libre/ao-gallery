import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Image from './Image'

const IMAGES_SEARCH_QUERY = gql`
    query ImagesSearchQuery($filter: String!) {
        imageList(filter: $filter) {
            count
            images {
                id
                name
                url
                createdAt
                description
                origin
                uploadedBy {
                    id
                    name
                }
#                votes {
#                    id
#                    user {
#                        id
#                    }
#                }
            }
        }
    }
`

class SearchImages extends Component {
    state = {
        images: [],
        filter: ''
    }

    _executeSearch = async () => {
        const { filter } = this.state
        const result = await this.props.client.query({
            query: IMAGES_SEARCH_QUERY,
            variables: { filter },
        })
        const images = result.data.imageList.images
        this.setState({ images })
    }

    render() {
        return (
            <div>
                <div>
                    Search Image
                    <input
                        type='text'
                        onChange={e => this.setState({ filter: e.target.value })}
                    />
                    <button onClick={() => this._executeSearch()}>OK</button>
                </div>
                {this.state.images.map((image, index) => (
                    <Image key={image.id} image={image} index={index} />
                ))}
            </div>
        )
    }
}

export default withApollo(SearchImages)