import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes.jsx'
import { AuthContext } from './components/authContext/AuthContext.jsx';
import QuestionComponent from './components/questionComponent/QuestionComponent.jsx'
import './App.css'
import Register from './pages/auth/Register.jsx';
import Join from './pages/game/joinPage/Join.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      {/* QuestionComponent/> */}
     {/*  <Register /> */}
     <Join/>
    </AuthContext>
    {/* <RouterProvider router={router} /> */}
  </StrictMode>
);