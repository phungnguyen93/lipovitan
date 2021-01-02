export const validateJobContractCreate = (form) => {
    const errors = [];

    if (form.name.en === '') {
        errors.push('The name field [EN] must be required!');
    }

    if (form.name.vi === '') {
        errors.push('The name field [VI] must be required!');
    }

    return errors;
};

export const validateJobContractEdit = (form) => {
    const errors = [];

    console.log(form.name.vi, form.name.vi === '');
    if (form.name.en === '') {
        errors.push('The name field [EN] must be required!');
    }

    if (form.name.vi === '') {
        errors.push('The name field [VI] must be required!');
    }

    return errors;
};