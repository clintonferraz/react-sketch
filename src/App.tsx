import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SortingTable } from './pages/SortingTable';
import Home  from './pages/Home';
import TokenFetch  from './pages/TokenFetch';
import './global.css'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/sorting-a-table' element={<SortingTable />}></Route>
            <Route path='/token-fetch' element={<TokenFetch />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
