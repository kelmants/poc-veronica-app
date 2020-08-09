import React from "react";
import "./styles.css";
export function LoginPages() {
  return (
    <main>
      <div className="container">
        <div className="row box">
          <div className="col-md-offset-5 col-md-4 col-xs-10 col-xs-offset-0 text-center">
            <h1 className="text-white">Varonica's consulting</h1>
            <div className="form-login">
              <br />
              <h4>Secure Login</h4>
              <br />
              <input
                type="text"
                id="userName"
                className="form-control input-sm chat-input"
                placeholder="username"
              />
              <br />
              <input
                type="text"
                id="userPassword"
                className="form-control input-sm chat-input"
                placeholder="password"
              />
              <br />
              <div className="wrapper">
                <span className="group-btn">
                  <a href="#/" className="btn btn-primary btn-md">
                    login <i className="fa fa-sign-in"></i>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </main>
  );
}
