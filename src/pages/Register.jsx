import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';
import '../assets/css/index.css';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleRegister = async (event) => {
    event.preventDefault();

    if (!email || !password || !password_confirmation) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await api.post('/register', { name, email, password, password_confirmation });
      console.log(response.data);

      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer login:', error.response?.data);
      setErrorMessage(error.response?.data?.message || 'Erro ao fazer login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 login-container">
      <form
        onSubmit={handleRegister}
        className="p-8 bg-white shadow-md rounded-md"
      >
        <h2 className="text-xl font-bold mb-4 text-amber-950">Cadastre-se</h2>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
        )}
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
          required
        />
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          className="mb-2 p-2 border rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="Confirme sua senha"
          value={password_confirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)} 
          className="mb-2 p-2 border rounded w-full"
          required
        />

        <button
          type="submit"
          className={`w-full p-2 rounded ${
            isLoading
              ? 'bg-amber-500 cursor-not-allowed'
              : 'bg-amber-950 text-white'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Carregando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}

export default Register;
