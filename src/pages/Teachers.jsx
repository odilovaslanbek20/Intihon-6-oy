import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../index.css'
import { FaBars } from 'react-icons/fa6'
import { IoIosLogOut } from 'react-icons/io'
import { FaXmark } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

function Teachers() {
	const menuRef = useRef()
	const navigate = useNavigate()
	const location = useLocation()
	const [modal, setModal] = useState(false)
	const [message, setMessage] = useState('')
	const [isCards, setCards] = useState(true)
	const [user, setUser] = useState(null)
	const [fullname, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setIs] = useState('')
	const [phone_number, setPhone] = useState('')
	const [users, setUsers] = useState('')
	const [isDisabled, setDisabled] = useState(false)
	const [Role, setRole] = useState('')
	const [is_verified, setVerified] = useState('')
	const [isUser, setIsUser] = useState(true)

	const pathName = location.pathname

	const [isPage, setIspage] = useState(() => {
		const saved = localStorage.getItem('isPage')
		return saved !== null ? JSON.parse(saved) : true
	})

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
				setUser(res.data)
				setCards(false)
			})
			.catch(error => console.log(error.message))
	}, [])

	function handleSubmit(e) {
		e.preventDefault()

		setDisabled(true)

		axios
			.post(
				`https://api.ashyo.fullstackdev.uz/users/add`,
				{
					fullname,
					email,
					phone_number,
					password,
					Role,
					is_verified,
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			.then(res => {
				console.log('Yuborildi!')
				setMessage(res.data.message)
				setModal(true)
				setTimeout(() => {
					setModal(false)
					setDisabled(false)
				}, 2000)
			})
			.catch(error => {
				console.log('Xato:', error.response?.data || error.message)
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
									<FaBars
										className='teachers__bars'
										onClick={() => menuBar()}
										style={{ fontSize: '20px' }}
									/>
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
														onClick={() => setIspage(false)}
													>
														Add Teachers
													</button>
												</div>
												<div className='teachers__form'>
													<IoIosSearch style={{ fontSize: '20px' }} />
													<form action=''>
														<input
															className='teachers__input'
															type='text'
															placeholder='Search for a student by name or email'
														/>
													</form>
												</div>
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
																	{user?.map(users => {
																		return (
																			<tr>
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
										<div className='create'>
											<form
												onSubmit={handleSubmit}
												className='teacher__cards__form'
												action=''
											>
												<div className='submit'>
													<h2 className='add__h2'>Add teacher</h2>
													<button disabled={isDisabled} className='save__btn'>
														{isDisabled ? (
															<i
																className='fa-solid fa-spinner fa-spin-pulse'
																style={{ fontSize: '20px' }}
															></i>
														) : (
															'Save'
														)}
													</button>
												</div>
												<div className='decaration'>
													<div className='teacher__form__cards'>
														<label>
															<p className='teacher__form__text'>Full Name</p>
															<input
																onChange={e => setName(e.target.value)}
																className='teacher__form__input'
																type='text'
																placeholder='Full Name'
															/>
														</label>
														<label>
															<p className='teacher__form__text'>
																Email address
															</p>
															<input
																onChange={e => setEmail(e.target.value)}
																className='teacher__form__input'
																type='email'
																placeholder='Email address'
															/>
														</label>
														<label>
															<p className='teacher__form__text'>Role</p>
															<select
																onChange={e => setRole(e.target.value)}
																className='teacher__form__input'
																type='text'
															>
																<option value='USER'>USER</option>
																<option value='ADMIN'>ADMIN</option>
															</select>
														</label>
													</div>
													<div className='teacher__form__cards'>
														<label>
															<p className='teacher__form__text'>
																phone_number
															</p>
															<input
																onChange={e => setPhone(e.target.value)}
																className='teacher__form__input'
																type='phone'
																placeholder='phone_number'
															/>
														</label>
														<label>
															<p className='teacher__form__text'>password</p>
															<input
																onChange={e => setIs(e.target.value)}
																className='teacher__form__input'
																type='password'
																placeholder='password'
															/>
														</label>
														<label>
															<p className='teacher__form__text'>Is_verified</p>
															<select
																onChange={e => setVerified(e.target.value)}
																className='teacher__form__input'
																type='text'
															>
																<option value='true'>true</option>
																<option value='false'>false</option>
															</select>
														</label>
													</div>
												</div>
												<div onClick={handleBack} className='user__back'>
													Back
												</div>
											</form>
										</div>
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
												<div onClick={handleBack} className='user__back'>
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
