/* eslint-disable no-unused-vars */
import React, { useState , useEffect} from 'react';
import Web3 from 'web3';
import Event from '../ConferenceRegistry.json'

function RegisterEvent() {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    eventLocation: ''
  });

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const web3 = new Web3(window.ethereum);

    // Dirección del contrato y ABI 
    const contractAddress = '0xAdC4f8237596CaE04246b9bb8E6aFEb3E2490094';
    const contractABI = Event.output.abi;

    // Crear una instancia del contrato
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Llamar al método registerUser en el contrato inteligente con los datos del asistente
    await contract.methods.createConference(
      formData.eventName,
      formData.eventDate,
      formData.eventLocation,
    ).send({ from: '0xBf7ce29bc294a6e189112aEA16B0bddd9b3B4b16' });

    console.log(formData);
  };

  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white shadow-lg rounded-lg px-6 pt-6 pb-8 mb-4 w-3/4 lg:w-1/2 h-96" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
            Nombre del evento
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="eventName"
            type="text"
            placeholder="Nombre del evento"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="eventDate">
            Hora y fecha
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="eventDate"
            type="datetime-local"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventLocation">
            Lugar
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="eventLocation"
            type="text"
            placeholder="Lugar"
            name="eventLocation"
            value={formData.eventLocation}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterEvent;
