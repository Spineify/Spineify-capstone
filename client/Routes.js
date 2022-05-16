import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm'
import Home from './components/Home'
import { me } from './store'
import Tracker from './components/Tracker'
import DataVis from './components/DataVis'
import { FavoriteStretches } from './components/FavoriteStretches'

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData()
	}

	render() {
		const { isLoggedIn } = this.props
		return (
			<div id="content">
				{isLoggedIn ? (
					<Switch>
						<Route exact path="/home" component={Home} />
						<Route exact path="/data" component={DataVis} />
						<Route exact path="/favorites" component={FavoriteStretches} />
						<Redirect from="/login" to="/home" />
						<Redirect from="/" to="/home" />
						<Redirect from="/signup" to="/home" />

					</Switch>
				) : (
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/" component={Login} />
						<Route exact path="/signup" component={Signup} />
					</Switch>
				)}
			</div>
		)
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
		// Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
		isLoggedIn: !!state.auth.id,
	}
}

const mapDispatch = (dispatch) => {
	return {
		loadInitialData() {
			dispatch(me())
		},
	}
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
