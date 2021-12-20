import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

export const AppHeader = () => {
  const { user } = useSelector((state) => state.userModule);
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
