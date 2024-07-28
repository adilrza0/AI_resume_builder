import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SingInPage from './auth/sign-in/index.jsx'
import Home from './Home/index.jsx'
import Dashboard from './dashboard/index.jsx'
import EditResume from './dashboard/resume/[resumeId]/edit/index.jsx'
import ViewResume from './my-resume/[resumeId]/view/index.jsx'
import PrivateRoute from './components/ui/custom/PrivateRoute.jsx'


const router = createBrowserRouter([
  {
   
    element:<App/>,
    children:[
      {
        path:'/dashboard',
        element: <PrivateRoute element={<Dashboard/>} />
      },
      {
        path:'/dashboard/resume/:resumid/edit',
        element:<PrivateRoute element={<EditResume/>}  />
      }
    ]
  },
  {
    path:"/",
    element:<Home/>
  },
  {
    path:'/auth/sign-in',
    element:<SingInPage/>
  },
  {
    path:'/my-resume/:resumid/view',
    element:<ViewResume/>
  }
  
  
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
