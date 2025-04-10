import { Link } from 'react-router-dom'
import '../index.css'

function NotFound() {
  return (
    <div className="notfound">
      <h1 className="notfound__code">404</h1>
      <p className="notfound__title">Page Not Found</p>
      <p className="notfound__text">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link onClick={() => window.history.back()}  className="notfound__btn">
        Go back home
      </Link>
    </div>
  )
}

export default NotFound
