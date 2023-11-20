import  { FaHome } from 'react-icons/fa'; // Asegúrate de reemplazar con la ruta correcta a tu icono

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-100">
      <FaHome size={50} />
      <h1 className="text-lg font-semibold text-gray-700 mt-4">
        Welcome to the Event Management System
      </h1>
    </div>
  );
}

export default Home;
