import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../auth/AuthContext';

export const LoginPage = () => {
	const { login } = useContext(AuthContext);
	const [form, setForm] = useState({
		email: '',
		password: '',
		rememberMe: false,
	});
	useEffect(() => {
		const email = localStorage.getItem('email');
		if (email) {
			setForm((form) => ({ ...form, email, rememberMe: true }));
		}
	}, []);

	const handleInputChange = ({ target }) => {
		const { name, value } = target;
		setForm({ ...form, [name]: value });
	};

	const toggleCheck = () => {
		setForm({ ...form, rememberMe: !form.rememberMe });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		form.rememberMe
			? localStorage.setItem('email', form.email)
			: localStorage.removeItem('email');

		const { email, password } = form;
		const ok = await login(email, password);

		if (!ok) {
			Swal.fire('Error', 'Wrong email or password', 'error');
		}
	};

	const everythingOk = () => {
		return form.email.length > 0 &&
			form.email.trim().length > 0 &&
			form.password.length > 0 &&
			form.password.trim().length > 0
			? true
			: false;
	};
	return (
		<form
			className='login100-form validate-form flex-sb flex-w'
			onSubmit={handleSubmit}
		>
			<span className='login100-form-title mb-3'>Chat - Login</span>

			<div className='wrap-input100 validate-input mb-3'>
				<input
					className='input100'
					type='email'
					name='email'
					placeholder='Email'
					onChange={handleInputChange}
					value={form.email}
					autoComplete='off'
				/>
				<span className='focus-input100'></span>
			</div>

			<div className='wrap-input100 validate-input mb-3'>
				<input
					className='input100'
					type='password'
					name='password'
					placeholder='Password'
					onChange={handleInputChange}
					value={form.password}
				/>
				<span className='focus-input100'></span>
			</div>

			<div className='row mb-3'>
				<div className='col' onClick={() => toggleCheck()}>
					<input
						className='input-checkbox100'
						id='ckb1'
						type='checkbox'
						name='rememberMe'
						readOnly
						checked={form.rememberMe}
					/>
					<label className='label-checkbox100'>Remember Me</label>
				</div>

				<div className='col text-right'>
					<Link to='/auth/register' className='txt1'>
						New account?
					</Link>
				</div>
			</div>

			<div className='container-login100-form-btn m-t-17'>
				<button
					className='login100-form-btn'
					type='submit'
					disabled={!everythingOk()}
				>
					Login
				</button>
			</div>
		</form>
	);
};
