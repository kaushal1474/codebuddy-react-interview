// import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useFormikContext } from 'formik';

const Form3 = () => {
  const { values, handleChange, errors } = useFormikContext();

  return (
    <Form className="form-container">
      <Form.Group className="mb-3">
        <Form.Label>Mobile Number</Form.Label>
        <div className="d-flex">
          <Form.Select
            className="me-1 w-auto"
            name="form3.countryCode"
            onChange={handleChange}
            value={values?.form3?.countryCode}
          >
            <option>+91</option>
            <option>+1</option>
          </Form.Select>
          <Form.Control
            type="tel"
            placeholder="ex. 9876543210"
            name="form3.phoneNumber"
            value={values?.form3?.phoneNumber}
            onChange={handleChange}
          />
        </div>
        {(errors?.form3?.phoneNumber || !values.form3.isValid) && (
          <div className="error">{errors?.form3?.phoneNumber}</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Accept Terms And Condition"
          name="form3.terms"
          value={values?.form3?.terms}
          onChange={handleChange}
        />
        {(errors?.form3?.terms || !values.form3.isValid) && (
          <div className="error">{errors?.form3?.terms}</div>
        )}
      </Form.Group>
    </Form>
  );
};

export default Form3;
