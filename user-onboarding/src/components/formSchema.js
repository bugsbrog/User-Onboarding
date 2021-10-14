import * as yup from 'yup';

const formSchema = yup.object().shape({
    first_name: yup
        .string()
        .trim()
        .required('First name is required!')
        .min(3, 'First name must be 3 or more characters long!'),
    last_name: yup
        .string()
        .trim()
        .required('Last name is required!')
        .min(3, 'Last name must be 3 or more characters long!'),
    email: yup
        .string()
        .email('Must be a valid email address!')
        .required('Email is required!'),
    password: yup
        .string()
        .trim()
        .required('Password is required!'),
    serviceTerms: yup
        .string()
})

export default formSchema;
