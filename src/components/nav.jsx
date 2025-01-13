import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import {Disclosure,DisclosureButton,DisclosurePanel} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { BellIcon } from '@heroicons/react/24/solid';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import SuggestionModal from './SuggestionModal';
import { useAuth } from '../contexts/AuthContext';;

const adminNavigation  = [
  { name: 'Dashboard', href: '/adm-sugestao', current: false },
  { name: 'Home', href: '/', current: false },
  { name: 'Sugerir nova música', action: 'suggest', current: false },
  { name: 'Login', href: '/login', current: false },
];

const userNavigation  = [
  { name: 'Home', href: '/', current: false },
  { name: 'Sugerir nova música', action: 'suggest', current: false },
  { name: 'Login', href: '/login', current: false },
  { name: 'Cadastre-se', href: '/register', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Nav = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const { isAuthenticated, role, logout } = useAuth();

  const updatedNavigation = (role === 'admin' ? adminNavigation : userNavigation).map((item) => ({
    ...item,
    current: location.pathname === item.href,
  }));

  const handleSuggestClick = () => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      alert('Você precisa estar logado para sugerir uma música.');
      navigate('/login', { replace: true });
      return;
    }
    setModalOpen(true);
  };
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); 
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };




  return (
    <>
      <Disclosure as="nav" className="bg-amber-950">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-amber-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Abrir menu principal</span>
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Sua Empresa"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {updatedNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={item.action === 'suggest' ? handleSuggestClick : undefined}
                      className={classNames(
                        item.current
                          ? 'bg-amber-100 text-black'
                          : 'text-gray-300 hover:bg-amber-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="rounded-full bg-amber-100 p-1 text-amber-950 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="sr-only">Ver notificações</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Abrir menu do usuário</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Foto do perfil"
                    />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem>
                    {({ active }) => (
                        <button
                        onClick={handleLogout}
                        className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                        )}
                        >
                        Sair
                        </button>
                    )}
                </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {updatedNavigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                onClick={item.action === 'suggest' ? handleSuggestClick : undefined}
                className={classNames(
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>

      <main className="bg-white">
        {children}
      </main>
      <SuggestionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default Nav;
