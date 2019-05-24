import React from 'react';
import './Login.css';
import '../util/util.css';
import Clock from '../Date/Date';



class Login extends React.Component {
    render() {
        return <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-t-30 p-b-50">
                <span className="login100-form-title p-b-41">
					<Clock />
				</span>
                    <form className="login100-form validate-form p-b-33 p-t-5">
                        <div className="wrap-input100 validate-input" data-validate="Ingrese cédula">
                            <input className="input100" type="text" name="cedula" maxLength="10" autoComplete="off" placeholder="Número de identificación" />                        
                        </div>
                        <div className="container-login100-form-btn m-t-32">
                            <button className="login100-form-btn" onClick="" >
                                Aceptar
						    </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    }

}

export default Login;