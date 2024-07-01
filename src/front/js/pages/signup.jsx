import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";


const Signup = () => {
    
  const { actions } = useContext(Context)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = { email, password };
    const url = `${process.env.BACKEND_URL}/api/signup`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    };
    const response = await fetch(url, options)
    console.log(response)
    if (!response.ok) {
      console.log('Error: ', response.status, response.statusText)
      return
    }
    const data = await response.json()
    // Aquí comienza nuestra lógica
    localStorage.setItem('token', data.access_token)
    actions.setIsLogin(true)
    // console.log(data.access_token);
    navigate('/home')
    
  };

  return (
    <div className="vh-100 bg-primary">
      <div className="row justify-content-center">
        <div className="col-md-6">
        <h1 className="title text-light text-center pb-3">Create account</h1>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3 h6 body">
                  <label htmlFor="email" className="mb-1">
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
                <div className="form-group mt-3 h6 body">
                  <label htmlFor="password" className="mb-1">
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
                    SIGN UP
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

export default Signup;