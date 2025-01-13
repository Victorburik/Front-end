import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const SuggestionManagement = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [editingSuggestion, setEditingSuggestion] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedLink, setEditedLink] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const token = localStorage.getItem('authToken');

    if (role !== 'admin') {
      navigate('/');
    }

    const fetchSuggestions = async () => {
      try {
        const response = await api.get('/suggestions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuggestions(response.data);
      } catch (error) {
        setErrorMessage('Erro ao carregar sugestões.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [navigate]);

  const handleApprove = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await api.post(
        `/suggestions/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert('Sugestão aprovada com sucesso!');
        setSuggestions((prevSuggestions) =>
          prevSuggestions.filter((suggestion) => suggestion.id !== id)
        );
      }
    } catch (error) {
      setErrorMessage('Erro ao aprovar sugestão.');
    }
  };

  const handleReject = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await api.post(
        `/suggestions/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert('Sugestão reprovada com sucesso!');
        setSuggestions((prevSuggestions) =>
          prevSuggestions.filter((suggestion) => suggestion.id !== id)
        );
      }
    } catch (error) {
      setErrorMessage('Erro ao reprovar sugestão.');
    }
  };

  const handleEdit = (suggestion) => {
    setEditingSuggestion(suggestion);
    setEditedTitle(suggestion.title);
    setEditedLink(suggestion.link);
  };

  const handleSaveEdit = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await api.put(
        `/suggestions/${editingSuggestion.id}`,
        { title: editedTitle, link: editedLink },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert('Sugestão editada com sucesso!');
        setSuggestions((prevSuggestions) =>
          prevSuggestions.map((suggestion) =>
            suggestion.id === editingSuggestion.id
              ? { ...suggestion, title: editedTitle, link: editedLink }
              : suggestion
          )
        );
        setEditingSuggestion(null);
      }
    } catch (error) {
      setErrorMessage('Erro ao editar sugestão.');
    }
  };

  const handleCancelEdit = () => {
    setEditingSuggestion(null);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Carregando sugestões...</p>;
  }

  if (errorMessage) {
    return <p className="text-center text-red-500">{errorMessage}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Gerenciamento de Musicas
      </h1>
      {editingSuggestion ? (
        <div className="p-4 bg-white shadow rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Editar Sugestão</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Título</label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Link</label>
            <input
              type="text"
              value={editedLink}
              onChange={(e) => setEditedLink(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleCancelEdit}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveEdit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Salvar
            </button>
          </div>
        </div>
      ) : (
        <>
          {suggestions.length === 0 ? (
            <p className="text-center text-gray-600">
              Não há sugestões para aprovar, rejeitar ou editar.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-4 bg-white shadow rounded-lg border border-gray-200"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {suggestion.title}
                  </h2>
                  <a href={suggestion.link} className="text-blue-600 underline mb-2">
                    {suggestion.link}
                  </a>
                  <h2 className="text-lg text-gray-800 mb-2">
                    Status: {suggestion.status}
                  </h2>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleApprove(suggestion.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Aprovar
                    </button>
                    <button
                      onClick={() => handleReject(suggestion.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Rejeitar
                    </button>
                    <button
                      onClick={() => handleEdit(suggestion)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SuggestionManagement;
