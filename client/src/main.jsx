import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes.jsx'
import { AuthContext } from './components/authContext/AuthContext.jsx';
import Register from "./pages/auth/Register";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      <Register/>
    </AuthContext>
    {/* <RouterProvider router={router} /> */}
  </StrictMode>
);