import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';
import '../assets/css/index.css';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // obter o token CSRF
  const fetchCsrfToken = async () => {
    try {
      await api.get('/sanctum/csrf-cookie');
    } catch (error) {
      console.error('Erro ao obter CSRF:', error);
    }
  };

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await api.post('/login', { email, password });
      console.log(response.data);
      const { token } = response.data;
      const { role } = response.data.user;
      login(token, role);
      navigate('/');
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
        onSubmit={handleLogin}
        className="p-8 bg-white shadow-md rounded-md"
      >
        <h2 className="text-xl font-bold mb-4 text-amber-950">Login</h2>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
        )}

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

        <button
          type="submit"
          className={`w-full p-2 rounded ${
            isLoading
              ? 'bg-amber-500 cursor-not-allowed'
              : 'bg-amber-950 text-white'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

export default Login;
