import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'
import { Mutation } from 'react-apollo'
import { Link } from "react-router-dom";
import { VOTE_IMAGE_MUTATION } from '../utils/mutations'

class Image extends Component {
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (

            <div className="nk-blog-post">
                <div className="nk-post-thumb">
                    <div className="nk-post-type">
                        <span className="ion-image"> Imagenes: {this.props.image.urls.length}. </span>
                    </div>

                    <Link to={`/image/${this.props.image.id}`} className="ml1 no-underline black">
                        <img alt={this.props.image.name} src={this.props.image.urls[0]} className="nk-img-stretch" />
                    </Link>

                </div>

                <div className="nk-post-content">
                    <h2 className="nk-post-title h4">
                        <Link to={`/image/${this.props.image.id}`}>
                            {this.props.image.name}
                        </Link>
                    </h2>

                    <div className="nk-post-date">
                        Subido hace {timeDifferenceForDate(this.props.image.createdAt)}
                    </div>

                    {authToken && (
                        <Mutation
                            mutation={VOTE_IMAGE_MUTATION}
                            variables={{ imageId: this.props.image.id }}
                            update={(store, { data: { voteImage } }) =>
                                this.props.updateStoreAfterVote(store, voteImage, this.props.image.id)
                            }
                        >
                            {voteImageMutation => (
                                <div className="ml1 gray f11" onClick={voteImageMutation}>
                                    <span className="like-icon ion-android-favorite-outline"> </span>
                                    Guardar en Favoritos
                                </div>
                            )}
                        </Mutation>
                    )}


                    <div>
                        {this.props.image.category}
                    </div>


                    <div>
                        {this.props.image.votes.length} Veces guardado en favoritos
                    </div>

                    <div>
                        Subido por {this.props.image.uploadedBy
                            ? this.props.image.uploadedBy.name
                            : 'Unknown'}
                    </div>

                    <div className="nk-post-text">
                        <p>
                            Creado en server: {this.props.image.origin}
                            {this.props.image.description}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

}

export default Image
