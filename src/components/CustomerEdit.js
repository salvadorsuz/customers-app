import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import { setPropsAsInitial } from './../helpers/setPropsAsInitial';
import CustomerActions from '../components/CustomerActions';

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

const MyField = ({input, meta, type, label, name}) => (
    <div>
        <label htmlFor={name}>{label}</label>
        <input {...input} type={!type ? "text" : type}/>
        {
            meta.touched && meta.error && <span>{meta.error}</span>
        }
    </div>
);

const toNumber = value => value && Number(value);
const toUpper = value => value && value.toUpperCase();
const toLower = value => value && value.toLowerCase();
const onlyGrow = (value, previousValue, values) => value && previousValue && (value > previousValue ? value : previousValue);

const CustomerEdit = ({name, dni, age, handleSubmit, submitting, onBack}) => {
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
                    <button type="submit" disabled={submitting}>Aceptar</button>
                    <button type="button" onClick={onBack}>Cancelar</button>
                </CustomerActions>
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