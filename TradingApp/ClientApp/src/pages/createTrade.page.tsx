import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TradesApi, CreateTradeRequest } from "./api/trades.api";
import { useHistory } from "react-router";
import * as Yup from 'yup';

require('react-datepicker/dist/react-datepicker.css')

export function CreateTrade() {
    return <Test />
}

type Values = {
    securityCode: string,
    sequenceNumberLength: number,
    sequenceNumber: string,
    price: number,
    date: Date
}

const initialValues: Values = {
    securityCode: "",
    sequenceNumberLength: 0,
    sequenceNumber: "",
    price: 0,
    date: new Date()
};

const ValidationSchema = Yup.object().shape({
    securityCode: Yup.string()
        .length(3, "exactly 3")
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

const Test = () => {
    const history = useHistory();

    return (
        <div>
            <Formik
                initialValues={initialValues}
                //validationSchema={ValidationSchema}
                onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        history.goBack();
                    }, 500);
                }}
            >
                {({ values, setFieldValue, errors }) => (
                    <Form>
                        <label htmlFor="securityCode">Security Code</label>
                        <Field
                            id="securityCode"
                            name="securityCode"
                            placeholder="ABC"
                        />
                        <div>{errors.securityCode}</div>
                        <br />

                        <label htmlFor="sequenceNumberLength">X</label>
                        <Field
                            id="sequenceNumberLength"
                            name="sequenceNumberLength"
                            placeholder="X = ?"
                        />
                        <br />

                        <label htmlFor="sequenceNumber">SequenceNumber</label>
                        <Field
                            id="sequenceNumber"
                            name="sequenceNumber"
                            placeholder=""
                        />
                        <br />

                        <label htmlFor="price">Price</label>
                        <Field
                            id="price"
                            name="price"
                            placeholder="price"
                        />
                        <br />

                        <label htmlFor="date">Date</label>
                        <DatePicker
                            selected={values.date}
                            dateFormat="MMMM d, yyyy"
                            className="form-control"
                            name="startDate"
                            onChange={date => setFieldValue('date', date)}
                        />
                        <br />

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};