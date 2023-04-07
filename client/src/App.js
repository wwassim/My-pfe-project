
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Auth from './Auth/Auth';
import Singup from './Auth/Singup';
import Checkout from './components/createevent/Checkout';
import Chat from './pages/Chat';
import Event from './pages/Event';
import Final from './pages/Final';
import Home from './pages/Home';
import Myevents from './pages/Myevents';
import UserProfilePage from './pages/ProfilePage';
import WishList from './pages/WishList';
import Test from './pages/Test'
import SendLocationPage from './pages/SendLocationPage';

 
function App() {
  return (
    <div className="app">
     
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/auth/singup" element={<Singup/>}/>
      <Route path="/users/:id" element={<UserProfilePage/>}/>
      <Route path="/users/:id/edit" element={<Final/>}/>
      <Route path="/events/:id" element={<Event/>}/>
      <Route path="/wish" element={<WishList/>}/>
      <Route path="/chat" element={<Chat/>}/>
      <Route path="/:id/myevent" element={<Myevents/>}/>
      <Route path="/addevent" element={<Checkout/>}/>
      <Route path="/jj" element={<Test/>}/>
      <Route path="/map" element={<SendLocationPage/>}/>
     </Routes>

     </BrowserRouter>
     <ToastContainer />
    </div>
  );
}

export default App;
