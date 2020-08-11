import React from 'react';

export function Aurora({ name = 'Usuario' }) {
  return (
    <div className="container">
      <h1>Hola {name}</h1>
      <span>This is Auroras's template</span>
    </div>
  );
}
