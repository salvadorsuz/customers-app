import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import { Prompt } from 'react-router-dom';
import { setPropsAsInitial } from './../helpers/setPropsAsInitial';
import CustomerActions from '../components/CustomerActions';
import { MyField } from './MyField';

/*
const isRequired = value => (
    !value && "Este campo es requerido"
);
*/

const isNumber = value => (
    isNaN(Number(value)) && "El campo debe ser un numero"
);

const validate = values => {
    const error = {};

    if(!values.name) {
        error.name = "El campo nombre es requerido";
    }

    if(!values.dni) {
        error.dni = "El campo dni es requerido";
    }

    return error;
};

const toNumber = value => value && Number(value);
const toUpper = value => value && value.toUpperCase();
const toLower = value => value && value.toLowerCase();
const onlyGrow = (value, previousValue, values) => 
    value && (!previousValue ? value : (value > previousValue ? value : previousValue));

const CustomerEdit = ({
    name, dni, age, handleSubmit, submitting, onBack, pristine, submitSucceeded}) => {
    return (
        <div>
            <h2>Edicion del cliente</h2>
            <form onSubmit={handleSubmit}>
                <Field 
                    name="name" 
                    component={MyField}
                    label="Nombre"
                    parse={toUpper}
                    format={toLower} />

                <Field
                    name="dni" 
                    component={MyField}
                    validate={[isNumber]} 
                    label="Dni" />

                <Field 
                    name="age" 
                    component={MyField} 
                    type="number"
                    label="Edad"
                    validate={[isNumber]} 
                    parse={toNumber}
                    normalize={onlyGrow} />

                <CustomerActions>
                    <button type="submit" disabled={pristine || submitting}>Aceptar</button>
                    <button type="button" disabled={submitting} onClick={onBack}>Cancelar</button>
                </CustomerActions>

                <Prompt when={!pristine && !submitSucceeded} 
                    message='Se perderan los datos si continua' />
            </form>
        </div>
    );
};

CustomerEdit.propTypes = {
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number,
    onBack: PropTypes.func.isRequired,
};

const CustomerEditForm = reduxForm({ 
    form: 'CustomerEdit',
    validate
})(CustomerEdit);

export default setPropsAsInitial(CustomerEditForm);