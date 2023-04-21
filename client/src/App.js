
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Auth from './Auth/Auth';
import Singup from './Auth/Singup';
import Chat from './pages/Chat';
import Event from './pages/Event';
import Final from './pages/Final';
import Home from './pages/Home';
import Myevents from './pages/Myevents';
import UserProfilePage from './pages/ProfilePage';
import WishList from './pages/WishList';
import AddEvent from './pages/AddEvent'
import SendLocationPage from './pages/SendLocationPage';
import General from './components/createevent/general';
import Myorganization from './components/createevent/myorganization';
import DetailsEventPage from './components/createevent/myorganization/DetailsEventPage';
import Rank from './pages/Rank';
import SucessPayement from './pages/SucessPayement';
import FailPayment from './pages/FailPayment';
import Test from './pages/Test';

 
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
      <Route path="/rank" element={<Rank/>}/>
      <Route path="/:id/myevent" element={<Myevents/>}/>
      <Route path="/addevent" element={<AddEvent/>}/>
      <Route path="/genaral" element={<General/>}/>
      <Route path="/myorganazation" element={<Myorganization/>}/>
      <Route path="/myorganazation/:id/details" element={<DetailsEventPage/>}/>
      <Route path="/success" element={<SucessPayement/>}/>
      <Route path="/fail" element={<FailPayment/>}/>
     
       <Route path="/jj" element={<Test locationName="tunis"/>}/>
      <Route path="/map" element={<SendLocationPage/>}/> 
     </Routes>

     </BrowserRouter>
     <ToastContainer />
    </div>
  );
}

export default App;
