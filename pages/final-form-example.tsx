/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { Form, Field } from "react-final-form";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const FinalFormExample = (props) => {
    let formData = {
        firstName: "",
        lastName: "",
        company: "",
    };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
            const errors = { firstName: null, lastName: null};
            if (!values.firstName) {
              errors.firstName = "Required";
            }
            if (!values.password) {
              errors.lastName = "Required";
            }
            return errors;
          }}
        initialValues={{
          ...formData,
        }}
        render={({ handleSubmit, submitError, form, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            <Field name="firstName">
              {({ input, meta }) => (
                <div>
                  <label>First Name</label>
                  <input {...input} type="text" placeholder="First Name" />
                  {(meta.error || meta.submitError) && meta.touched && (
                    <span>{meta.error || meta.submitError}</span>
                  )}
                </div>
              )}
            </Field>
            <div>
              <label>Last Name</label>
              <Field
                name="lastName"
                component="input"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div>
              <label>Company</label>
              <Field
                name="company"
                component="input"
                type="text"
                placeholder="Company"
              />
            </div>
            {submitError && <div className="error">{submitError}</div>}

            <div>
              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting}
              >
                Reset
              </button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
};

export default FinalFormExample
