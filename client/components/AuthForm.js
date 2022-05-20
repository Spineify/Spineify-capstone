import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { AiOutlineUser } from "react-icons";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;


	return (
		<div className={`signin ${name}`}>
			<div className={`signin-info ${name}`}>
				<h1>Spineify</h1>
				<div className="form">
					{name === 'signup' ? (
						<h2>Create an account</h2>
					) : (
						<h2>Login to your account</h2>
					)}
					<form onSubmit={handleSubmit} name={name}>
						{name === 'signup' && (
							<>
								<div className="form-element">
									<label htmlFor="firstName">
										<small>First Name: </small>
									</label>
									<input name="firstName" type="text" />
								</div>
								<div className="form-element">
									<label htmlFor="lastName">
										<small>Last Name: </small>
									</label>
									<input name="lastName" type="text" />
								</div>
							</>
						)}
						<div className="form-element">
							<label htmlFor="email">
								<small>Email: </small>
							</label>
							<input name="email" type="text" />
						</div>
						<div className="form-element">
							<label htmlFor="password">
								<small>Password: </small>
							</label>
							<input name="password" type="password" />
						</div>
						<button type="submit" className="btn btn-secondary">
							{displayName}
						</button>
						{error && error.response && <div> {error.response.data} </div>}
						{name === 'login' ? (
							<div>
								Don't have an account? <Link to="/signup">Sign up</Link>
							</div>
						) : (
							<div>
								Already have an account? <Link to="/login">Log in</Link>
							</div>
						)}
					</form>
				</div>
			</div>
		</div>
	)
}


/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      //user
      let user, firstName, lastName, email, password;
      email = evt.target.email.value;
      password = evt.target.password.value;
      if (evt.target.firstName) {
        firstName = evt.target.firstName.value;
        lastName = evt.target.lastName.value;
        user = { firstName, lastName, email, password };
      } else {
        user = { email, password };
      }
      dispatch(authenticate(formName, user));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
