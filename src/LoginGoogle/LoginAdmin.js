import React from 'react';
import firebase from 'firebase';
import SubirArchivo from '../SubirArchivo/SubirArchivo';
import './PicturesStyle.css';
import './Navbar.css';

class Login extends React.Component {

    constructor() {
        super();
        //estado del componente
        this.state = {
            user: null,
            pictures: []
        };

        //Todas las unciones que usan .this, le estamos indicando la referencia del objeto (enlazar)
        this.handleAuth = this.handleAuth.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

    }

    //Metodo de ciclo de vida - dispararse una vez el componente ha sido renderizado en el DOM
    componentWillMount() {
        //Acceder a la API de funcionalidades de auth.   Méotodo OnAuthState- devuelve un objeto user
        firebase.auth().onAuthStateChanged(user => {
            //modificar el estado
            this.setState({
                //si clave  y valor son iguales solo se escribe una vez la clave
                user: user
            });
        });

        //Enviar información a la bd 
        firebase.database().ref('pictures').on('child_added', snapshot => {
            this.setState({
                pictures: this.state.pictures.concat(snapshot.val())
            });
        });
    }

    //controlador autenticacion
    handleAuth() {
        //Crear un proveedor de Google
        const provider = new firebase.auth.GoogleAuthProvider();

        //conectar con firebase auth
        //sign in -> devuelve una promesa y se resuelve con .then y .catch
        firebase.auth().signInWithPopup(provider)
            //Template Script. Intercalar texto con ES6
            .then(result => console.log(`${result.user.email} ha iniciado sesión`))
            //controlar el error
            .catch(error => console.log(`Error ${error.code} : ${error.message}`));
    }

    handleLogout() {
        firebase.auth().signOut()
            .then(result => console.log(`${result.user.email} ha cerrado sesión`))
            .catch(error => console.log(`Error ${error.code} : ${error.message}`));
    }

    handleUpload(event) {
        console.log("click");
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
        const task = storageRef.put(file);

        task.on('state_changed', snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + percentage + '% done');
            this.setState({
                uploadValue: percentage
            })
        }, error => {
            console.log(error.message);
        }, () => storageRef.getDownloadURL().then(url => {
            const record = {
                photoURL: this.state.user.photoURL,
                displayName: this.state.user.displayName,
                image: url
            };

            const dbRef = firebase.database().ref('pictures');
            const newPicture = dbRef.push();
            newPicture.set(record);
        }));
    }

    renderLoginButton() {
        //Sí el usuario está logueado
        // Sí this.state.user es distinto de null
        if (this.state.user) {
            return (
                <div>
                    <ul>
                        <li>Bienvenido a nuestra página</li>
                        <li><img width="5%" src={this.state.user.photoURL} alt={this.state.user.displayName}></img>{this.state.user.displayName} </li>
                        <li><button onClick={this.handleLogout}>CLOSE</button></li>
                    </ul>
                    {/*<img width="30%" src={this.state.user.photoURL} alt={this.state.user.displayName}></img>
                    <p>Bienvenido {this.state.user.displayName}</p>
                    <button onClick={this.handleLogout}>Salir</button>*/}
                    <hr /> 
                    <SubirArchivo onUpload={this.handleUpload} uploadValue={this.state.uploadValue} />
                    <hr />
                    <div className="box">
                        {this.state.pictures.map(picture => (

                            <div className="card">
                                <div className="imgBx">
                                    <img src={picture.image} alt="" />
                                </div>
                                <div className="details">
                                    <img width="10%" src={picture.photoURL} alt={picture.displayName} ></img>
                                    <span>{picture.displayName}</span>
                                </div>
                            </div>

                        )).reverse()
                        }
                    </div>
                </div>
            )
        } else {
            //Sí no lo está
            return (
                <ul>
                    <li>
                    <button onClick={this.handleAuth}>Login con Google</button>
                    </li>
                </ul>
            )
        }

    }

    render() {
        return (
            <div>
                {this.renderLoginButton()}
            </div>
        );
    }
}

export default Login;