import React, { Component, Fragment } from 'react'
import Image from './Image'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { IMAGES_PER_PAGE } from '../constants'

export const IMAGES_LIST_QUERY = gql`
    query ImageListQuery($first: Int, $skip: Int, $orderBy: ImageOrderByInput) {
        imageList(first: $first, skip: $skip, orderBy: $orderBy) {
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
                    user{
                        id
                    }
                }
            }
        }
    }
`

const NEW_IMAGES_SUBSCRIPTION = gql`
    subscription {
        newImage {
            node {
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
                    user{
                        id
                    }
                }
            }
        }
    }
`


class ImagesList extends Component {

    _updateCacheAfterVote = (store, createVoteImage, imageId) => {
        const isGallery = this.props.location.pathname.includes('gallery')
        const page = parseInt(this.props.match.params.page, 10)

        const skip = isGallery ? (page - 1) * IMAGES_PER_PAGE : 0
        const first = isGallery ? IMAGES_PER_PAGE : 100
        const orderBy = isGallery ? 'createdAt_DESC' : null
        const data = store.readQuery({
            query: IMAGES_LIST_QUERY,
            variables: { first, skip, orderBy }
        });

        const votedImage = data.imageList.images.find(image => image.id === imageId)
        votedImage.votes = createVoteImage.image.votes
        store.writeQuery({ query: IMAGES_LIST_QUERY, data })
    };


    _getQueryVariables = () => {
        const isGallery = this.props.location.pathname.includes('gallery');
        const page = parseInt(this.props.match.params.page, 10);

        const skip = isGallery ? (page - 1) * IMAGES_PER_PAGE : 0;
        const first = isGallery ? IMAGES_PER_PAGE : 100;
        const orderBy = isGallery ? 'createdAt_DESC' : null;
        return { first, skip, orderBy }
    };

    _getImagesToRender = data => {
        const isGallery = this.props.location.pathname.includes('gallery');
        if (isGallery) {
            return data.imageList.images
        }
        const rankedImages = data.imageList.links.slice();
        rankedImages.sort((l1, l2) => l2.votes.length - l1.votes.length);
        return rankedImages
    };

    _nextPage = data => {
        const page = parseInt(this.props.match.params.page, 10);
        if (page <= data.imageList.count / IMAGES_PER_PAGE) {
            const nextPage = page + 1
            this.props.history.push(`/gallery/${nextPage}`)
        }
    };

    _previousPage = () => {
        const page = parseInt(this.props.match.params.page, 10);
        if (page > 1) {
            const previousPage = page - 1;
            this.props.history.push(`/gallery/${previousPage}`)
        }
    };

    _subscribeToNewImages = subscribeToMore => {
        subscribeToMore({
            document: NEW_IMAGES_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev
                const newImage = subscriptionData.data.newImage.node

                return Object.assign({}, prev, {
                    feed: {
                        images: [newImage, ...prev.imageList.images],
                        count: prev.imageList.images.length + 1,
                        __typename: prev.imageList.__typename
                    }
                })
            }
        })
    }

    render() {
        return (
            <Query query={IMAGES_LIST_QUERY} variables={this._getQueryVariables()}>
                {({ loading, error, data, subscribeToMore }) => {
                    if (loading) return <div>Fetching</div>;
                    if (error) return <div>Error</div>;

                    // this._subscribeToNewImages(subscribeToMore)
                    // this._subscribeToNewVotes(subscribeToMore)

                    const imagesToRender = this._getImagesToRender(data);
                    const isGallery = this.props.location.pathname.includes('gallery')
                    const pageIndex = this.props.match.params.page
                        ? (this.props.match.params.page - 1) * IMAGES_PER_PAGE
                        : 0;

                    return (
                        <Fragment>
                            {imagesToRender.map((image, index) => (
                                <Image
                                    key={image.id}
                                    image={image}
                                    index={index}
                                    updateStoreAfterVote={this._updateCacheAfterVote}
                                />
                            ))}
                            {isGallery && (
                                <div className="flex ml4 mv3 gray">
                                    <div className="pointer mr2" onClick={this._previousPage}>
                                        Previous
                                    </div>
                                    <div className="pointer" onClick={() => this._nextPage(data)}>
                                        Next
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    )
                }}
            </Query>
        )
    }
}


export default ImagesList
