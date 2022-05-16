import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { authenticate } from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
	const { name, displayName, handleSubmit, error } = props

	return (
		<div className={`signin ${name}`}>
			<div className={`signin-info`}>
				<h1>{displayName}</h1>
				<form onSubmit={handleSubmit} name={name}>
					<div>
						<label htmlFor="username">
							<small>Username: </small>
						</label>
						<input name="username" type="text" />
					</div>
					<div>
						<label htmlFor="password">
							<small>Password: </small>
						</label>
						<input name="password" type="password" />
					</div>
					{name === 'login' ? (
						<div>
							<button type="submit" className="btn btn-success">
								{displayName}
							</button>
							<div>
								Don't have an account? <Link to="/signup">Sign up</Link>
							</div>
						</div>
					) : (
						<div>
							<button type="submit" className="btn btn-primary">
								{displayName}
							</button>
							<div>
								Already have an account? <Link to="/login">Log in</Link>
							</div>
						</div>
					)}
					{error && error.response && <div> {error.response.data} </div>}
				</form>
			</div>
			<div className={`pretty-intro`}>
				{name === 'signup' ? <h2>Welcome to Spineify!</h2> : null}
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
		name: 'login',
		displayName: 'Login',
		error: state.auth.error,
	}
}

const mapSignup = (state) => {
	return {
		name: 'signup',
		displayName: 'Sign Up',
		error: state.auth.error,
	}
}

const mapDispatch = (dispatch) => {
	return {
		handleSubmit(evt) {
			evt.preventDefault()
			const formName = evt.target.name
			const username = evt.target.username.value
			const password = evt.target.password.value
			dispatch(authenticate(username, password, formName))
		},
	}
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
