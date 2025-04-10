import { Link, useNavigate } from 'react-router-dom'
import '../index.css'
import { useRef, useState } from 'react'
import axios from 'axios'

function SignUp() {
	const emailRef = useRef()
	const loginRef = useRef()
	const passwordRef = useRef()
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [modal, setModal] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [loginError, setLoginError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const [message, setMessage] = useState('')
	const [isDisabled, setDisabled] = useState(false)

	function handleSubmit(e) {
		e.preventDefault()
    setDisabled(true)

    if (email.trim() === "") {
      setEmailError(true);
      return
    } else {
      setEmailError(false);
    }
    
    if (login.trim() === "") {
      setLoginError(true);
      return
    } else {
      setLoginError(false);
    }
    
    if (password.trim() === "") {
      setPasswordError(true);
      return
    } else {
      setPasswordError(false);
    }
    

		axios
			.post(
				`https://api.ashyo.fullstackdev.uz/auth/register`,
				{
					fullname: login,
					email: email,
					password: password,
				},
				{
					'Content-type': 'application/json',
				}
			)
			.then(res => {
				setMessage(res.data.message)
				setModal(true)
				setTimeout(() => {
					setModal(false)
          setDisabled(false)
					navigate('/signIn')
				}, 2000)
			})
			.catch(error => {
				console.log(error.massage)
				setModal(true)
				setMessage(error.message)
        setDisabled(false)
			})
	}

	return (
		<>
			{modal && (
				<div className='modal'>
					<div className='register__modal'>
						<p className='register__modal__text'>{message}</p>
					</div>
				</div>
			)}

			<section className='register'>
				<div className='container'>
					<h1 className='register__title'>Welcome, Sign up</h1>
					<div className='register__cards'>
						<p className='register__text'>
							It is our great pleasure to have you on board!{' '}
						</p>
						<form action='' onSubmit={handleSubmit} className='register__form'>
							<div className='input__cards'>
								<input
									ref={emailRef}
									onChange={e => setEmail(e.target.value)}
									className='register__input'
									type='email'
									placeholder='Enter your Email'
								/>
								{emailError && (<p className='register__error'>Malumot kititing...</p>)}
							</div>
							<div className='input__cards'>
								<input
									ref={loginRef}
									onChange={e => setLogin(e.target.value)}
									className='register__input'
									type='text'
									placeholder='Create your Login'
								/>
								{loginError && (<p className='register__error'>Malumot kititing...</p>)}
							</div>
							<div className='input__cards'>
								<input
									ref={passwordRef}
									onChange={e => setPassword(e.target.value)}
									className='register__input'
									type='password'
									placeholder='Create your Password'
								/>
								{passwordError && (<p className='register__error'>Malumot kititing...</p>)}
							</div>
							<button disabled={isDisabled} className='register__btn' type='submit'>
								{isDisabled ? <i class="fa-solid fa-spinner fa-spin-pulse" style={{fontSize: "20px"}}></i> : "Sign Up"}
							</button>
							<Link to='/signIn' className='register__link'>
								Sign In
							</Link>
						</form>
					</div>
				</div>
			</section>
		</>
	)
}

export default SignUp
