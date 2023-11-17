import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <div>
      <nav className="bg-red-700 text-white px-4 py-3 flex justify-between items-center">
        <div className="flex space-x-4">
          {/* Utiliza el componente Link para la navegación */}
          <Link
            to="/register-event"
            className="hover:bg-red-800 px-3 py-2 rounded"
          >
            Registrar evento
          </Link>
          <Link
            to="/register-attendance"
            className="hover:bg-red-800 px-3 py-2 rounded"
          >
            Registrar asistente
          </Link>
          <Link
            to="/auth-attendance"
            className="hover:bg-red-800 px-3 py-2 rounded"
          >
            Autenticación
          </Link>
        </div>
        <div>
          <Link to="/" className="hover:bg-red-800 px-3 py-2 rounded">
            {/* Ícono de casa, se puede reemplazar con un SVG o una imagen según tu preferencia */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10l11-9 9 9M4 10v11h16V10M21 21H3a9 9 0 01-9-9"
              />
            </svg>
          </Link>
        </div>
      </nav>

      <Outlet></Outlet>
    </div>
  );
}

export default NavigationBar;
