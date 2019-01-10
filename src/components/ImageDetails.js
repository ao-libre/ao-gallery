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
                    if (loading) return <div>Cargando</div>;
                    if (error) return <div>Error</div>;

                    return (
                        <Fragment>
                            <div className="container">
                                <div className="nk-gap-4"></div>

                                <div className="nk-store-product">
                                    <div className="row xl-gap vertical-gap align-items-center">
                                        <div className="col-md-5">
                                            <div className="nk-carousel-3" data-size="1">
                                                <div className="nk-carousel-inner nk-popup-gallery">

                                                    <div>
                                                        <div>
                                                            <img alt={data.image.name} width="240px"
                                                                 src={data.image.url}/>
                                                        </div>
                                                    </div>

                                                    <div className="nk-gap-1"></div>

                                                    <div>
                                                        <div>
                                                            <img alt={data.image.name} width="240px"
                                                                 src={data.image.url}/>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-md-7">
                                            <h2 className="nk-product-title">{data.image.name}</h2>

                                            <div className="nk-product-description">
                                                <p>{data.image.description}</p>
                                            </div>

                                            <aside className="nk-sidebar nk-sidebar-right">
                                                <div className="nk-gap-5 d-none + d-lg-block"></div>
                                                <div className="nk-gap d-lg-none"></div>
                                                <table>
                                                    <tbody>
                                                    <tr>
                                                        <td><strong>Subido hace:</strong> &nbsp;&nbsp;&nbsp;</td>
                                                        <td>{timeDifferenceForDate(data.image.createdAt)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Categoria:</strong> &nbsp;&nbsp;&nbsp;</td>
                                                        <td><a href="#">News</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Creado en:</strong> &nbsp;&nbsp;&nbsp;</td>
                                                        <td><span>{data.image.origin}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Subido por:</strong> &nbsp;&nbsp;&nbsp;</td>

                                                        <td><span>{data.image.uploadedBy
                                                            ? data.image.uploadedBy.name
                                                            : 'Unknown'}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Favoritos:</strong> &nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className="nk-action-heart">
                                                                <span className="num">{data.image.votes.length}</span>
                                                                <span className="like-icon ion-android-favorite-outline"></span>
                                                                <span className="liked-icon ion-android-favorite"></span>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <div className="nk-gap-5 d-lg-none"></div>
                                            </aside>

                                            <button className="nk-btn nk-btn-x2 link-effect-4">Descargar</button>
                                        </div>


                                        <div className="tab-content">
                                            <div role="tabpanel" className="tab-pane fade show active"
                                                 id="tab-description">
                                                <div className="nk-gap-3"></div>
                                                <div className="nk-box-3 bg-dark-1">
                                                    <p>And gathering. Form for, gathering, female you'll blessed appear
                                                        day us cattle hath be moving face he Whales fruitful is spirit
                                                        Beginning. Abundantly good living Thing isn't stars saw over and
                                                        earth dry rule herb bring image night, fowl their, third set saw
                                                        for. Green a also upon life stars, green and darkness
                                                        greater.</p>
                                                </div>
                                            </div>
                                        </div>

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
