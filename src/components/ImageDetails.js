import React, { Component, Fragment } from 'react'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const IMAGE_GET_BY_ID = gql`
    query GetImageById($imageId: ID!) {
        image(id: $imageId)
        {
            id
            name
            description
            origin
            url
            uploadedBy {
                id
                name
            }
            createdAt
        }
    }
`

class ImageDetails extends Component {


    _getQueryVariables = () => {
        const imageId = this.props.match.params.id
        return { imageId }
    };

    render() {

        return (
            <Query query={IMAGE_GET_BY_ID} variables={this._getQueryVariables()}>
                {({ loading, error, data }) => {
                    console.log(error)
                    if (loading) return <div>Fetching</div>;
                    if (error) return <div>Error</div>;

                    return (
                        <Fragment>
                            <div className="flex mt2 items-start">
                                <div className="ml1">
                                    <div>
                                        {data.image.name}
                                    </div>
                                    <img alt={data.image.name} width="200px" src={data.image.url}></img>
                                    <div>
                                        {data.image.description}
                                    </div>
                                    <div className="f6 lh-copy gray">
                                        Creado en server: {data.image.origin}
                                    </div>
                                    <div className="f6 lh-copy gray">
                                        {/*{data.image.votes.length} votes | by{' '}*/}
                                        Subido por {data.image.uploadedBy
                                        ? data.image.uploadedBy.name
                                        : 'Unknown'}{' - '}
                                        {timeDifferenceForDate(data.image.createdAt)}
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )
                }}
            </Query>
        )
    }

}

export default ImageDetails
