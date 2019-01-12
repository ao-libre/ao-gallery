import React, { Component, Fragment } from 'react'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'
import { Query } from 'react-apollo'
import { VOTE_IMAGE_MUTATION } from '../utils/mutations'
import { Mutation } from 'react-apollo'
import { IMAGE_GET_BY_ID } from '../utils/queries'

class ImageDetails extends Component {

    _getQueryVariables = () => {
        const imageId = this.props.match.params.id
        return { imageId }
    };

    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)

        return (
            <Query query={IMAGE_GET_BY_ID} variables={this._getQueryVariables()}>
                {({ loading, error, data }) => {
                    if (loading) return <h3 className="nk-title-back">Cargando...</h3>;
                    if (error) return <h3 className="nk-title-back">Hubo un error por favor intente mas tarde</h3>;

                    return (
                        <Fragment>
                            <div className="container">
                                <div className="nk-gap-4"></div>

                                <div className="nk-store-product">
                                    <div className="row xl-gap vertical-gap align-items-center">
                                        <div className="col-md-5">
                                            <div className="nk-carousel-3" data-size="1">
                                                <div className="nk-carousel-inner nk-popup-gallery">

                                                    {data.image.urls.map(url => (
                                                        <div key={url}>
                                                            <div>
                                                                <img alt={data.image.name} width="240px"
                                                                    src={url} />
                                                            </div>
                                                            <div className="nk-gap-1"></div>
                                                        </div>
                                                    ))}

                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-md-7">

                                            <h2 className="nk-product-title">{data.image.name}</h2>

                                            <div className="nk-product-description">
                                                <p>{data.image.description}</p>
                                            </div>

                                            <aside className="nk-sidebar nk-sidebar-right">
                                                <div className="nk-gap d-lg-none"></div>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td><strong>Subido hace:</strong> &nbsp;&nbsp;&nbsp;</td>
                                                            <td>{timeDifferenceForDate(data.image.createdAt)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Categoria:</strong> &nbsp;&nbsp;&nbsp;</td>
                                                            <td><span>{data.image.category}</span></td>
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
                                                    </tbody>

                                                </table>
                                                
                                                {/* <div style={{display: "inline-block"}}>

                                                    {data.image.urls.map(url => (
                                                            <img alt={data.image.name} width="240px"
                                                                src={url} />
                                                    ))}

                                                </div> */}

                                                {authToken && (
                                                    <Mutation
                                                        mutation={VOTE_IMAGE_MUTATION}
                                                        variables={{ imageId: data.image.id }}
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


                                                <div className="nk-gap-5 d-lg-none"></div>
                                            </aside>

                                            <button className="nk-btn nk-btn-x2 link-effect-4">Descargar haciendo Click derecho sobre la imagen / guardar imagen como...</button>
                                        </div>

                                        {/* {data.image.indexingData && (

                                            <div className="tab-content">
                                                <h2 className="nk-product-title">Datos de Indexacion</h2>

                                                <div role="tabpanel" className="tab-pane fade show active"
                                                    id="tab-description">
                                                    <div className="nk-box-3 bg-dark-1">
                                                        {data.image.indexingData}
                                                    </div>
                                                </div>
                                            </div>

                                        )} */}

                                        <div className="nk-tabs">
                                            <ul className="nav nav-tabs" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" href="#tab-dateo" role="tab" data-toggle="tab">Dateo</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#tab-indexing" role="tab" data-toggle="tab">Indexacion</a>
                                                </li>
                                            </ul>

                                            <div className="tab-content">

                                                <div role="tabpanel" className="tab-pane fade show active" id="tab-dateo">
                                                    <div className="nk-gap-3"></div>
                                                    <div className="nk-box-3 bg-dark-1">
                                                        {data.image.dateoData}
                                                    </div>
                                                </div>

                                                <div role="tabpanel" className="tab-pane fade" id="tab-indexing">
                                                    <div className="nk-gap-3"></div>
                                                    <div className="nk-box-3 bg-dark-1">
                                                        {data.image.indexingData}
                                                    
                                                    </div>
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
