// import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useFormikContext } from 'formik';

const Form2 = () => {
  const { values, handleChange, errors } = useFormikContext();

  return (
    <Form className="form-container">
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>

        <Form.Control
          name="form2.firstName"
          type="text"
          placeholder="Enter your first name"
          onChange={handleChange}
          value={values?.form2?.firstName}
          data-testid="firstname"
        />
        {(errors?.form2?.firstName || !values?.form2?.isValid) && (
          <div className="error" data-testid="firstname-error">
            {errors?.form2?.firstName}
          </div>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          name="form2.lastName"
          type="text"
          placeholder="Enter your Last name"
          value={values?.form2?.lastName}
          onChange={handleChange}
        />
        {(errors?.form2?.lastName || !values?.form2?.isValid) && (
          <div className="error">{errors?.form2?.lastName}</div>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          name="form2.address"
          type="text"
          placeholder="Address"
          value={values?.form2?.address}
          onChange={handleChange}
        />
        {(errors?.form2?.address || !values?.form2?.isValid) && (
          <div className="error">{errors?.form2?.address}</div>
        )}
      </Form.Group>
    </Form>
  );
};

export default Form2;
