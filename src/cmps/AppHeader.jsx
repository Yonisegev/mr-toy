import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import logo from '../assets/img/toylogo.png';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const AppHeader = () => {
  const { user } = useSelector((state) => state.userModule);
  useEffect(() => {
    console.log('user: ', user);
  }, [user]);
  return (
    <header>
      {/* <UserMsg /> */}

      <Link to='/'>
        <div className='logo'>
          <h1>Mister Toy</h1>
        </div>
      </Link>

      <nav>
        <div className='login-container'>
          {!user && (
            <p>
              <Link to='/login'>
                <Button size='large' variant='contained' className='login-btn'>
                  Login
                </Button>
              </Link>
            </p>
          )}
          {user && (
            <>
              Welcome {user.fullname} <br />
              <Button
                onClick={() => this.props.onLogout()}
                variant='contained'
                className='logout-btn'
                size='small'>
                Logout
              </Button>
            </>
          )}
        </div>
        <Link to='/'>Home</Link> |<Link to='/toy'> Toys</Link> |
        <Link to='/toy/dashboard'> Statistics</Link> |
        <Link to='/about'> About</Link>
      </nav>
    </header>
  );
};
