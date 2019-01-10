import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { IMAGES_LIST_QUERY } from './ImageList'
import { IMAGES_PER_PAGE, OBJ_TYPE, POTION_TYPE, CLASS_TYPE } from '../constants'
// import { CloudinaryContext, Transformation, Image } from 'cloudinary-react'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import Select from 'react-select';

const Checkbox = props => <input type="checkbox" {...props} />;

const IMAGE_MUTATION = gql`
    mutation ImageMutation($name: String!, $description: String!, $origin: String!, $url: String!, $urls: [String!]!) {
        uploadImage(name: $name, description: $description, origin: $origin, url: $url, urls: $urls) {
            id
            name
            createdAt
            origin
            url
            urls
            description
        }
    }
`

class UploadImage extends Component {
    state = {
        selectedObjTypeOption: null,
        selectedPotionTypeOption: null,
        uploadedFileCloudinaryUrl: [],
        name: '',
        description: '',
        origin: '',
        url: 'asd',
        urls: [],
        objType: '',
        tipoPocion: '',
        razaEnanaAnim: '',
        numRopaje: '',
        anim: '',
        agarrable: '',
        maxDef: '',
        minDef: '',
        minHit: '',
        maxHit: '',
        staffPower: '',
        staffDamageBonus: '',
        valor: '',
        crucial: '',
        clasesProhibidas: [],
        lingH: '',
        lingP: '',
        lingO: '',
        skHerreria: '',
        upgrade: '',
        abierta: '',
        llave: '',
        indexAbierta: '',
        indexCerrada: '',
        indexCerradaLlave: '',
        cantItems: '',
        nroItems: '',
        texto: '',
        radio: '',
        vGrande: '501',
        clave: '',
        nosecae: '',
        newbie: '',
        isDatearFormOpen: false,
    };

    toggleAgarrable = () =>
        this.setState(state => ({ agarrable: !state.agarrable }));

    toggleCrucial = () =>
        this.setState(state => ({ crucial: !state.crucial }));

    toggleNewbie = () =>
        this.setState(state => ({ newbie: !state.newbie }));

    togglePuertaAbierta = () =>
        this.setState(state => ({ abierta: !state.abierta }));

    toggleNoSeCae = () =>
        this.setState(state => ({ nosecae: !state.nosecae }));

    toggleIsDateaForm = () =>
        this.setState(state => ({ isDatearFormOpen: !state.isDatearFormOpen }));

    handleObjTypeChangeSelect = (selectedObjTypeOption) => {
        this.setState({ selectedObjTypeOption });
        this.setState({ objType: selectedObjTypeOption.value })
        console.log(`Option selected:`, selectedObjTypeOption);
    }

    handlePotionTypeChangeSelect = (selectedPotionTypeOption) => {
        this.setState({ selectedPotionTypeOption });
        this.setState({ tipoPocion: selectedPotionTypeOption.value })
        console.log(`Option selected:`, selectedPotionTypeOption);
    }

    handleClassTypeChangeSelect = (selectedClassTypeOption) => {
        this.setState({ selectedClassTypeOption });
        this.setState({ clasesProhibidas: selectedClassTypeOption.value })
        console.log(`Option selected:`, selectedClassTypeOption);
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
            .field('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState(state => {

                    const urls = state.urls.concat(response.body.secure_url);
                    const uploadedFileCloudinaryUrl = state.uploadedFileCloudinaryUrl.concat(response.body.secure_url);

                    return {
                        urls,
                        uploadedFileCloudinaryUrl
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
            url,
            urls,
            selectedObjTypeOption,
            selectedPotionTypeOption,
            selectedClassTypeOptions,
            objType,
            tipoPocion,
            clasesProhibidas,
            razaEnanaAnim,
            numRopaje,
            anim,
            agarrable,
            maxDef,
            minDef,
            minHit,
            maxHit,
            staffPower,
            staffDamageBonus,
            valor,
            crucial,
            lingH,
            lingP,
            lingO,
            skHerreria,
            upgrade,
            abierta,
            llave,
            indexAbierta,
            indexCerrada,
            indexCerradaLlave,
            cantItems,
            nroItems,
            texto,
            radio,
            vGrande,
            clave,
            nosecae,
            newbie
        } = this.state
        return (
            <div>

                <div className="container">

                    <div className="row vertical-gap">

                        <div className="col-md-12">
                            <div className="nk-box-3 bg-dark-1">
                                <h2 className="nk-title h3 text-center">Subir Grafico</h2>
                                <div className="nk-gap-1"></div>


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

                                                    Haz click aqui o arrastra los archivos hacia esta ventana para subir
                                                    las imagenes
                                                    <div className="nk-gap"></div>

                                                    <a className="nk-btn nk-btn-lg link-effect-4 nk-btn-circle">SUBIR
                                                        IMAGEN</a>
                                                </div>
                                            </div>
                                        )
                                    }}
                                </Dropzone>

{/*                                <div className="col-md-6 col-lg-4">
                                    {this.state.uploadedFileCloudinaryUrl === '' ? null :
                                        <div className="nk-image-box-1">
                                            <img src={this.state.uploadedFileCloudinaryUrl}/>
                                            <div className="nk-image-box-overlay nk-image-box-center">
                                                <div>
                                                    <h6 className="nk-image-box-title h6">{this.state.uploadedFile.name}</h6>
                                                    <div
                                                        className="nk-image-box-sub-title">{this.state.uploadedFile.name}</div>
                                                </div>
                                            </div>
                                        </div>}
                                </div>*/}

                                <div className="col-md-6 col-lg-4">
                                    {this.state.uploadedFileCloudinaryUrl.map(item => (
                                        <div key={item} className="nk-image-box-1">
                                            <img src={item}/>
                                            <div className="nk-image-box-overlay nk-image-box-center">
                                                <div>
                                                    <h6 className="nk-image-box-title h6">{item}</h6>
                                                    <div
                                                        className="nk-image-box-sub-title">{item}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="nk-gap"></div>
                                <div className="nk-form-response-success"></div>
                                <div className="nk-form-response-error"></div>

                                <Mutation
                                    mutation={IMAGE_MUTATION}
                                    variables={{ name, description, origin, url, urls }}
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
                                    {imageMutation => <button className="nk-btn nk-btn-lg link-effect-4"
                                                              onClick={imageMutation}>Enviar</button>}
                                </Mutation>

                                <button className="nk-btn nk-btn-lg link-effect-4" onClick={this.toggleIsDateaForm}>Datear</button>
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

                                <div className="nk-info-box bg-main-1">
                                    <div className="nk-info-box-icon">
                                        <i className="ion-information-circled"></i>
                                    </div>
                                    El formulario de dateo aun esta en estado ALPHA por lo cual debe de ser usado siendo cuidadosamente pensando que valores se escriben
                                    , se mejorara en proximas :)
                                </div>

                                Tipo de objeto
                                <Select
                                    value={selectedObjTypeOption}
                                    onChange={this.handleObjTypeChangeSelect}

                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            neutral0: '#0b0b0b',
                                            primary25: 'grey',
                                            primary: 'cyan',
                                        },
                                    })}

                                    options={OBJ_TYPE}
                                />

                                Tipo de pocion
                                <Select
                                    value={selectedPotionTypeOption}
                                    onChange={this.handlePotionTypeChangeSelect}

                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            neutral0: '#0b0b0b',
                                            primary25: 'grey',
                                            primary: 'cyan',
                                        },
                                    })}

                                    options={POTION_TYPE}
                                />


                                Clase de personajes prohibidas
                                <Select
                                    value={selectedClassTypeOptions}
                                    isMulti
                                    className="basic-multi-select"
                                    onChange={this.handleClassTypeChangeSelect}

                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            neutral0: '#0b0b0b',
                                            primary25: 'grey',
                                            primary: 'cyan',
                                        },
                                    })}

                                    options={CLASS_TYPE}
                                />

                                Nombre
                                <input
                                    className="form-control"
                                    value={name}
                                    onChange={e => this.setState({ name: e.target.value })}
                                    type="text"
                                />

                                Raza Enana GRH
                                <input
                                    className="form-control"
                                    value={razaEnanaAnim}
                                    onChange={e => this.setState({ razaEnanaAnim: e.target.value })}
                                    type="number"
                                />


                                Numero Ropaje
                                <input
                                    className="form-control"
                                    value={numRopaje}
                                    onChange={e => this.setState({ numRopaje: e.target.value })}
                                    type="number"
                                />


                                Animacion
                                <input
                                    className="form-control"
                                    value={anim}
                                    onChange={e => this.setState({ anim: e.target.value })}
                                    type="text"
                                />

                                Agarrable
                                <Checkbox
                                    checked={agarrable}
                                    onChange={this.toggleAgarrable}
                                />
                                <br/>

                                Defensa Maxima
                                <input
                                    className="form-control"
                                    value={maxDef}
                                    onChange={e => this.setState({ maxDef: e.target.value })}
                                    type="number"
                                />


                                Defensa Minima
                                <input
                                    className="form-control"
                                    value={minDef}
                                    onChange={e => this.setState({ minDef: e.target.value })}
                                    type="number"
                                />


                                Hit Minimo
                                <input
                                    className="form-control"
                                    value={minHit}
                                    onChange={e => this.setState({ minHit: e.target.value })}
                                    type="number"
                                />


                                Hit Maximo
                                <input
                                    className="form-control"
                                    value={maxHit}
                                    onChange={e => this.setState({ maxHit: e.target.value })}
                                    type="number"
                                />


                                Staff Power
                                <input
                                    className="form-control"
                                    value={staffPower}
                                    onChange={e => this.setState({ staffPower: e.target.value })}
                                    type="number"
                                />


                                Staff Damage Bonus
                                <input
                                    className="form-control"
                                    value={staffDamageBonus}
                                    onChange={e => this.setState({ staffDamageBonus: e.target.value })}
                                    type="number"
                                />


                                Valor (cantidad de oro que cuesta el objeto)
                                <input
                                    className="form-control"
                                    value={valor}
                                    onChange={e => this.setState({ valor: e.target.value })}
                                    type="number"
                                />


                                Crucial (en caso de ser 1, el objeto será repuesto automáticamente al ser agotado en un
                                NPC
                                vendedor)
                                <Checkbox
                                    checked={crucial}
                                    onChange={this.toggleCrucial}
                                />
                                <br/>

                                Lingotes Hierro
                                <input
                                    className="form-control"
                                    value={lingH}
                                    onChange={e => this.setState({ lingH: e.target.value })}
                                    type="number"
                                />


                                Lingotes Plata
                                <input
                                    className="form-control"
                                    value={lingP}
                                    onChange={e => this.setState({ lingP: e.target.value })}
                                    type="number"
                                />


                                Lingotes Oro
                                <input
                                    className="form-control"
                                    value={lingO}
                                    onChange={e => this.setState({ lingO: e.target.value })}
                                    type="number"
                                />


                                Skills Herreria Necesarios para craftear item.
                                <input
                                    className="form-control"
                                    value={skHerreria}
                                    onChange={e => this.setState({ skHerreria: e.target.value })}
                                    type="number"
                                />


                                Upgrade (item a ser actualizado ??)
                                <input
                                    className="form-control"
                                    value={upgrade}
                                    onChange={e => this.setState({ upgrade: e.target.value })}
                                    type="number"
                                />


                                Puerta Abierta
                                <Checkbox
                                    checked={abierta}
                                    onChange={this.togglePuertaAbierta}
                                />
                                <br/>

                                Llave
                                <input
                                    className="form-control"
                                    value={llave}
                                    onChange={e => this.setState({ llave: e.target.value })}
                                    type="number"
                                />

                                Clave (ponemos la clave de la puerta que podrá ser abierta con esta llave)
                                <input
                                    className="form-control"
                                    value={clave}
                                    onChange={e => this.setState({ clave: e.target.value })}
                                    type="number"
                                />


                                Index Abierta
                                <input
                                    className="form-control"
                                    value={indexAbierta}
                                    onChange={e => this.setState({ indexAbierta: e.target.value })}
                                    type="number"
                                />


                                Index Cerrada
                                <input
                                    className="form-control"
                                    value={indexCerrada}
                                    onChange={e => this.setState({ indexCerrada: e.target.value })}
                                    type="number"
                                />


                                Index Cerrada Llave
                                <input
                                    className="form-control"
                                    value={indexCerradaLlave}
                                    onChange={e => this.setState({ indexCerradaLlave: e.target.value })}
                                    type="number"
                                />


                                Cantidad Items (Cofres)
                                <input
                                    className="form-control"
                                    value={cantItems}
                                    onChange={e => this.setState({ cantItems: e.target.value })}
                                    type="number"
                                />


                                Numero Items (Cofres)
                                <input
                                    className="form-control"
                                    value={nroItems}
                                    onChange={e => this.setState({ nroItems: e.target.value })}
                                    type="number"
                                />


                                Texto
                                <input
                                    className="form-control"
                                    value={texto}
                                    onChange={e => this.setState({ texto: e.target.value })}
                                    type="text"
                                />


                                Newbie (Item especial solo para Newbies)
                                <Checkbox
                                    checked={newbie}
                                    onChange={this.toggleNewbie}
                                />
                                <br/>

                                No Se Cae (Item no se pierde del inventario al morir)
                                <Checkbox
                                    checked={nosecae}
                                    onChange={this.toggleNoSeCae}
                                />
                                <br/>

                                vGrande (Carteles, Casas, Lapidas, Numero del Grafico al hacerle Click/Usar Aparece)
                                <input
                                    className="form-control"
                                    value={vGrande}
                                    onChange={e => this.setState({ vGrande: e.target.value })}
                                    type="number"
                                />


                                Radio (No se que es, pero es para Teleports!)
                                <input
                                    className="form-control"
                                    value={radio}
                                    onChange={e => this.setState({ radio: e.target.value })}
                                    type="number"
                                />

                            </div>
                        </div>
                    </div>
                </div>}


            </div>
        )
    }
}

export default UploadImage