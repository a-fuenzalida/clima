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
  Thunderstorm
} from '../../assets/svgClima';

const StyledPronostico = styled.section`
  text-align: center;
  font-size: 0.7em;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 10px;
`;

const Pronosticos = styled.div`
  padding: 0 3px;
  position: relative;
  margin-top: 5px;
  margin-bottom: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Elemento = styled.div`
  color: white;
  font-size: 1.1em;
  text-align: center;
  width: 14%;
  max-width: 14%;
  padding: 4px 8px;
  background-image: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  border-radius: 5px;
  cursor: pointer;
`;

const Imagen = styled.img`
  width: 80%;
  margin-top: 10px;
`;

const tipoClima = (clima, hora) => {
  const imagenes = {
    Clear: hora > 6 && hora < 21 ? ClearDay : ClearNight,
    Clouds: hora > 6 && hora < 21 ? CloudsDay : CloudsNight,
    Drizzle: Drizzle,
    Rain: Rain,
    Snow: Snow,
    Thunderstorm: Thunderstorm
  }

  return imagenes[clima];
}

const Pronostico = props => {
  const data = props.data ? props.data.splice(0, 5) : null;
  
  return (
    <StyledPronostico>
      Pronóstico para las próximas horas
      <Pronosticos>
        {
          data.map((d, i) => {
            const fechaPronostico = new Date(d.dt_txt);
            const diaPronostico = fechaPronostico.getDay() + 1;
            const horaPronostico = `0${fechaPronostico.getHours()}`.slice(-2);
            const minutosPronostico = `0${fechaPronostico.getMinutes()}`.slice(-2);
            return (
            <Elemento key={i}>
              { props.fecha.getDay() + 1 === diaPronostico ? "Hoy" : "Mañana" }<br/>
              { horaPronostico }:{ minutosPronostico }<br/>
              <strong>{ Math.round(d.main.temp) }°</strong><br/>
              <Imagen src={tipoClima(d.weather[0].main, horaPronostico)} />
            </Elemento>
            );
          })
        }
        
      </Pronosticos>
    </StyledPronostico>
  );
}

export default Pronostico;