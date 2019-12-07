import React from 'react';
import styled from 'styled-components';
import {
  ClearDay,
  ClearNight,
  CloudsDay,
  CloudsNight,
  Drizzle,
  Rain,
  Snow,
  Thunderstorm,
  Other
} from '../../assets/svgClima';
import Cargando from '../UI/Cargando';

const StyledClima = styled.main`
  position: relative;
  height: 60vh;
  width: 100%;
`;

const Contenido = styled.div`
  color: #FFF;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);

  strong {
    font-size: 1.2em;
  }
`;

const Imagen = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
`;

const Fecha = styled.span`
  font-size: 0.8em;
  margin: 0;
`;

const Temperatura = styled.span`
  font-size: 5em;
`;

const Logotipo = styled.img`
  width: 50%;
  animation: spin 10s linear infinite;

  @keyframes spin { 
    100% { 
      transform: rotate(360deg); transform:rotate(360deg); 
    } 
  }
`;

const Detalles = styled.div`
  text-align: left;
  font-size: 0.9em;
  position: absolute;
`;

const hora = new Date().getHours();

const svg = {
  Clear: hora > 6 && hora < 21 ? ClearDay : ClearNight,
  Clouds: hora > 6 && hora < 21 ? CloudsDay : CloudsNight,
  Drizzle: Drizzle,
  Rain: Rain,
  Snow: Snow,
  Thunderstorm: Thunderstorm
}

const Clima = props => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const fechaActual = props.fecha.toLocaleDateString('es-ES', options);

  return (
    <StyledClima>
      <Contenido>
        {
          props.error ? props.error :
            props.cargando ? <Cargando/> :
              props.data ?
              <>
                <Detalles>
                  
                </Detalles>
                <Imagen src={svg[props.data.weather[0].main] ? svg[props.data.weather[0].main] : Other} />
                <Temperatura>{Math.round(props.data.main.temp)}°</Temperatura><br/>
                <strong>{props.data.name}</strong><br/>
                {props.data.main.humidity}% de humedad<br/><br/>
                <Fecha>
                  {fechaActual}<br/>
                </Fecha>
              </>
              : 
              <>
                <Logotipo src={ClearDay} />
              </>
        }
      </Contenido>
    </StyledClima>
  );
}

export default Clima;