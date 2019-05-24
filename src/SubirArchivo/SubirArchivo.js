import React from 'react';
import firebase from 'firebase';

class SubirArchivo extends React.Component {

    constructor() {
        super();
        this.state = {
            uploadValue: 0,
            //picture: null
        };

        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(event) {
        //constante para almacenar el archivo
        const file = event.target.files[0];
        //Conexion con la ruta para guardar los archivos
        const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
        //subir el archivo .put
        const task = storageRef.put(file);

        //cuando el estado cambie task hará
        task.on('state_changed', snapshot => { 
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + percentage + '% done');
            this.setState({
                //actualizar el porcentaje
                uploadValue: percentage
            })
        }, error => {
            console.log(error.message);
        }, () => {
            storageRef.getDownloadURL().then(url => {
                this.setState({
                    //Actualizar el estado de picture
                    picture: url
                });
            })
        });
    }

    render() {
        return (
            <div>
                <h3>SUBIR ARCHIVOS</h3>
                <br />
                <progress value={this.props.uploadValue} max="100"></progress>
                <br />
                <input type="file" onChange={this.props.onUpload}></input>
                <br />
                {/* <img width="320" src={this.state.picture} alt="" /> */}
            </div>
        )
    }

}

export default SubirArchivo;