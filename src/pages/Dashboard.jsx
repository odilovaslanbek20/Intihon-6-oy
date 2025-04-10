import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../index.css'
import { FaBars } from 'react-icons/fa6'
import { IoIosLogOut } from 'react-icons/io'
import { FaXmark } from 'react-icons/fa6'
import { useRef } from 'react'

function Dashboard() {
	const menuRef = useRef()
	const navigate = useNavigate()
	const location = useLocation()

	const pathName = location.pathname

	function menuBar() {
		menuRef.current.classList.add('active')
	}

	function menuExt() {
		menuRef.current.classList.remove('active')
	}

	function logOut() {
		localStorage.clear()
		navigate('/signIn')
	}

	return (
		<>
			<section className='dashboard'>
				<div className='container'>
					<div className='dashboard__cards'>
						<div ref={menuRef} className='dashboard__left'>
							<div className='dashboard__left__cards'>
								<FaXmark onClick={() => menuExt()} className='dashboard__ext' />
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
						<div className='dashboard__right'>
							<div className='dashboard__right__header'>
								<div className='dashboard__right__header__cards'>
									<div className='dashboard__right__cards'>
										<p className='dashboard__right__title'>
											Learn how to launch faster
										</p>
										<p className='dashboard__right__text'>
											watch our webinar for tips from our experts and get a
											limited time offer.
										</p>
									</div>
									<div className='dashboard__right__log'>
										<div className='dashboard__bars'>
											<FaBars onClick={() => menuBar()} />
										</div>
										<img
											className='dashboard__right__img'
											src='iconoir_bell-notification.svg'
											alt='massage'
										/>
										<div onClick={() => logOut()} className='dashboard__logout'>
											<IoIosLogOut className='logout__icon' />
											<span className='logout__text'>Log out</span>
										</div>
									</div>
								</div>
							</div>
							<div className='dashboard__right__main'>
								<h1 className='dashboard__main__title'>
									Welcome to your dashboard, Udemy school
								</h1>
								<p className='dashboard__main__text'>
									Uyo/school/@teachable.com
								</p>

								<ul className='dashboard__right__list'>
									<li className='dashboard__right__items'>
										<div className='dashboard__img__cards'>
											<img src='profile-add.svg' alt='imgs' />
										</div>
										<div className='dashboard__right__min'>
											<h2 className='dashboard__right__title__min'>
												Add other admins{' '}
											</h2>
											<p className='dashboard__right__text__min'>
												Create rich course content and coaching products for
												your students. When you give them a pricing plan,
												they’ll appear on your site!
											</p>
										</div>
									</li>

									<li className='dashboard__right__items'>
										<div className='dashboard__img__cards'>
											<img src='bankDark.svg' alt='imgs' />
										</div>
										<div className='dashboard__right__min'>
											<h2 className='dashboard__right__title__min'>
												Add classes{' '}
											</h2>
											<p className='dashboard__right__text__min'>
												Create rich course content and coaching products for
												your students. When you give them a pricing plan,
												they’ll appear on your site!
											</p>
										</div>
									</li>

									<li className='dashboard__right__items'>
										<div className='dashboard__img__cards'>
											<img src='teacherDark.svg' alt='imgs' />
										</div>
										<div className='dashboard__right__min'>
											<h2 className='dashboard__right__title__min'>
												Add students{' '}
											</h2>
											<p className='dashboard__right__text__min'>
												Create rich course content and coaching products for
												your students. When you give them a pricing plan,
												they’ll appear on your site!
											</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Dashboard
