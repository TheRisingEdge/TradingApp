import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import DatePicker from "react-datepicker";

import { TradesApi, CreateTradeRequest } from "./api/trades.api";

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

                        <label htmlFor="lastName">Trade Price</label>
                        <Field
                            id="lastName"
                            name="lastName"
                            placeholder="Doe"
                        />

                        <label htmlFor="email">Email</label>
                        <Field
                            id="email"
                            name="email"
                            placeholder="john@acme.com"
                            type="email"
                        />

                        <DatePicker
                            selected={values.startDate}
                            dateFormat="MMMM d, yyyy"
                            className="form-control"
                            name="startDate"
                            onChange={date => setFieldValue('startDate', date)}
                        />

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};