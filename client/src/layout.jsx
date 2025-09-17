// import './globals.css'
import { ToastContainer } from 'react-toastify';
// import NavB from './auth/components/navB';
import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import NavB from './components/navbar/NavB';
// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'hck',
    description: 'Generated for hck',
}

const Layout = ({ children }) => {
    return (
        <>
            <NavB />
            <ToastContainer
                position="top-center"
                autoClose={1500}
                limit={2}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
            {children}
        </>
    )
}

export default Layout