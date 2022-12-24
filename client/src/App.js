import AppBar from './components/AppBar';

import { useEffect ,useState} from 'react';
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from './store/auth';
import Cookies from "js-cookie";

function App() {

  const token = Cookies.get('token');
  // const auth= useSelector((state) =>state.auth)
  const [isLoading, setisLoading]= useState(true);
  const dispatch = useDispatch();

  async function fetchUser(){
    setisLoading(true)
       const res= await fetch(`${process.env.REACT_APP_API_URL}/user`,{
            headers:{
                Authorization:`Bearer ${token}`,
            },
        });

        if(res.ok){
          const user = await res.json();
          //  console.log(user);
          dispatch(getUser(user))
        }
        setisLoading(false)
            
        
    }

  useEffect(() => {
    fetchUser();
  }, []);

  // console.log(auth)
  if(isLoading){
    return <p>Loading...</p>
  }

  return (
    <>

      <AppBar />

      <Outlet />

      
    </>
  );
}

export default App;
