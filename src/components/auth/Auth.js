import React, {Component, Fragment} from 'react';
import FB from 'react-facebook-login';

export default class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn : false,
            userID: '',
            name:'',
            email: '',
            picture: '',
        }
    }

    defaultState = () => {
        this.setState({
            isLoggedIn : false,
            userID: '',
            name:'',
            email: '',
            picture: '',
        })
    }

    logOut = () => {
        console.log('log out')
        localStorage.clear()
        this.defaultState()
    }

    componentClicked = () => {
        console.log('clicked')
    }

    responseFacebook = response => {
        console.log('response: ', response)
        // move state to redux and refactor content on dashboard to be protected with HOC Auth components

        this.setState({
            isLoggedIn : true,
            userID: response.id,
            name:response.name,
            email: response.email,
            picture: response.picture.data.url,
        })
    }
    render() {
        let fbContent;
        if(this.state.isLoggedIn) {
            fbContent = (
            <div>
                <img src={this.state.picture} alt={this.state.name}/>
                <h2>Welcome {this.state.name}</h2>
                <p>Email: {this.state.email}</p>
                <input onClick={this.logOut} type="button" value="log out"/>
            </div>
            )
        } else {
            fbContent = (
                <FB
                appId="880585172132004"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />
            )
        }

        return(
            <Fragment>
                <h1>Dash Hello</h1>
                <p>below is the FB stuff / check the console too</p>
                {fbContent}
            </Fragment>
        )
    }

}