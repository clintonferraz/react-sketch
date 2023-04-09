import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SortingTable } from './pages/SortingTable';
import Home  from './pages/Home';
import TokenFetch  from './pages/TokenFetch';
import ToDoList  from './pages/ToDoList';
import Form from './pages/Form';
import './global.css';
/* import 'bootstrap/dist/css/bootstrap.min.css'; */
import 'bootstrap/scss/bootstrap.scss'; 
function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/sorting-a-table' element={<SortingTable />}></Route>
            <Route path='/token-fetch' element={<TokenFetch />}></Route>
            <Route path='/to-do-list' element={<ToDoList />}></Route>
            <Route path='/form' element={<Form />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
