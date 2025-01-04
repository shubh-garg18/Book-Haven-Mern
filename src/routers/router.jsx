import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/home/Home.jsx'
import Login from '../components/Login.jsx'
import Register from '../components/Register.jsx'
import CartPage from '../pages/books/CartPage.jsx'
import CheckoutPage from '../pages/books/CheckoutPage.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',	
                element: <Login />,
            },
            {
                path: '/register',	
                element: <Register />,
            },
            {
                path: '/cart',	
                element: <CartPage />,
            },
            {
                path: '/checkout',	
                element: <CheckoutPage />,
            }
            /*{
                path: '/about',
                element: <About />,
            },*/
        ],
    },
])

export default router