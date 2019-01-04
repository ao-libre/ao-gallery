import React, { Component } from 'react'
import LinkList from './components/LinkList'
import CreateLink from './components/CreateLink'
import UploadImage from './components/UploadImage'
import Header from './components/Header'
import Login from './components/Login'
import Search from './components/Search'
import { Switch, Route, Redirect } from 'react-router-dom'
import ImagesList from "./components/ImageList"
// import Cloudinary from 'cloudinary-react'
//
//
// Cloudinary.config({
//     cloud_name: 'dlecejpdr',
//     api_key: '314236643746361',
//     api_secret: '3-R_nnhePpvhhIFY4cgheeZqeIw'
// });

class App extends Component {
  render() {
    return (
        <div className="center w85">
          <Header />
          <div className="ph3 pv1 background-gray">
            <Switch>
              <Route exact path='/' render={() => <Redirect to='/gallery/1' />} />
              <Route exact path="/uploadimage" component={UploadImage} />
              <Route exact path="/create" component={CreateLink} />
              <Route exact path="/login" component={Login} />
              <Route exact path='/search' component={Search} />
              <Route exact path='/top' component={LinkList} />
              <Route exact path='/new/:page' component={LinkList} />
              <Route exact path='/gallery/:page' component={ImagesList} />
            </Switch>
          </div>
        </div>
    )
  }
}

export default App
