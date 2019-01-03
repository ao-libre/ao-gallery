import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { IMAGES_LIST_QUERY } from './ImageList'
import { IMAGES_PER_PAGE } from '../constants'

const IMAGE_MUTATION = gql`
    mutation ImageMutation($name: String!, $description: String!, $origin: String!, $url: String!) {
        uploadImage(name: $name, description: $description, origin: $origin, url: $url) {
            id
            name
            createdAt
            origin
            url
            description
        }
    }
`

class UploadImage extends Component {
    state = {
        name: '',
        description: '',
        origin: '',
        url: 'https://images-ext-1.discordapp.net/external/AnZ_BMquJnDopoHTL73MlvRJZSafnmUElJcUQirZl_A/https/cdn.discordapp.com/attachments/524822813757014038/524823005545758730/48375809_540916259757526_7276890577679941632_n.png'
    };

    render() {
        const { name, description, origin, url } = this.state
        return (
            <div>
                <div className="flex flex-column mt3">
                    <input
                        className="mb2"
                        value={name}
                        onChange={e => this.setState({ name: e.target.value })}
                        type="text"
                        placeholder="Nombre"
                    />
                    <input
                        className="mb2"
                        value={description}
                        onChange={e => this.setState({ description: e.target.value })}
                        type="text"
                        placeholder="Descripcion"
                    />
                    <input
                        className="mb2"
                        value={origin}
                        onChange={e => this.setState({ origin: e.target.value })}
                        type="text"
                        placeholder="Servidor en el cual fue creado el grafico"
                    />
                    <input
                        className="mb2"
                        value={url}
                        onChange={e => this.setState({ url: e.target.value })}
                        type="text"
                        placeholder="URL"
                    />
                </div>

                <Mutation
                    mutation={IMAGE_MUTATION}
                    variables={{ name, description, origin, url }}
                    onCompleted={() => this.props.history.push('/gallery/1')}
                    update={(store, { data: { uploadImage } }) => {
                        const first = IMAGES_PER_PAGE;
                        const skip = 0;
                        const orderBy = 'createdAt_DESC';
                        const data = store.readQuery({
                            query: IMAGES_LIST_QUERY,
                            variables: { first, skip, orderBy }
                        });
                        // console.log(123, uploadImage);
                        data.imageList.images.unshift(uploadImage);
                        store.writeQuery({
                            query: IMAGES_LIST_QUERY,
                            data,
                            variables: { first, skip, orderBy }
                        });
                    }}
                >
                    {imageMutation => <button onClick={imageMutation}>Submit</button>}
                </Mutation>

            </div>
        )
    }
}

export default UploadImage
