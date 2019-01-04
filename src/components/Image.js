import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const VOTE_MUTATION = gql`
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


class Image extends Component {
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (
            <div className="flex mt2 items-start">
                <div className="flex items-center">
                    <span className="gray">{this.props.index + 1}.</span>
                    {authToken && (
                        <Mutation
                            mutation={VOTE_MUTATION}
                            variables={{ imageId: this.props.image.id }}
                            update={(store, { data: { vote } }) =>
                                this.props.updateStoreAfterVote(store, vote, this.props.image.id)
                            }
                        >
                            {voteImage => (
                                <div className="ml1 gray f11" onClick={voteImage}>
                                    ▲
                                </div>
                            )}
                        </Mutation>
                    )}
                </div>
                <div className="ml1">
                    <div>
                        {this.props.image.name} -
                        {this.props.image.origin}
                    </div>
                    <img alt={this.props.image.name} width="200px" src={this.props.image.url}></img>
                    <div>
                        {this.props.image.description}
                    </div>
                    <div className="f6 lh-copy gray">
                        {/*{this.props.image.votes.length} votes | by{' '}*/}
                        {this.props.image.uploadedBy
                            ? this.props.image.uploadedBy.name
                            : 'Unknown'}{' '}
                        {timeDifferenceForDate(this.props.image.createdAt)}
                    </div>
                </div>
            </div>
        )
    }

}

export default Image
