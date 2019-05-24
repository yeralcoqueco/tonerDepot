import React from 'react';
import firebase from 'firebase';

class LoginGoogle extends React.Component{

    constructor(){
        super();

        //Estado de la clase
        this.state = {
            user : null
        }

        //Identificación métodos de la clase
        this.handleAuth = this.handleAuth.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    //Ciclo de vida
    componentDidMount(){
        //Escuchar cambios en Firebase
        firebase.auth().onAuthStateChanged(user => {
            //modificar el estado
            this.setState({
                //si clave  y valor son iguales solo se escribe una vez la clave
                user : user
            });
        });
    }

    //Autenticación con Google - Iniciar sesión
    handleAuth(){
        const provider = new firebase.auth.GoogleAuthProvider();

        //conectar con firebase auth
        firebase.auth().signInWithPopup(provider)
            //sí es true retorna algo
            .then(result => console.log(`${result.user.email} ha iniciado sesión`))
            //sí es false muestra el error
            .catch(error => console.log(`Error ${error.code} : ${error.message}`));
    }

    //Cerrar sesión
    handleLogout() {
        firebase.auth().signOut()
            //sí es true retorna algo
            .then(result => console.log(`${result.user.email} ha cerrado sesión`))
            //sí es false muestra el error
            .catch(error => console.log(`Error ${error.code} : ${error.message}`));
    }

    //Crear método botón salir
    renderLogoutButton(){
        //sí inició sesión
        if(this.state.user){
            //retorna el botón de cerrar sesion
            return <div>
                <img width="50%" src={this.state.user.photoURL} alt="" ></img>
                <br/>
                <span>{this.state.user.displayName}</span>
                <button onClick={this.handleLogout}>Salir</button>
            </div>
        }
        else{
            //retorna el botón iniciar sesion
            return <div>
                <button onClick={this.handleAuth}>Ingresar con Google</button>
            </div>}

    }

    render(){
        return <div> 
            {this.renderLogoutButton()}
        </div> ;
    }

}

export default LoginGoogle;