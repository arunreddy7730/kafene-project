
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import HomePage from './pages/homepage/Homepage';
import Products from './pages/productspage/Products'
import Orders from './pages/orderspage/Orders'
import Users from './pages/userspage/Users'
import { Provider } from 'react-redux';
import  store  from './redux/store';



function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
        <Header /> 
          <Routes>
             <Route exact path='/' element={<HomePage/>} />
            <Route exact path='/products' element={ <Products/> } />
            <Route exact path='/orders' element={ <Orders/>} />
            <Route exact path='/users' element={ <Users/>} />
            <Route exact path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;

