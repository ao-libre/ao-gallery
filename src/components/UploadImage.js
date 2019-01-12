import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { IMAGES_LIST_QUERY } from './ImageList'
import { IMAGES_PER_PAGE, CATEGORIES_TYPE } from '../constants'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import Select from 'react-select';

const CLOUDINARY_PRESET = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_PROD : process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

const IMAGE_MUTATION = gql`
    mutation ImageMutation($name: String!, $description: String!, $origin: String!, $urls: [String!]!, $category: String!, $indexingData: String, $dateoData: String) {
        uploadImage(name: $name, description: $description, origin: $origin, urls: $urls, category: $category, indexingData: $indexingData, dateoData: $dateoData) {
            id
            name
            createdAt
            origin
            category
            urls
            description
            indexingData
            dateoData
        }
    }
`

class UploadImage extends Component {
    state = {
        selectedObjTypeOption: null,
        selectedPotionTypeOption: null,
        selectedCategoryOption: null,
        uploadedFileCloudinaryUrls: [],
        indexingData: '',
        dateoData: '',
        name: '',
        description: '',
        origin: '',
        urls: [],
        isDatearFormOpen: false,
        isIndexingFormOpen: false,
    };

    toggleIsDateaForm = () =>
        this.setState(state => ({ isDatearFormOpen: !state.isDatearFormOpen }));

    toggleIsIndexingForm = () =>
        this.setState(state => ({ isIndexingFormOpen: !state.isIndexingFormOpen }));

    handleCategoryChangeSelect = (selectedCategoryOption) => {
        this.setState({ selectedCategoryOption });
        this.setState({ category: selectedCategoryOption.value })
        console.log(`Option selected:`, selectedCategoryOption);
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files
        });

        files.forEach(file => {
            this.handleImageUpload(file);
        })
    }

    handleImageUpload(file) {
        let upload = request.post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState(state => {

                    const urls = state.urls.concat(response.body.secure_url);
                    const uploadedFileCloudinaryUrls = state.uploadedFileCloudinaryUrls.concat(response.body.secure_url);

                    return {
                        urls,
                        uploadedFileCloudinaryUrls
                    }
                });
            }
        });
    }

    render() {
        const {
            name,
            description,
            origin,
            urls,
            selectedCategoryOption,
            category,
            indexingData,
            dateoData
        } = this.state
        return (
            <div>

                <div className="container">

                    <div className="row vertical-gap">

                        <div className="col-md-12">
                            <div className="nk-box-3 bg-dark-1">
                                <h2 className="nk-title h3 text-center">Subir Grafico</h2>
                                <div className="nk-gap-1"></div>

                                <Select
                                    value={selectedCategoryOption}
                                    onChange={this.handleCategoryChangeSelect}
                                    placeholder="Categoria"
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            neutral0: '#0b0b0b',
                                            primary25: 'grey',
                                            primary: 'cyan',
                                        },
                                    })}

                                    options={CATEGORIES_TYPE}
                                />


                                <input
                                    className="form-control"
                                    value={name}
                                    onChange={e => this.setState({ name: e.target.value })}
                                    type="text"
                                    placeholder="Nombre"
                                />
                                <textarea
                                    className="form-control"
                                    value={description}
                                    onChange={e => this.setState({ description: e.target.value })}
                                    type="text"
                                    placeholder="Descripcion"
                                />
                                <input
                                    className="form-control"
                                    value={origin}
                                    onChange={e => this.setState({ origin: e.target.value })}
                                    type="text"
                                    placeholder="Servidor en el cual fue creado el grafico"
                                />
                                <br/>


                                <Dropzone
                                    onDrop={this.onImageDrop.bind(this)}
                                    accept="image/*"
                                    multiple={true}>
                                    {({ getRootProps, getInputProps }) => {
                                        return (

                                            <div className="col-md-12"
                                                 {...getRootProps()}
                                            >
                                                <input {...getInputProps()} />

                                                <div className="nk-info-box bg-main-3">
                                                    <div className="nk-info-box-icon">
                                                        <i className="ion-paintbrush"></i>
                                                    </div>

                                                    <span>Haz click aqui o arrastra los archivos hacia esta ventana para subir
                                                    las imagenes.</span>
                                                    <br/>
                                                    <span>Recuerda subir todas las imagenes juntas de un mismo grafico para que sea mas facil luego encontrarlas y descargarlas</span>

                                                    <div className="nk-gap"></div>

                                                    <button className="nk-btn nk-btn-lg link-effect-4 nk-btn-circle">SUBIR
                                                        IMAGEN/ES</button>
                                                </div>
                                            </div>
                                        )
                                    }}
                                </Dropzone>

                                <div className="col-md-6 col-lg-4">
                                    {this.state.uploadedFileCloudinaryUrls.map(item => (
                                        <div key={item} className="nk-image-box-1">
                                            <img alt={item} src={item}/>
                                            <div className="nk-image-box-overlay nk-image-box-center">
                                                <div>
                                                    <div
                                                        className="nk-image-box-sub-title">{item}</div>
                                                </div>
                                            </div>
                                            <div className="nk-gap-4"></div>

                                        </div>
                                    ))}
                                </div>

                                <div className="nk-gap"></div>
                                <div className="nk-form-response-success"></div>
                                <div className="nk-form-response-error"></div>


                                <button className="nk-btn nk-btn-lg link-effect-4" onClick={this.toggleIsDateaForm}>Datear</button>
                                <button className="nk-btn nk-btn-lg link-effect-4" onClick={this.toggleIsIndexingForm}>Indexar</button>
                            </div>
                        </div>

                    </div>

                </div>

                {!this.state.isDatearFormOpen ? null :
                <div className="container">
                    <div className="row vertical-gap">

                        <div className="col-md-12">
                            <div className="nk-box-3 bg-dark-1">
                                <h2 className="nk-title h3 text-center">Datear Grafico</h2>
                                <div className="nk-gap-1"></div>

                                <div className="nk-info-box bg-main-2">
                                    <div className="nk-info-box-icon">
                                        <i className="ion-information-circled"></i>
                                    </div>
                                    Ejemplo:<br/>
                                    [OBJ1]<br/>
                                    Name=Manzana Roja<br/>
                                    GrhIndex=506<br/>
                                    ObjType=1<br/>
                                    Agarrable=0<br/>
                                    MinHAM=10<br/>
                                    Valor=2<br/>
                                    Crucial=1<br/>
                                </div>

                                <textarea
                                    className="form-control"
                                    value={dateoData}
                                    onChange={e => this.setState({ dateoData: e.target.value })}
                                    type="text"
                                    placeholder="Ingresar Dateo"
                                />

                            </div>
                        </div>
                    </div>
                </div>}

                {!this.state.isIndexingFormOpen ? null :
                <div className="container">
                    <div className="row vertical-gap">

                        <div className="col-md-12">
                            <div className="nk-box-3 bg-dark-1">
                                <h2 className="nk-title h3 text-center">Indexar Grafico</h2>
                                <div className="nk-gap-1"></div>

                                <div className="nk-info-box bg-main-1">
                                    <div className="nk-info-box-icon">
                                        <i className="ion-information-circled"></i>
                                    </div>
                                    Ejemplo:<br/>
                                    Grh24191=6-24169-24170-24171-24172-24173-24174-333,3333<br/>
                                    Grh24192=6-24175-24176-24177-24178-24179-24180-333,3333<br/>
                                    Grh24193=5-24181-24182-24183-24184-24185-277,7778<br/>
                                    Grh24194=5-24186-24187-24188-24189-24190-277,7778<br/>
                                </div>

                                <textarea
                                    className="form-control"
                                    value={indexingData}
                                    onChange={e => this.setState({ indexingData: e.target.value })}
                                    type="text"
                                    placeholder="Ingresar Indexacion"
                                />

                            </div>
                        </div>
                    </div>
                </div>}


                <div className="container">
                    {this.state.name && this.state.description && this.state.category && this.state.uploadedFileCloudinaryUrls.length > 0 && (
                        <Mutation
                            mutation={IMAGE_MUTATION}
                            variables={{ name, description, origin, urls, category, indexingData, dateoData }}
                            onCompleted={() => this.props.history.push('/gallery/1')}
                            update={(store, { data: { uploadImage } }) => {
                                const first = IMAGES_PER_PAGE;
                                const skip = 0;
                                const orderBy = 'createdAt_DESC';
                                const data = store.readQuery({
                                    query: IMAGES_LIST_QUERY,
                                    variables: { first, skip, orderBy }
                                });
                                data.imageList.images.unshift(uploadImage);
                                store.writeQuery({
                                    query: IMAGES_LIST_QUERY,
                                    data,
                                    variables: { first, skip, orderBy }
                                });
                            }}
                        >
                            {imageMutation => <button className="nk-btn nk-btn-x2 nk-btn-block nk-btn-rounded nk-btn-color-main-1"
                                                          onClick={imageMutation}>Enviar</button>}
                        </Mutation>
                    )}
                </div>



            </div>
        )
    }
}

export default UploadImage