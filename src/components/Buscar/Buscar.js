import React, { useState } from 'react';
import styled from 'styled-components';

const StyledBuscar = styled.section`
  position: relative;
  padding: 25px 15px;
  text-align: center;
`;

const Icono = styled.i`
  font-size: 1.4em;
  color: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 40px;
  right: 40px;
  cursor: pointer;
`;

const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
  width: 95%;
  font-size: 0.9em;
  padding: 15px 25px;
  border: 0;
  border-radius: 25px;

  &:focus {
    outline: none;
    border: 0;
    box-shadow: 0px 0px 7px rgba(214, 214, 214, 0.925);
  }
`;

const Boton = styled.button`
  border: none;
  margin: 0;
  padding: 0;
`;

const Buscar = props => {
  const [busqueda, setBusqueda] = useState('');
  
  const editarBusqueda = e => {
    setBusqueda(e.target.value);
  }

  const enviarBusqueda = e => {
    e.preventDefault();
    props.buscar(busqueda);
  }

  return (
    <StyledBuscar>
      <form onSubmit={enviarBusqueda}>
        <Boton><Icono className="fas fa-search"/></Boton>
        <Input onChange={editarBusqueda} value={busqueda} autoFocus={true} placeholder="Ingrese una ciudad"/>
      </form>
      
    </StyledBuscar>
  );
}

export default Buscar;