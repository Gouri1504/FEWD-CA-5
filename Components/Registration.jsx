import React, { useState, useEffect } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";

function RegistrationUser() {
  const initialValues = { username: "", email: "", password: "", confirmPassword: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setAllFormErrors] = useState({});
  const [isSubmit, setSubmitDone] = useState(false);
  const navigate = useNavigate();

  const handlingChanges = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handlingSubmitions = (e) => {
    e.preventDefault();
    setAllFormErrors(validate(formValues));
    setSubmitDone(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      navigate("/", { state: { successMessage: " registration successful!" } });
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const specialCharacterRegex = /[^A-Za-z0-9]/;
    
    if (!values.username) {
      errors.username = "Yourname is required!";
    } 
    else if (values.username.length < 3) {
      errors.username = 'Username must be at least 3 characters long';
    }
    else if (values.username.length > 30) {
      errors.username = "Your name cannot exceed more than 30 characters";
    }

    if (!values.email) {
      errors.email = "Valid-Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 10) {
      errors.password = "Password must be more than 10 characters";
    } 

    if (!values.confirmPassword)
     {
      errors.confirmPassword = "Please confirm your password";
    } 
    else if (values.confirmPassword !== values.password) 
    {
      errors.confirmPassword = "Given Password is not Correct";
    }
    else if (!specialCharacterRegex.test(values.password)) {
      errors.password = "Password must contain at least one special character";
    }

    return errors;
  };

  return (
    <div className="main">
      <form className="form-main" onSubmit={handlingSubmitions}>
        <h1 className="form-top">Registration Form</h1>
  
        <div className="forms">
          <label id="Instructions" htmlFor="username">
            User-Name 
          </label>
          <input
            type="text" id="username" name="username" className="input" placeholder="Yourname" value={formValues.username}
            onChange={handlingChanges}
          />
          <p className="error-message" htmlFor="username">
            {formErrors.username}
          </p>
        </div>

          <div className="forms">
          <label id="Instructions" htmlFor="email">
            E-mail
          </label>
          <input
            type="email" id="email" name="email" className="input" placeholder="E-mail" value={formValues.email}
            onChange={handlingChanges}
          />
          <p className="error-message" htmlFor="email">
            {formErrors.email}
          </p>
        </div>

        <div className="forms">
          <label id="Instructions" htmlFor="password">
            Password
          </label>
          <input
            type="password" id="password" name="password" className="input" placeholder="Password" value={formValues.password}
            onChange={handlingChanges}
          />
          <p className="error-message" htmlFor="password">
            {formErrors.password}
          </p>
        </div>

        <div className="forms">
          <label id="Instructions" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password" id="confirmPassword" name="confirmPassword" className="input" placeholder="Confirm Password" value={formValues.confirmPassword}
            onChange={handlingChanges}
          />
          <p className="error-message" htmlFor="confirmPassword">
            {formErrors.confirmPassword}
          </p>
        </div>

        <div className="forms">
          <button className="submit" type="submit">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}



export default RegistrationUser;