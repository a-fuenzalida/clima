import React, { useState } from 'react';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';
import Buscar from '../components/Buscar/Buscar';
import Clima from '../components/Clima/Clima';
import Pronostico from '../components/Pronostico/Pronostico';

const gradientes = {
  calor: `linear-gradient(to bottom, #f7b733, #fc4a1a)`,
  normal: `linear-gradient(to bottom, #fdbb2d, #22c1c3)`,
  fresco: `linear-gradient(to bottom, #6dd5ed, #2193b0)`,
  frio: `linear-gradient(to bottom, #d7dde8, #757f9a)`
}

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 500px;
    background: ${props => props.clima ? props.clima > 25 ? gradientes.calor : props.clima > 19 && props.clima <= 25 ? gradientes.normal : props.clima > 14 && props.clima <= 19 ? gradientes.fresco : props.clima <= 14 ? gradientes.frio : `#12c2e9` : `#12c2e9`};
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    font-family: 'Roboto', sans-serif;
  }
`;

const App = () => {
  const [fecha, setFecha] = useState(new Date());
  const [climaActual, setClimaActual] = useState(null);
  const [pronostico, setPronostico] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const obtenerClima = ciudad => {
    setCargando(true);
    // Obtenemos el clima actual de la ciudad
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=39c2a9360995f8ac660c3f1171870df9`)
    .then(response => {
      setClimaActual(response.data);
      setError(null);
      setCargando(false);

      // Obtenemos el pronóstico para las próximas horas de la ciudad
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&units=metric&cnt=5&appid=39c2a9360995f8ac660c3f1171870df9`)
      .then(response => {
        setPronostico(response.data.list);
      })
      .catch(error => {
        setPronostico(null);
      });
    })
    .catch(error => {
      if (error.response.status === 404) {
        setError(<p>No se obtuvieron resultados. <br/>Intente con otra ciudad.</p>);
      }
      setClimaActual(null);
      setPronostico(null);
      setCargando(false);
    });

    setFecha(new Date());
  }

  return (
    <>
      <GlobalStyle clima={climaActual ? climaActual.main.temp : null}/>
      <Buscar buscar={obtenerClima}/>
      <Clima data={climaActual} fecha={fecha} error={error} cargando={cargando}/>
      {
        pronostico ? <Pronostico data={pronostico} fecha={fecha} /> : null
      }
    </>
  );
}

export default App;