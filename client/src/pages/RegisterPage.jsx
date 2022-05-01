import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../auth/AuthContext';

export const RegisterPage = () => {
	const { register } = useContext(AuthContext);

	const [form, setForm] = useState({
		email: '',
		password: '',
		name: '',
	});

	const handleInputChange = ({ target }) => {
		const { name, value } = target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { email, password, name } = form;
		const ok = await register(email, password, name);

		if (ok !== true) {
			Swal.fire('Error', ok, 'error');
		}
	};

	const everythingOk = () => {
		return form.email.length > 0 &&
			form.email.trim().length > 0 &&
			form.password.length > 0 &&
			form.password.trim().length > 0 &&
			form.name.length > 0 &&
			form.name.trim().length > 0
			? true
			: false;
	};
	return (
		<form
			className='login100-form validate-form flex-sb flex-w'
			onSubmit={handleSubmit}
		>
			<span className='login100-form-title mb-3'>Chat - Register</span>

			<div className='wrap-input100 validate-input mb-3'>
				<input
					className='input100'
					type='text'
					name='name'
					placeholder='Nombre'
					onChange={handleInputChange}
					value={form.name}
				/>
				<span className='focus-input100'></span>
			</div>

			<div className='wrap-input100 validate-input mb-3'>
				<input
					className='input100'
					type='email'
					name='email'
					placeholder='Email'
					onChange={handleInputChange}
					value={form.email}
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
				<div className='col text-right'>
					<Link to='/auth/login' className='txt1'>
						Already have an account?
					</Link>
				</div>
			</div>

			<div className='container-login100-form-btn m-t-17'>
				<button
					className='login100-form-btn'
					type='submit'
					disabled={!everythingOk()}
				>
					Create account
				</button>
			</div>
		</form>
	);
};
