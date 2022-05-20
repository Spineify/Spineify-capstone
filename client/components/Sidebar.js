import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Tracker from './Tracker'
import AppIntroDots from './AppIntroPopoverDots'
import { logout } from '../store'

const Sidebar = ({ handleClick }) => {
	return (
		<>
			<nav className="nav-menu active">
				<ul className="nav-menu-items">
					<li className="spineify-title">
						Spineify{'  '}
						<AppIntroDots />
					</li>
					<li>
						<Link to="/home">
							<span className="sidebar-span">Home</span>
						</Link>
					</li>
					<li>
						<Link to="/data">
							<span className="sidebar-span">Data</span>
						</Link>
					</li>
					<li>
						<Link to="/favorites">
							<span className="sidebar-span">My Favorites</span>
						</Link>
					</li>
					<li>
						<a href="#" onClick={handleClick}>
							<span className="sidebar-span">Logout</span>
						</a>
					</li>
					<li>
						<Tracker />
					</li>
				</ul>
			</nav>
		</>
	)
}

const mapDispatch = (dispatch) => {
	return {
		handleClick() {
			dispatch(logout())
		},
	}
}

export default connect(null, mapDispatch)(Sidebar)
