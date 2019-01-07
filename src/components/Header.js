import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN, REDDIT_URL, DISCORD_URL } from '../constants'

class Header extends Component {
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)

        return (
            <header className="nk-header nk-header-opaque">

                <div className="nk-contacts-top">
                    <div className="container">
                        <div className="nk-contacts-left">
                            <div className="nk-navbar">
                                <ul className="nk-nav">
                                    <li><a href={REDDIT_URL}>Foro</a></li>
                                    <li><a href={DISCORD_URL}>Chat</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="nk-contacts-right">
                            <div className="nk-navbar">
                                <ul className="nk-nav">
                                    <li><a href="https://twitter.com/AOLibre" target="_blank"><span className="ion-social-twitter"></span></a></li>
                                    <li><a href="https://www.facebook.com/argentumoficial/" target="_blank"><span className="ion-social-facebook"></span></a></li>
                                    <li><a href="https://www.instagram.com/argentumonlinelibre/" target="_blank"><span className="ion-social-instagram-outline"></span></a></li>
                                    <li><a href="https://github.com/ao-libre" target="_blank"><span className="ion-social-github"></span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="nk-navbar nk-navbar-top nk-navbar-sticky nk-navbar-autohide">
                    <div className="container">
                        <div className="nk-nav-table">

                            <Link to="/" className="nk-nav-logo">
                                <img src="/assets/images/logo.png" alt="" width="90"/>
                            </Link>


                            <ul className="nk-nav nk-nav-right d-lg-block" data-nav-mobile="#nk-nav-mobile">
                                <Link to="/"> Home </Link> |
                                {/*<Link to="/gallery/1"> Galeria </Link> |*/}
                                <Link to="/searchimages"> Buscar </Link> |
                                <Link to="/top"> Top Graficos </Link> |

                                {authToken && (
                                    <Link to="/uploadimage"> Subir Grafico </Link>
                                )}

                                {authToken ? (
                                    <a
                                        onClick={() => {
                                            localStorage.removeItem(AUTH_TOKEN)
                                            this.props.history.push(`/`)
                                        }}
                                    >
                                        | Salir
                                    </a>
                                ) : (
                                    <Link to="/login"> Login</Link>
                                )}

                            </ul>

                        </div>
                    </div>
                </nav>

            </header>
        )
    }

}

export default withRouter(Header)