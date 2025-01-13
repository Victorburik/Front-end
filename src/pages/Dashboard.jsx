import React, { useState, useEffect } from 'react';
import api from '../services/api';

const TopMusic = () => {
  const [musicList, setMusicList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchSongs = async () => {
    const savedMusicList = localStorage.getItem('topMusicList');
    if (savedMusicList) {
      setMusicList(JSON.parse(savedMusicList));
    } else {
      try {
        const response = await api.get('/songs');
        const sortedMusicList = response.data.sort((a, b) => b.views - a.views);
        setMusicList(sortedMusicList);
        localStorage.setItem('topMusicList', JSON.stringify(sortedMusicList));
        console.log(sortedMusicList);
      } catch (error) {
        console.error('Erro ao localizar músicas:', error.response?.data);
      }
    }
  };

  // limpar o locastore e trazer as musicas novas caso tenha
  useEffect(() => {
    fetchSongs();

    const interval = setInterval(() => {
      localStorage.removeItem('topMusicList');
      fetchSongs(); 
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = musicList.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(musicList.length / itemsPerPage);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
        As Melhores Musicas Sertanejas!
      </h1>
      <ul className="space-y-6">
        {currentItems.map((music, index) => (
          <li
            key={index}
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <a
              href={`https://www.youtube.com/watch?v=${music.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center w-full"
            >
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={music.thumbnail}
                  alt={music.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="ml-4 flex flex-col">
                <strong className="text-lg font-semibold text-gray-800">
                  {music.title}
                </strong>
                <p className="text-sm text-gray-600">
                  {music.views
                    ? `${music.views.toLocaleString()} visualizações`
                    : 'Sem visualizações'}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-amber-950 text-white rounded-l-lg"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="px-4 py-2 text-amber-950">{currentPage}</span>
        <button
          className="px-4 py-2 bg-amber-950 text-white rounded-l-lg"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default TopMusic;
