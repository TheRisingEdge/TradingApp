import React from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { TradeFormValidations } from "./CreateTrade.form.validations";
import {AppDatePicker} from "../../components/AppDatePicker";

export type FormValues = {
    securityCode: string,
    sequenceNumberLength: number,
    sequenceNumber: string,
    price: number,
    date: Date
}

const initialFormValues: FormValues = {
    securityCode: "",
    sequenceNumberLength: 2,
    sequenceNumber: "",
    price: 10,
    date: new Date()
};

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
                validationSchema={TradeFormValidations}
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

                        <label htmlFor="sequenceNumberLength">SequenceNumber Length</label>
                        <Field
                            id="sequenceNumberLength"
                            name="sequenceNumberLength"
                            placeholder="X" />
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
                        <AppDatePicker 
                            onChange={date => date.map(d => setFieldValue('date', d))}/>
                        <br />

                        <button type="submit">Create Trade</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
