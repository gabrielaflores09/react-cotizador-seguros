import React, {useState} from 'react';
import styled from '@emotion/styled';
import {obtenerDiferenciaYear, calcularMarca, obtenerPlan} from '../helper';
import PropTypes from 'prop-types';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label= styled.label`
    flex: 0 0 100px;
`;

const Select =  styled.select`
    display: block;
    width: 100%;
    padding: 0.4rem;
    border: 1px solid #e1e1e1;
    /* -webkit-appearance: none; */
`;

const InputRadio = styled.input`
    margin: 0 1rem;

`;

const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 0.8rem;
    color: #FFF;
    text-transform: uppercase;
    /* font-weight: bold; */
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s ease;
    margin-top: 1.5rem;

    &:hover {
        background-color: #009BA9;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: #f8d7da;
    color: #721c24;
    border-color: #f5c6cb;
    padding:0.5rem;
    margin-bottom: 20px;
    text-align:center;
    width:100%;
`;

const Formulario = ({guardarResumen, guardarCargando}) => {

    const [datos, guardarDatos]= useState({
        marca:'',
        year:'',
        plan:''
    });
    const [error, guardarError]= useState(false);

    // Extraigo los valores del state
    const {marca, year, plan} = datos;

    // Leer datos del form y colocarlos en el state
    const obtenerInf = e => {
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }
    // Cuando el usuariop presiona submit
    const cotizarSeguro = e =>{
        e.preventDefault();

        if(marca.trim()==='' || year.trim()==='' || plan.trim()===''){
            guardarError(true);
            return;
        }
        guardarError(false);

        // Defino una base de 2000
        let resultado = 2000;

        // Obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(year);

        // Por cada año hay que restar el 3%
        resultado -=((diferencia*3)*resultado)/100

        // Americano (15%) - Asiatico (5%) - Europeo (30%)      
        resultado = calcularMarca(marca)*resultado;

        // Basico aumenta 20% - Completo aumenta 50%
        const incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat(incrementoPlan*resultado).toFixed(2);

        guardarCargando(true);
        setTimeout(() => {
            // Saco spinner
            guardarCargando(false);
            // Paso info al comp. ppal
            guardarResumen({
                cotizacion: Number(resultado),
                datos
            });
        }, 1000)
    }

    return ( 
        <form onSubmit={cotizarSeguro}>
            {error? <Error>Todos los campos son obligatorios</Error> : null}
            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInf}
                >
                    <option value="">Seleccione...</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInf}
                >
                    <option value="">Seleccione...</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={obtenerInf}
                />Basico

                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={obtenerInf}
                />Completo
            </Campo>

            <Boton type="submit">Cotizar</Boton>
        </form>
     );
}
Formulario.propTypes = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}
 
export default Formulario;