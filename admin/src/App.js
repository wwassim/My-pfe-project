import {ColorModeContext ,useMode}from './theme'
import {CssBaseline , ThemeProvider} from "@mui/material"
import Topbar from"./scenes/global/Topbar"
import Sidebar from"./scenes/global/Sidebar"
import Dashboard from"./scenes/dashboard"
import Team from"./scenes/team"
import Category from"./scenes/category"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from './components/form/Form'
import Profileform from './scenes/Profile'
import EditUser from './scenes/team/EditUser'
import EditCategory from './scenes/category/EditCategory'
import EditArtist from './scenes/artist/EditArtist'
import Artist from './scenes/artist'
import Event from './scenes/event'
import EditEvent from './scenes/event/EditEvent'
function App() {
  const [theme,colorMode] =useMode();
  return (
    <div className="app">
    <BrowserRouter>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <div className="app">
            <Sidebar/>
            <main className='content'>
              <Topbar/>
              <Routes>
                  <Route path="/" element={<Dashboard/>}/>
                  <Route path="/team" element={<Team/>}/>
                  <Route path="/category" element={<Category/>}/>
                  <Route path="/form" element={<Profileform/>}/>
                  <Route path="/team/:id/edit" element={<EditUser/>}/>
                  <Route path="/category/:id/edit" element={<EditCategory/>}/>
                  <Route path="/artist" element={<Artist/>}/>
                  <Route path="/artist/:id/edit" element={<EditArtist/>}/>
                  <Route path="/event" element={<Event/>}/>
                  <Route path="/event/:id/edit" element={<EditEvent/>}/>
              </Routes>
            </main>
          </div>
        </CssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </BrowserRouter>
    </div>
  )
}

export default App;
