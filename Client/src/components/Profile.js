import React ,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../redux/userSlice';

const Profile = () => {

    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // acces user data from redux
    const user = useSelector((state)=> state.user.user);

    // redirect to login page if user not found
    useEffect(()=> {
        if(!user){
            navigate("/login")
        }
    },[user, navigate]);

    // logOut function

    const handleLogout = () => {
        dispatch(clearUser());
        navigate("/login");
    }

    return(
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
                <h1 className='text-xl text-center font-bold  mb-4 '>
                    {user ? (<>
                    <p>
                        <strong>Username:</strong>{user.username}
                    </p>
                    <p>
                        <strong>Email:</strong>{user.email}
                    </p>
                    <button onClick={handleLogout}
                        className="mt-4 bg-red-500 text-white p-2 px-4 rounded-lg hover:bg-red-600">Log out
                        
                    </button>
                    </>):(
                        <p>
                            Loading profile...
                        </p>
                    )}

                </h1>
            </div>
        </div>
    )





  
}

export default Profile