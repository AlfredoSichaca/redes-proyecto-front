/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import QRCode from "qrcode.react";
import { useEffect } from "react";
import User from '../UserRegistry.json'
import Web3 from 'web3';
import Event from '../ConferenceRegistry.json'


function RegisterAttendance() {
  const [attendeeData, setAttendeeData] = useState({
    name: "",
    email: "",
    address: "",
    position: "",
    event: "",
  }); 
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [events, setEvents] = useState([]);
  const [qrCode, setQRCode] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendeeData({ ...attendeeData, [name]: value });
  };
useEffect(() => {
    // Función para inicializar Web3 y el contrato
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          setWeb3(web3Instance);

          const contractAddress = "0x26fD98d34F86C88BA3D55A80fDc3C9334D57991E";
          const contractInstance = new web3Instance.eth.Contract(
            Event.output.abi, 
            contractAddress
          );
          setContract(contractInstance);
        } else {
          console.error("MetaMask no está instalado");
        }

      } catch (error) {
        console.error("Error al inicializar Web3:", error);
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const loadConferences = async () => {
      try {
        if (contract) {
          const conferences = await contract.methods.getAllConferences().call();
          setEvents(conferences);
        }
      } catch (error) {
        console.error("Error al cargar conferencias:", error);
      }
    };
    loadConferences();
  }, [contract]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const web3 = new Web3(window.ethereum);

    const contractAddress = '0xF889000aa6988011FddeD38c466DD3F11a02Bb16';
    const contractABI = User.output.abi;
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    await contract.methods.registerUser(
      attendeeData.name,
      attendeeData.email,
      attendeeData.address,
      attendeeData.position,
      attendeeData.event
    ).send({ from: '0xBf7ce29bc294a6e189112aEA16B0bddd9b3B4b16' });
    console.log(attendeeData);
  };

  const handleQRCode = () => {
    const qrData = JSON.stringify(attendeeData);
    setQRCode(qrData);
  };

  // useEffect(() => {
  //   // Función para inicializar Web3 y el contrato
  //   const initWeb3 = async () => {
  //     try {
  //       // Detectar si MetaMask está instalado
  //       if (window.ethereum) {
  //         const web3Instance = new Web3(window.ethereum);
  //         await window.ethereum.request({ method: "eth_requestAccounts" });
  //         setWeb3(web3Instance);
  //         const contractAddress = "0xAdC4f8237596CaE04246b9bb8E6aFEb3E2490094";
  //         const contractInstance = new web3Instance.eth.Contract(
  //           Event.output.abi, 
  //           contractAddress
  //         );

  //         setContract(contractInstance);
  //       } else {
  //         console.error("MetaMask no está instalado");
  //       }
  //     } catch (error) {
  //       console.error("Error al inicializar Web3:", error);
  //     }
  //   };

  //   initWeb3();
  // }, []);

  // useEffect(() => {
  //   // Función para cargar las conferencias desde el contrato
  //   const loadConferences = async () => {
  //     try {
  //       if (contract) {
  //         const conferences = await contract.methods.getAllConferences().call();
  //         setEvents(conferences);
  //       }
  //     } catch (error) {
  //       console.error("Error al cargar conferencias:", error);
  //     }
  //   };

  //   loadConferences();
  // }, [contract]);

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
              pattern="[A-Za-z\s]{1,50}" 
              required
              value={attendeeData.name}
              onChange={handleChange}
            />
            {attendeeData.name &&
      !/^[A-Za-z\s]{1,50}$/.test(attendeeData.name) && (
        <span className="text-red-500 text-xs italic">
          El nombre debe contener solo letras y espacios, hasta 50 caracteres.
        </span>
      )}
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
               <option value="">Seleccione una conferencia</option>
        {events.map((conference, index) => (
          <option key={index} value={index}>
            {conference.eventName} - {conference.eventLocation}
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
              onClick={handleSubmit}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar
            </button>
          </div>
        </form>

        {/* Espacio para el código QR o la cámara a la derecha */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-gray-200">
          {qrCode ? (
            <QRCode value={qrCode} size={256} />
          )  : (
            <>
              
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterAttendance;
