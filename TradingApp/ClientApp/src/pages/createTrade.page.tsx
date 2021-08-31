import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TradesApi, CreateTradeRequest } from "./api/trades.api";

require('react-datepicker/dist/react-datepicker.css')


export function CreateTrade() {
    return <Test />
}

type Values = {
    firstName: string;
    lastName: string;
    email: string;
    startDate: Date
}

const initialValues: Values = {
    firstName: '',
    lastName: '',
    email: '',
    startDate: new Date()
};

const Test = () => {
    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 500);
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <label htmlFor="firstName">Security Code</label>
                        <Field
                            id="firstName"
                            name="firstName"
                            placeholder="John"
                        />
                        <br/>

                        <label htmlFor="lastName">Trade Price</label>
                        <Field
                            id="lastName"
                            name="lastName"
                            placeholder="Doe"
                        />
                        <br/>

                        <label htmlFor="email">Email</label>
                        <Field
                            id="email"
                            name="email"
                            placeholder="john@acme.com"
                            type="email"
                        />
                        <br/>

                        <label htmlFor="date">Date</label>
                        <DatePicker
                            selected={values.startDate}
                            dateFormat="MMMM d, yyyy"
                            className="form-control"
                            name="startDate"
                            onChange={date => setFieldValue('startDate', date)}
                        />

                        <br/>
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};