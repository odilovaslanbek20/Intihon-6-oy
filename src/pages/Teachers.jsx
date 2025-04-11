import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { FaBars, FaXmark } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../index.css'

function Teachers() {
	const menuRef = useRef()
	const navigate = useNavigate()
	const location = useLocation()
	const [modal, setModal] = useState(false)
	const [isPage, setIsPage] = useState(true)
	const [message, setMessage] = useState('')
	const [isCards, setCards] = useState(true)
	const [fullname, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setIs] = useState('')
	const [phone_number, setPhone] = useState('')
	const [Role, setRole] = useState('')
	const [image, setImage] = useState('')
	const [is_verified, setVerified] = useState('')
	const [users, setUsers] = useState('')
	const [isDisabled, setDisabled] = useState(false)
	const [isUser, setIsUser] = useState(true)
	const [nameError, setNameError] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [roleError, setRoleError] = useState(false)
	const [phoneError, setPhoneError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const [verifiedError, setVerifiedError] = useState(false)
	const [originalUsers, setOriginalUsers] = useState(null)
	const [displayUsers, setDisplayUsers] = useState(null)
	const [searchTerm, setSearchTerm] = useState('')

	const userlar = useRef()

	const pathName = location.pathname

	function handleBack() {
		setIspage(true)
		localStorage.setItem('isPage', JSON.stringify(true))
	}

	setInterval(() => {
		localStorage.setItem('isPage', JSON.stringify(isPage))
	}, 1000)

	function menuBar() {
		menuRef.current.classList.add('active')
	}

	function menuExt() {
		menuRef.current.classList.remove('active')
	}

	function userId(id) {
		axios
			.get(`https://api.ashyo.fullstackdev.uz/users/${id}`)
			.then(res => {
				setUsers(res.data)
				setIsUser(false)
			})
			.catch(error => console.log(error.message))
	}

	function logOut() {
		localStorage.clear()
		navigate('/signIn')
	}

	useEffect(() => {
		axios
			.get(`https://api.ashyo.fullstackdev.uz/users`)
			.then(res => {
				setOriginalUsers(res.data)
				setDisplayUsers(res.data)
				setCards(false)
			})
			.catch(error => console.log(error.message))
	}, [])

	function seorch() {
		if (searchTerm.trim() === '') {
			setDisplayUsers(originalUsers)
		} else {
			const filteredUsers = originalUsers.filter(user =>
				user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
			)
			setDisplayUsers(filteredUsers)
		}
	}

	useEffect(() => {
		if (originalUsers) {
			seorch()
		}
	}, [searchTerm, originalUsers])

	const [formValues, setFormValues] = useState({
		fullname: '',
		email: '',
		phone_number: '',
		password: '',
		role: 'ADMIN',
		is_verified: false,
	})

	const handleChange = e => {
		const { name, value, type, checked, files } = e.target

		if (type === 'file') {
			setImage(files[0])
		} else {
			setFormValues(prev => ({
				...prev,
				[name]: type === 'checkbox' ? checked : value,
			}))
		}
	}

	const handleSubmit = e => {
		e.preventDefault()

		setDisabled(true)

		const formData = new FormData()
		formData.append('fullname', formValues.fullname)
		formData.append('email', formValues.email)
		formData.append('phone_number', formValues.phone_number)
		formData.append('password', formValues.password)
		formData.append('role', formValues.role)
		formData.append('is_verified', formValues.is_verified ? 1 : 0) 
		if (image) {
			formData.append('image', image)
		}

		axios
			.post('https://api.ashyo.fullstackdev.uz/users/add', formData)
			.then(res => {
				setMessage(res.data.message)
				setModal(true)
				setTimeout(() => {
					setModal(false)
					setDisabled(false)
				}, 2000)
			})
			.catch(error => {
				setMessage(error.message)
				setModal(true)
				setTimeout(() => {
					setModal(false)
					setDisabled(false)
				}, 2000)
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

			<section className='dashboard'>
				<div className='container'>
					<div className='dashboard__cards'>
						<div ref={menuRef} className='teachers__left'>
							<div className='dashboard__left__cards'>
								<FaXmark onClick={() => menuExt()} className='reachers__ext' />
								<img
									className='dashboard__img'
									src='imgs.svg'
									alt='dashboard'
								/>
								<p className='dashboard__text'>Udemy Inter. school</p>
							</div>
							<div className='dashboard__list'>
								<Link
									to='/dashboard'
									className={
										pathName === '/dashboard'
											? 'dashboard__items active1'
											: 'dashboard__items'
									}
								>
									<img className='dashboard__img' src='home-2.svg' alt='home' />
									<p className='dashboard__link'>Dashboard</p>
								</Link>
								<Link
									to='/teachers'
									className={
										pathName === '/teachers'
											? 'dashboard__items active1'
											: 'dashboard__items'
									}
								>
									<img className='dashboard__img' src='home-2.svg' alt='home' />
									<p className='dashboard__link'>Teachers</p>
								</Link>
								<Link to='' className='dashboard__items'>
									<img
										className='dashboard__img'
										src='teacher.svg'
										alt='home'
									/>
									<p className='dashboard__link'>Students</p>
								</Link>
								<Link to='' className='dashboard__items'>
									<img className='dashboard__img' src='bank.svg' alt='home' />
									<p className='dashboard__link'>Billing</p>
								</Link>
								<Link to='' className='dashboard__items'>
									<img
										className='dashboard__img'
										src='setting-2.svg'
										alt='home'
									/>
									<p className='dashboard__link'>Settings and profile</p>
								</Link>
								<Link to='' className='dashboard__items'>
									<img
										className='dashboard__img'
										src='chart-square.svg'
										alt='home'
									/>
									<p className='dashboard__link'>Exams</p>
								</Link>
								<Link to='' className='dashboard__items items'>
									<img className='dashboard__img' src='bank.svg' alt='home' />
									<p className='dashboard__link'>Features</p>
									<span className='dashboard__new'>NEW</span>
								</Link>
							</div>
						</div>
						<div className='teachers__right'>
							<div className='teachers__right__w'>
								<div className='teachers__log'>
									<div className='menu__back'>
										<FaBars
											className='teachers__bars'
											onClick={() => menuBar()}
											style={{ fontSize: '20px' }}
										/>
										<button
											className='post__back'
											onClick={() => setIsPage(true)}
										>
											Back
										</button>
									</div>
									<div className='teachers__logout'>
										<img
											className='teachers__img'
											src='iconoir_bell-notification.svg'
											alt='message'
										/>
										<p onClick={() => logOut()} className='teachers__text'>
											Log out
										</p>
									</div>
								</div>

								{isUser ? (
									isPage ? (
										<>
											<div className='teachers__header'>
												<div className='teachers__add'>
													<h2 className='teachers__hedding'>Teachers</h2>
													<button
														className='teachers__add__btn btn'
														onClick={() => setIsPage(false)}
													>
														Add Teachers
													</button>
												</div>
												<form
													className='teachers__form'
													onChange={seorch}
													action=''
												>
													<IoIosSearch style={{ fontSize: '20px' }} />
													<input
														className='teachers__input'
														type='text'
														placeholder='Search for a student by name or email'
														value={searchTerm}
														onChange={e => setSearchTerm(e.target.value)}
													/>
												</form>
											</div>
											<div className='teachers__main'>
												{isCards ? (
													<div className='teachers__main__cards'>
														<img
															className='teachers__main__img'
															src='no notification.svg'
															alt=''
														/>
														<h2 className='teachers__main__title'>
															No Teachers at this time
														</h2>
														<p className='teachers__main__text'>
															Teachers will appear here after they enroll in
															your school.
														</p>
													</div>
												) : (
													<>
														<div className='teacher__user__cards'>
															<table className='custom-table'>
																<thead>
																	<tr>
																		<th className='th'>Name</th>
																		<th className='th'>Role</th>
																		<th className='th'>UserId</th>
																		<th className='th'>Email address</th>
																		<th className='th'>Phone</th>
																	</tr>
																</thead>
																<tbody className='tbody'>
																	{displayUsers?.map(users => {
																		return (
																			<>
																				<tr ref={userlar}>
																					<td
																						onClick={() => userId(users?.id)}
																						className='td name-cell'
																					>
																						<img
																							className='table__img'
																							src='download.png'
																							alt=''
																						/>
																						<span>{users?.fullname}</span>
																					</td>
																					<td className='td'>{users?.role}</td>
																					<td className='td'>{users?.id}</td>
																					<td className='td'>{users?.email}</td>
																					<td className='td'>
																						{users?.phone_number}
																					</td>
																				</tr>
																				{displayUsers.length === 0 && (
																					<p>
																						Hech qanday foydalanuvchi topilmadi.
																					</p>
																				)}
																			</>
																		)
																	})}
																</tbody>
															</table>
														</div>
													</>
												)}
											</div>
										</>
									) : (
										<>
											<form
												className='form__post'
												onSubmit={handleSubmit}
												style={{ maxWidth: '400px', margin: '0 auto' }}
											>
												<h2 className='post__title'>
													Yangi foydalanuvchi qo‘shish
												</h2>

												<label className='post__label'>Fullname:</label>
												<input
													className='input__post'
													type='text'
													name='fullname'
													value={formValues.fullname}
													onChange={handleChange}
													required
												/>

												<label className='post__label'>Email:</label>
												<input
													className='input__post'
													type='email'
													name='email'
													value={formValues.email}
													onChange={handleChange}
													required
												/>

												<label className='post__label'>
													<input
														className='input__post'
														type='checkbox'
														name='is_verified'
														checked={formValues.is_verified}
														onChange={handleChange}
													/>
													Tasdiqlanganmi?
												</label>
												<label className='post__label'>Rasm (image):</label>
												<input
													className='input__post'
													type='file'
													name='image'
													accept='image/*'
													onChange={handleChange}
												/>

												<label className='post__label'>Telefon raqam:</label>
												<input
													className='input__post'
													type='text'
													name='phone_number'
													value={formValues.phone_number}
													onChange={handleChange}
													required
												/>

												<label className='post__label'>Parol:</label>
												<input
													className='input__post'
													type='password'
													name='password'
													value={formValues.password}
													onChange={handleChange}
													required
												/>
												<label className='post__label'>Roli:</label>
												<select
													className='input__post'
													name='role'
													value={formValues.role}
													onChange={handleChange}
												>
													<option value='ADMIN'>ADMIN</option>
													<option value='USER'>USER</option>
												</select>

												<button disabled={isDisabled} className='post__button'>
													{isDisabled ? (
														<i
															className='fa-solid fa-spinner fa-spin-pulse'
															style={{ fontSize: '20px' }}
														></i>
													) : (
														'Save'
													)}
												</button>
											</form>
										</>
									)
								) : (
									<>
										<div className='users'>
											<div className='users__left'>
												<img className='user__img' src='download.png' alt='' />
												<h2 className='user__title'>{users?.fullname}</h2>
												<p className='user__text'>{users?.email}</p>
												<div className='users__cards'>
													<img src='../../public/Frame 30085.png' alt='' />
													<img src='../../public/Frame 30086.png' alt='' />
													<img src='../../public/Frame 30087.png' alt='' />
												</div>
											</div>
											<div className='user__right'>
												<div className='user__right__cards'>
													<div className='user__about'>
														<h2 className='user__right__title'>#</h2>
														<p className='user__right__text'>
															{users?.fullname}
														</p>
													</div>
													<div className='user__about'>
														<h2 className='user__right__title'>Phone</h2>
														<p className='user__right__text'>
															{users?.phone_number}
														</p>
													</div>
													<div className='user__about'>
														<h2 className='user__right__title'>Password</h2>
														<p className='user__right__text'>
															{users?.password}
														</p>
													</div>
													<div className='user__about'>
														<h2 className='user__right__title'>Role</h2>
														<p className='user__right__text'>{users?.role}</p>
													</div>
													<div className='user__about'>
														<h2 className='user__right__title'>CreatedAt</h2>
														<p className='user__right__text'>
															{users?.createdAt}
														</p>
													</div>
												</div>
												<div
													onClick={() => window.history.back()}
													className='user__back'
												>
													Back
												</div>
											</div>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Teachers
