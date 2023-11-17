import React from "react";
import { useState } from "react";
import { useRef } from "react";
import Webcam from "react-webcam";
import QRCode from "qrcode.react";
import { FaCamera } from "react-icons/fa";
import { useEffect } from "react";

function RegisterAttendance() {
  const [attendeeData, setAttendeeData] = useState({
    name: "",
    email: "",
    address: "",
    position: "",
    event: "",
  });
  const [events, setEvents] = useState([]);
  const [showWebcam, setShowWebcam] = useState(false);
  const [qrCode, setQRCode] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendeeData({ ...attendeeData, [name]: value });
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []); 

  /*
    const uploadAttendeeInformation = async (attendeeInformation) => {
  // Crear un objeto FormData para enviar los datos
  const formData = new FormData();
  for (const key in attendeeInformation) {
    if (key !== 'image') {
      formData.append(key, attendeeInformation[key]);
    }
  }
  // Convertir la imagen base64 a Blob y añadirla al formulario
  if (attendeeInformation.image) {
    const blob = await fetch(attendeeInformation.image).then((res) => res.blob());
    formData.append('image', blob, 'attendee-image.jpg');
  }

  try {
    const response = await axios.post('/api/attendees', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    // Manejo de la respuesta aquí
    console.log(response.data);
  } catch (error) {
    console.error('Error al subir la información del asistente:', error);
  }
};
  
  
  */

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejarías el envío de los datos, como enviarlos a un backend
    console.log(attendeeData);
  };

  const handleQRCode = () => {
    const qrData = JSON.stringify(attendeeData);
    setQRCode(qrData);
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  // Esta función activará la webcam
  const handleStartCaptureClick = () => {
    setShowWebcam(true);
  };

  // Esta función desactivará la webcam
  const handleStopCaptureClick = () => {
    setShowWebcam(false);
  };

  // Esta función manejará la lógica de tomar una foto
  const handleCaptureClick = () => {
    capture();
    // Combinar los datos del formulario con la imagen
    /*const attendeeInformation = {
    ...attendeeData, 
    image: imageSrc, 

     // Aquí podrías enviar `attendeeInformation` al servidor
     //uploadAttendeeInformation(attendeeInformation);
    }; */
    setShowWebcam(false); // Opcionalmente desactivar la cámara después de tomar la foto
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-4xl">
        {/* Formulario de registro a la izquierda */}
        <form
          className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 w-1/2"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nombre del asistente
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Nombre completo"
              name="name"
              value={attendeeData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Correo electrónico"
              name="email"
              value={attendeeData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Dirección
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Dirección"
              name="address"
              value={attendeeData.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="position"
            >
              Cargo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="position"
              type="text"
              placeholder="Cargo en la empresa o rol"
              name="position"
              value={attendeeData.position}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="event"
            >
              Evento
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="event"
              name="event"
              value={attendeeData.event}
              onChange={handleChange}
            >
              <option value="">Seleccione un evento</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleQRCode}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Código QR
            </button>
            <button
              type="button"
              onClick={handleStartCaptureClick}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Rec. facial
            </button>
          </div>
        </form>

        {/* Espacio para el código QR o la cámara a la derecha */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-gray-200">
          {qrCode ? (
            <QRCode value={qrCode} size={256} />
          ) : showWebcam ? (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={256}
                videoConstraints={{
                  width: 256,
                  height: 256,
                  facingMode: "user",
                }}
              />
              <button
                onClick={handleCaptureClick}
                className="p-2 bg-gray-300 rounded-full"
              >
                <FaCamera className="text-white" />
              </button>
            </>
          ) : capturedImage ? (
            <img src={capturedImage} alt="Captured face" />
          ) : (
            <>
              {capturedImage && (
                <button onClick={handleStopCaptureClick}>
                  Desactivar Cámara
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterAttendance;
