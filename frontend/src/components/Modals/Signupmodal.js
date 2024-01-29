import React from 'react';
import '../../assets/css/modal.css'

function SignupModal(props) {
	const { open, close, header } = props

	return (
		<div className='open ? "openSignupModal modal" : "modal"'>
			{ open ? (
				<section>
					<header>
						{ header }
						<button className='close' onClick={{ close }}>
							X
						</button>
					</header>
					<main>
						{ props.children }
					</main>
					<footer>
						<button className='close' onClick={{ close }}>
							close
						</button>
					</footer>
				</section>
			) : null}
		</div>
	)
}
export default SignupModal