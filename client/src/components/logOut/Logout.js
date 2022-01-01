import './Logout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

function Logout({setLoginStat}) {


        const logout = () => {
        localStorage.removeItem("loginStat");
        localStorage.removeItem("loginCred");
        setLoginStat(false);
      }

    return (
        <div className='logOut' onClick={logout}> 
            <h3>Logout</h3>
            <FontAwesomeIcon className='logoutIcon' icon={faSignOutAlt} />
        </div>
    )
}

export default Logout
