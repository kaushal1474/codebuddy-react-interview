import { useRef, useState } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';
import Form1 from '../Component/Forms/Form1';
import Form2 from '../Component/Forms/Form2';
import Form3 from '../Component/Forms/Form3';

const LoginSchema = Yup.object().shape({
  form1: Yup.object().shape({
    emailId: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .test('capital', ' Must contain minimum 2 capital letters', value =>
        /(?:[^A-Z]*[A-Z]){2}/.test(value),
      )
      .test('lower', ' Must contain minimum 2 small letters', value =>
        /(?:[^a-z]*[a-z]){2}/.test(value),
      )
      .test('number', ' Must contain minimum 2 numbers', value => /(?:[^0-9]*[0-9]){2}/.test(value))
      .test('number', ' Must contain minimum 2 special letters', value =>
        /(?:[^`!@#$%^&*\-_=+'/.,]*[`!@#$%^&*\-_=+'/.,]){2}/.test(value),
      ),
  }),
  form2: Yup.object().shape({
    firstName: Yup.string()
      .required('FirstName is required')
      .min(2, 'must have more than 2 character')
      .max(50, 'must have less than 50 character')
      .test('lower', ' Must contain alphabets', value => /^[a-zA-Z]+$/.test(value)),
    lastName: Yup.string().test('lower', ' Must contain alphabets', value =>
      /^[a-zA-Z]+$/.test(value),
    ),
    address: Yup.string()
      .required('FirstName is required')
      .min(10, 'must have more than 20 character'),
  }),
  form3: Yup.object().shape({
    phoneNumber: Yup.string()
      .required('PhoneNumber is required')
      .test(
        'phone Number',
        'Must have 10 digits',
        value => value?.length === 10 && /^[0-9]+$/.test(value),
      ),
    terms: Yup.bool().oneOf([true], 'Field must be checked'),
  }),
});

const Home = () => {
  const [key, setKey] = useState(1);
  const navigate = useNavigate();

  const validation = useRef();

  const handleValidation = () => {
    validation.current.validateForm();
    if (!validation.current.errors[`form${key}`]) {
      validation.current.setFieldValue(`form${key}.isValid`, true);

      if (key === 3 && validation.current.values.form3?.terms) {
        const res = {
          'emailId': validation.current.values.form1.emailId,
          'password': validation.current.values.form1.password,
          'firstName': validation.current.values.form2.firstName,
          'lastName': validation.current.values.form2.lastName ?? '',
          'address': validation.current.values.form2.address,
          'countryCode': validation.current.values.form3.countryCode || '+91',
          'phoneNumber': validation.current.values.form3.phoneNumber,
        };
        fetch('https://codebuddy.review/submit', {
          method: 'POST',
          body: JSON.stringify(res),
        })
          .then(response => response.json())
          .then(result => {
            // eslint-disable-next-line
            console.log('Success:', result);
            navigate('/posts');
          })
          .catch(error => {
            // eslint-disable-next-line
            console.error('Error:', error);
          });
      }
    } else {
      validation.current.setFieldValue(`form${key}.isValid`, false);
    }
  };

  const handleBack = () => {
    if (key > 1) {
      setKey(key - 1);
    }
  };

  const handleSaveNext = () => {
    handleValidation();
    if (key < 3 && validation.current.values[`form${key}`].isValid) {
      setKey(key + 1);
    }
  };

  const initalValue = {
    form1: {
      emailId: '',
      password: '',
      isValid: null,
    },
    form2: {
      firstName: '',
      lastName: '',
      address: '',
      isValid: null,
    },
    form3: {
      countryCode: '',
      phoneNumber: '',
      terms: false,
      isValid: null,
    },
  };

  return (
    <main>
      <div className="bg-light p-4 mb-5">
        <h1 data-testid="heading">Multi-step form</h1>
        <p>React template with Bootstrap version v4</p>
      </div>
      <Container>
        <Formik innerRef={validation} validationSchema={LoginSchema} initialValues={initalValue}>
          <Tabs
            activeKey={`form${key}`}
            onSelect={k => {
              const newNumber = +k.split('form')[1];
              if (newNumber < key) {
                setKey(newNumber);
              } else if (validation.current[`form${newNumber}`].isValid) {
                setKey(newNumber);
              }
            }}
            className="mb-3"
          >
            <Tab eventKey="form1" title="Form 1">
              <h3 className="text-center my-4">Form 1</h3>
              <Form1 validation={validation} />
            </Tab>
            <Tab eventKey="form2" title="Form 2">
              <h3 className="text-center my-4">Form 2</h3>

              <Form2 />
            </Tab>
            <Tab eventKey="form3" title="Form 3">
              <h3 className="text-center my-4">Form 3</h3>
              <Form3 />
            </Tab>
          </Tabs>
        </Formik>
        <div className="d-flex form-container justify-content-between">
          <Button disabled={key === 1} onClick={handleBack}>
            Back
          </Button>
          <div>
            <Button className="me-2" onClick={handleValidation}>
              Save
            </Button>
            <Button disabled={key === 3} onClick={handleSaveNext}>
              Save & Next
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Home;
