// import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useFormikContext } from 'formik';

const Form1 = () => {
  const { values, handleChange, errors } = useFormikContext();

  return (
    <Form className="form-container">
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="form1.emailId"
          type="email"
          value={values.form1.emailId}
          placeholder="Enter email"
          onChange={handleChange}
        />
        {(errors?.form1?.emailId || !values.form1.isValid) && (
          <div className="error">{errors?.form1?.emailId}</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="form1.password"
          value={values.form1.password}
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {(errors?.form1?.password || !values.form1.isValid) && (
          <div className="error">{errors?.form1?.password}</div>
        )}
      </Form.Group>
    </Form>
  );
};

export default Form1;
