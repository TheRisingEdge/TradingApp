import React from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { TradeFormValidations } from "./CreateTrade.form.validations";
import { AppDatePicker } from "../../components/AppDatePicker";

export type ValidatedFormValues = {
    securityCode: string,
    sequenceNumberLength: number,
    sequenceNumber: string,
    price: number,
    date: Date
}

type RawFormValues = Partial<ValidatedFormValues>;

const initialFormValues: RawFormValues = {};

export type CreateTradeFormProps = {
    onSubmit: (v: ValidatedFormValues) => Promise<any>;
};

export function CreateTradeForm(props: CreateTradeFormProps) {
    const onFormikSubmit = (values: RawFormValues, { setSubmitting }: FormikHelpers<RawFormValues>) => {
        props.onSubmit(values as ValidatedFormValues)
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
                            onChange={date => date.map(d => setFieldValue('date', d))} />
                        <span>{errors.date}</span>
                        <br />

                        <button type="submit" className='btn btn-primary'>Create Trade</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
