import React from "react";

export const Header = ({ name = "%{{Nombre}}" }) => {
  return (
    <header className="masthead text-center text-white">
      <div className="masthead-content">
        <div className="container">
          <h1 className="masthead-heading mb-0">Hola {name}</h1>
          <h2 className="masthead-subheading mb-0">
            Desde consulting te que remos hacer llegar esta propuesta para
            vos!!!
          </h2>
          <a href="#/" className="btn btn-primary btn-xl rounded-pill mt-5">
            Ver más
          </a>
        </div>
      </div>
      <div className="bg-circle-1 bg-circle"></div>
      <div className="bg-circle-2 bg-circle"></div>
      <div className="bg-circle-3 bg-circle"></div>
      <div className="bg-circle-4 bg-circle"></div>
    </header>
  );
};
