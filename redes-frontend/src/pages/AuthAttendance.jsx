import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Authenticate() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Llama a la función fetchEvents cuando el componente se monta
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEventChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  };

  const handleImageUpload = async () => {
    try {
      // Aquí agregarías la lógica para distinguir entre un QR o una imagen de rostro
      const isQRCode = await checkIfQRCode(image); // Función ficticia, tendrías que implementarla
      if (isQRCode) {
        // Manejar QR code
      } else {
        // Manejar imagen de rostro
      }

      // Enviar la imagen al servidor
      const formData = new FormData();
      formData.append('image', image);
      formData.append('event', selectedEvent);
      const response = await axios.post('/api/upload-image', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const checkIfQRCode = (imageData) => {
    // Lógica para verificar si la imagen es un código QR
    // Esta función debe ser implementada según la lógica de detección de QR
  };

  return (
    <div className="container mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-1/2">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="event">
            Seleccione el evento
          </label>
          <select
            id="event"
            className="block w-full px-3 py-2 mb-6 text-gray-700 bg-white border border-gray-300 rounded-md shadow-inner focus:outline-none"
            onChange={handleEventChange}
            value={selectedEvent}
          >
            <option value="">-- Selecciona un evento --</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/2 bg-gray-200 p-4 rounded-md">
          <p className="mb-4 text-sm text-gray-700">Adjunte una imagen del código QR o una imagen de su rostro.</p>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="mb-4"
          />
          {image && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleImageUpload}
            >
              Adjuntar imagen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Authenticate;
