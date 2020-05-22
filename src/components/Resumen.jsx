import React,{Fragment} from 'react';
import styled from '@emotion/styled';
import {primerMayuscula} from '../helper';
import PropTypes from 'prop-types';

const ContenedorResumen = styled.div`
    padding: 0.1rem 0.5rem 1.5rem 0.5rem;
    text-align: center;
    background-color: #009BA9;
    color: #FFF;
    margin-top: 1rem;
`;
const Resumen = ({datos, cargando}) => {

    // Extraer de datos
    const {marca, year, plan}= datos;

    if(marca==='' || year==='' || plan===''){
        return null;
    }

    return ( 
        <Fragment>
        { !cargando? (
            <ContenedorResumen>
            <h2>Resumen de Cotizacion</h2>
            <ul>
                <li>Marca: {primerMayuscula(marca)}</li>
                <li>Plan: {primerMayuscula(plan)}</li>
                <li>Año del auto: {year}</li>
            </ul>
            </ContenedorResumen>) : null}
        </Fragment>
     );
}

Resumen.propTypes = {
    datos : PropTypes.object.isRequired
}
 
export default Resumen;