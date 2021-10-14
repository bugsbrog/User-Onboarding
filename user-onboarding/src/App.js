import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Form from './components/Form'
import * as yup from 'yup';
import schema from './components/formSchema'
import Person from './components/Person'

const initialFormVals = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  serviceTerms: false,
}

const initialFormErrors = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  serviceTerms: false,
}
const initialPeople = []
const initialDisabled = true

export default function App() {

  const [ person, setPerson ] = useState(initialPeople);
  const [ formVals, setFormVals ] = useState(initialFormVals)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)    

  const updateForm = (inputName, inputValue) => {
    setFormVals({ ...formVals, [inputName]: inputValue })
  }

  const submitForm = () => {
    const newPerson = {
      first_name: formVals.first_name.trim(),
      last_name: formVals.last_name.trim(),
      email: formVals.email.trim(),
      password: formVals.password.trim(),
      serviceTerms: formVals.serviceTerms
    }

    setPerson(person.concat(newPerson));
    setFormVals(initialFormVals);
    postNewUser(newPerson)
  }

  const postNewUser = (newPerson) => {
    axios.post(`https://reqres.in/api/users`, newPerson)
      .then (res => {
        // console.log(res.data)
        newPerson([res.data, ...person ])
      }).catch(err => {
        console.error(err)
      }).finally(() => setFormVals(initialFormVals))
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then (() => setFormErrors({ ...formErrors, [name]: ''}))
      .catch (err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setFormVals({
      ...formVals,
      [name]: value
    })
  }

  useEffect(() => {
    // 🔥 STEP 9- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    schema.isValid(formVals).then(valid => setDisabled(!valid))
  }, [formVals])

  return (
    <div className="App">
      
      <Form 
        formVals={formVals}
        updateForm={updateForm}
        submitForm={submitForm}
        change={inputChange}
        disabled={disabled}
        errors={formErrors}
      />
      {person.map(person => {
        return (
          <Person key={person.id} details={person} />
        )
      })}

    </div>
  );
}

