import React, { useState } from 'react'

const types = {
    email: {
        regex: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/,
        message: 'Preencha um email válido'
    },
    password: {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
        message: 'A senha deve conter 1 carecter maíusculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres.'
    },
    number: {
        regex: /^\d+$/,
        message: 'Utilize apenas números'
    }
}

const useForm = (type) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(null)

    function onChange({target}) {
        if(error) validate(target.value);
        setValue(target.value);
    }

    function validate(value) {
        if (type === false) return true;
        if (value.length === 0) {
            setError('Preencha um valor');
            return false;
        } else if (types[type] && !types[type].regex.test(value)) {
            setError(types[type].message);
            return false;
        } else {
            setError(null)
            return true;
        }

    }

    return {
        value,
        setValue,
        onChange,
        error,
        validate: () => validate(value),
        onBlur: () => validate(value)
    }
}

export default useForm
