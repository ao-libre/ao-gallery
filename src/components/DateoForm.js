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



class DateoForm extends Component {


}

export default DateoForm