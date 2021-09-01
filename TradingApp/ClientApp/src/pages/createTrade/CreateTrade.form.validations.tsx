import * as Yup from 'yup';

export const TradeFormValidations = Yup.object().shape({
    securityCode: Yup.string()
        .matches(/^[A-Z]{3}$/, "3 Upper alphas")
        .required('Required'),
    sequenceNumberLength: Yup.number()
        .required("Required"),
    sequenceNumber: Yup.string()
        .required('Required'),
    price: Yup.number()
        .required('Required'),
    date: Yup.date()
        .required('Required')
});
