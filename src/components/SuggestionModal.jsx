import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import api from '../services/api.js';

const SuggestionModal = ({ isOpen, onClose }) => {
  const [songLink, setSongLink] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setErrorMessage('');
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Você precisa estar logado para enviar uma sugestão');
        return;
      }
  
      const response = await api.post('/suggestions-create', 
        { songLink, songTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      if (response.status === 201 || response.data?.status === 'success') {
        alert('Sugestão enviada com sucesso!');
        onClose();
      } else {
        alert('Erro ao enviar sugestão, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar sugestão:', error.response?.data);
      setErrorMessage(error.response?.data?.message || 'Erro ao enviar sugestão.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          <Dialog.Title className="text-lg font-medium text-gray-900">
            Sugerir Nova Música
          </Dialog.Title>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label htmlFor="songTitle" className="block text-sm font-medium text-gray-700">
                Nome da Música
              </label>
              <input
                type="text"
                id="songTitle"
                placeholder="Nome da sua música"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                className="mt-1 p-2  block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="songLink" className="block text-sm font-medium text-gray-700">
                Link da Música
              </label>
              <input
                type="url"
                id="songLink"
                placeholder="www.youtube.com/watch?v=w_YPumNHA4k"
                value={songLink}
                onChange={(e) => setSongLink(e.target.value)}
                className="mt-1 p-2  block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            {errorMessage && (
              <div className="mt-4 text-red-500 text-sm">{errorMessage}</div>
            )}
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-3 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-amber-950 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SuggestionModal;
