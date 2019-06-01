// Añadimos React & nuestro archivo de configuración
import React, { Component } from 'react';
import firebase from 'firebase';

class Solicitudes extends Component {

    // inicializamos nuestro estado inicial
    constructor() {
        super();
        this.state = {
            solicitud: [],
            alerta: false,
            alertData: {}
        }
    }

    // Mostrar una alerta cuando se envia el formulario
    showAlert(tipo, mensaje) {
        this.setState({
            alerta: true,
            alertData: { tipo, mensaje }
        });
        setTimeout(() => {
            this.setState({ alerta: false });
        }, 4000)
    }

    // Con esta funcion borramos todos los elementos del formulario
    resetForm() {
        this.refs.contactForm.reset();
    }

    componentWillMount() {
        let formRef = firebase.database().ref('solicitud').orderByKey().limitToLast(6);
        formRef.on('child_added', snapshot => {
            const { fecha, nombre, tipo, observacion } = snapshot.val();
            const data = { fecha, nombre, tipo, observacion };
            this.setState({ solicitud: [data].concat(this.state.solicitud) });
        })
    }

    // Funcion para enviar la informacion del formulario a Firebase Database
    insertarInfo(e) {
        // Detiene la acción predeterminada del elemento
        e.preventDefault();

        // Creamos un objeto con los valores obtenidos de los inputs
        const params = {
            fecha: new Date().toLocaleDateString(),
            nombre: this.inputNombre.value,
            tipo: this.inputTipo.value,
            observacion: this.textAreaObservacion.value
        };

        // Validamos que no se encuentren vacios los principales elementos de nuestro formulario
        if (params.nombre && params.observacion && params.tipo) {
            // enviamos nuestro objeto "params" a firebase database
            firebase.database().ref('solicitud').push(params).then(() => {
                // Si todo es correcto, actualizamos nuestro estado para mostrar una alerta.
                this.showAlert('success', 'Solicitud exitosa');
            }).catch(() => {
                // Si ha ocurrido un error, actualizamos nuestro estado para mostrar el error 
                this.showAlert('danger', 'La solicitud ha presentado un fallo');
            });
            // limpiamos nuestro formulario llamando la funcion resetform
            this.resetForm();
        } else {
            // En caso de no llenar los elementos necesario despliega un mensaje de alerta
            this.showAlert('warning', 'Por favor, llene todos los campos');
        };
    }

    render() {
        return (
            <div>
                <div className='container' style={{ padding: `40px 0px` }}>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <h2>Formulario de solicitudes</h2>
                            <form onSubmit={this.insertarInfo.bind(this)} ref='contactForm' >
                                <div className='form-group'>
                                    <label htmlFor='nombre'>Nombre</label>
                                    <input type='text' className='form-control' id='nombre'
                                        placeholder='Nombre' ref={nombre => this.inputNombre = nombre}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='tipo'>Tipo de solicitud</label>
                                    <select className='form-control' id='tipo' ref={tipo => this.inputTipo = tipo}>
                                        <option value='Permiso'>Permiso</option>
                                        <option value='Incapacidad'>Incapacidad</option>
                                        <option value='Licencia'>Licencia</option>
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='observacion'>Observación</label>
                                    <textarea className='form-control' id='observacion'
                                        rows='3' ref={observacion => this.textAreaObservacion = observacion}>
                                    </textarea>
                                </div>
                                <button type='submit' className='btn btn-primary'>Agregar</button>
                            </form>
                        </div>
                        <div className='col-sm-8'>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Tipo</th>
                                        <th scope="col">Observación</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.solicitud.map(solicitud =>
                                        <tr>
                                            <td>{solicitud.fecha}</td>
                                            <td>{solicitud.nombre}</td>
                                            <td>{solicitud.tipo}</td>
                                            <td>{solicitud.observacion}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {this.state.alerta && <div className={`alert alert-${this.state.alertData.tipo}`} role='alert'>
                    <div className='container'>
                        {this.state.alertData.mensaje}
                    </div>
                </div>}

            </div>

        );
    }
}

export default Solicitudes;