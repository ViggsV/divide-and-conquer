import React from 'react'
import Chores from "../components/Chores"
import axios from "axios"
import Link from "next/link";
import LogoutButton from '../components/LogoutButton';

// function LogoutButton() {
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
//     setIsLoggedIn(loggedIn);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('isLoggedIn');
//     localStorage.setItem('logoutMessage', 'You have logged out');
//     router.push('/');
//   };

//   if (!isLoggedIn) return null;

//   return (
//     <button
//       onClick={handleLogout}
//       className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded"
//     >
//       Logout
//     </button>
//   );
// }

const page = async () => {
  let data = await axios.get("http://localhost:3001/api/chores", {
    withCredentials: true,
  })
  data.data.forEach(element => {
    element.pageId = 1
    element.type = "chores"
  });

  
  return (
    <div>
  <header className="bg-rose-500 text-white p-6 shadow-md">
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="text-3xl font-extrabold">All Your Chores</Link>
    </div>
  </header>

  <Chores items={data.data} />
  
</div>
  )
}

export default page