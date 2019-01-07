import React, { Component } from 'react'
import { Mutation, withApollo } from 'react-apollo'
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
                votes {
                    id
                    user {
                        id
                    }
                }
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
                    <div className="nk-box-3 bg-dark-1">
                        <h2 className="nk-title h3 text-center">Buscar Graficos</h2>
                        <h5 className="nk-title h5 text-center">Por nombre, descripcion o categoria</h5>
                        <div className="nk-gap-1"></div>

                        <input
                            className="form-control required"
                            type='text'
                            onChange={e => this.setState({ filter: e.target.value })}
                        />

                        <button className="nk-btn nk-btn-x2 nk-btn-block nk-btn-rounded nk-btn-color-main-2"
                                onClick={() => this._executeSearch()}>Enviar
                        </button>
                        <div className="nk-gap-1"></div>

                    </div>
                </div>

                <div className="container">
                    <div className="nk-blog-grid-3">

                        {this.state.images.map((image, index) => (
                            <Image key={image.id}
                                   image={image}
                                   index={index}
                            />
                        ))}

                    </div>
                </div>
            </div>
        )
    }
}

export default withApollo(SearchImages)