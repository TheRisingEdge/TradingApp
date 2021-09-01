import React from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from 'yup';

export type FormValues = {
    securityCode: string,
    sequenceNumberLength: number,
    sequenceNumber: string,
    price: number,
    date: Date
}

const initialFormValues: FormValues = {
    securityCode: "",
    sequenceNumberLength: 0,
    sequenceNumber: "",
    price: 10,
    date: new Date()
};

const validationSchema = Yup.object().shape({
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

export type CreateTradeFormProps = {
    onSubmit: (v: FormValues) => Promise<any>;
};

export function CreateTradeForm(props: CreateTradeFormProps) {
    const onFormikSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        props.onSubmit(values)
            .then(() => setSubmitting(false));
    }

    return (
        <div>
            <Formik
                initialValues={initialFormValues}
                validationSchema={validationSchema}
                onSubmit={onFormikSubmit}>

                {({ values, setFieldValue, errors }) => (
                    <Form>
                        <label htmlFor="securityCode">Security Code</label>
                        <Field
                            id="securityCode"
                            name="securityCode"
                            placeholder="ABC" />
                        <span>{errors.securityCode}</span>
                        <br />

                        <label htmlFor="sequenceNumberLength">X</label>
                        <Field
                            id="sequenceNumberLength"
                            name="sequenceNumberLength"
                            placeholder="X = ?" />
                        <span>{errors.sequenceNumberLength}</span>
                        <br />

                        <label htmlFor="sequenceNumber">SequenceNumber</label>
                        <Field
                            id="sequenceNumber"
                            name="sequenceNumber"
                            placeholder="" />
                        <span>{errors.sequenceNumber}</span>
                        <br />

                        <label htmlFor="price">Price</label>
                        <Field
                            id="price"
                            name="price"
                            placeholder="price" />
                        <span>{errors.price}</span>
                        <br />

                        <label htmlFor="date">Date</label>
                        <DatePicker
                            selected={values.date}
                            dateFormat="MMMM d, yyyy"
                            className="form-control"
                            name="startDate"
                            onChange={date => setFieldValue('date', date)} />
                        <br />

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
