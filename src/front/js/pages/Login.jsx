import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
//import db, {Users} from "../../../api/models.py"
import { Context } from "../store/appContext.js";
const Login = () => {

  
  const {store, actions} = useContext(Context);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { email, password };
    console.log("los datos que se mandan:", dataToSend);

    const url = `${process.env.BACKEND_URL}/api/login`;
    const options = {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    console.log("la url y la options:",url, options)
    const response = await fetch(url, options);
    console.log(response)
    if (!response.ok) {
      console.log('Error fatalisima: ', response.status, response.statusText)
      return
    }
    const data = await response.json();
    console.log(data);
    // Aquí comienza nuestra lógica
    const user = JSON.stringify(data.results)
    localStorage.setItem('token', data.access_token)
    localStorage.setItem('user', user)
    actions.setIsLogin(true)
    actions.setCurrentUser(user)
    // console.log(data.access_token);
    navigate('/')
  };

  return (
    <div className=" vh-100 bg-primary">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="title text-light text-center pb-3">Log into your account</h1>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3 h6">
                  <label htmlFor="email" className="mb-1 body">
                    Your email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="form-group mt-3 h6">
                  <label htmlFor="password" className="mb-1 body">
                    Your password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary mt-3 title">
                    LOG IN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;