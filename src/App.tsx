import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

import './App.css'
import AnimeCard from './components/AnimeCard';
import FilterMenu from './components/FilterMenu';
import type { Genre, Anime } from './types';

import filterIcon from './assets/filter.svg';

const API_URL = 'https://api.jikan.moe/v4/random/anime';

function App() {
  const [angle, setAngle] = useState<number>(0);
  const [anime, setAnime] = useState<Anime | null>(null);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [animeGenres, setAnimeGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const fetchRandomAnime = async () => {
    const result = await fetch(`${API_URL}`);
    const data = await result.json();
    setAnime(data.data);
  }

  const fetchAnimeGenres = async () => {
    const result = await fetch('https://api.jikan.moe/v4/genres/anime');
    const data = await result.json();
    setAnimeGenres(data.data);
  }

  const fetchRandomAnimeByGenre = async () => {
    const result = await fetch(`https://api.jikan.moe/v4/anime?genres=${selectedGenres.join(',')}`);
    const data = await result.json();
    setAnime(data.data[Math.floor(Math.random() * data.data.length)]);
  }

  useEffect(() => {
    fetchAnimeGenres();
  }, []);

  const toggleGenre = (id: number) => {
    setSelectedGenres(prev =>
      prev.includes(id)
        ? prev.filter(g => g !== id)
        : [...prev, id]
    );
  }

  const resetGenres = () => {
    setSelectedGenres([]);
  }

  return (
    <div className="lg:flex lg:items-center lg:justify-center lg:bg-[#12121a] lg:h-screen">
      <div className="w-screen min-h-screen lg:min-h-0 flex flex-col items-center bg-[#2a2a3d] p-4 lg:w-[25%] lg:rounded-lg lg:p-8 relative">
        <div className="w-full flex flex-row items-center justify-between mb-5">
          <h1 className="text-4xl text-[#f1f1f1] font-bold">Anime Randomizer</h1>
          <button onClick={() => setFilterOpen(true)}>
            <img src={filterIcon} alt="filter" className="w-8 h-8 mt-2" />
          </button>
        </div>
        <AnimeCard animeImage={anime?.images.jpg.large_image_url} angle={angle} animeURL={anime?.url} />
        <AnimatePresence>
          {filterOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/50 z-10 rounded-lg"
                onClick={() => setFilterOpen(false)}
              />
              <FilterMenu
                genres={animeGenres}
                selectedGenres={selectedGenres}
                toggleGenre={toggleGenre}
                resetGenres={resetGenres}
                onApply={() => {
                  selectedGenres.length > 0 ? fetchRandomAnimeByGenre() : fetchRandomAnime()
                  setAngle(prev => prev + 360);
                  setFilterOpen(false);
                }}
              />
            </>
          )}
        </AnimatePresence>
        <h1 className="text-white text-3xl font-semibold mb-1 text-center">{anime?.title}</h1>
        <div className="flex gap-4 mb-5">
          <span className="text-[#a0a0b2] text-xl font-semibold mb-1 text-center" >
            ⭐ {anime?.score ?? "N/A"}
          </span>
          <span className="text-[#a0a0b2] text-xl font-semibold mb-1 text-center" >
            🏆 {anime?.rank ?? "N/A"}
          </span>
          <span className="text-[#a0a0b2] text-xl font-semibold mb-1 text-center" >
            📺 {anime?.type ?? "N/A"}
          </span>
        </div>
        <div className="info-card w-full bg-[#1e1e2f] rounded-lg p-4 mb-5 flex flex-col gap-4">
          <div>
            <p className="text-[#82cfff] text-xs uppercase tracking-widest mb-1">Genres</p>
            <p className="text-white text-lg font-semibold">{anime?.genres.map((g: Genre) => g.name).join(', ') || "N/A"}</p>
          </div>
          <div className="border-t border-[#2a2a3d] pt-3">
            <p className="text-[#82cfff] text-xs uppercase tracking-widest mb-1">Episodes</p>
            <p className="text-white text-lg font-semibold">{anime?.episodes ?? "N/A"}</p>
          </div>
          <div className="border-t border-[#2a2a3d] pt-3">
            <p className="text-[#82cfff] text-xs uppercase tracking-widest mb-1">Aired</p>
            <p className="text-white text-lg font-semibold">{anime?.aired.string}</p>
          </div>
          <div className="border-t border-[#2a2a3d] pt-3">
            <p className="text-[#82cfff] text-xs uppercase tracking-widest mb-1">Synopsis</p>
            <p className="text-[#a0a0b2] text-base leading-relaxed max-h-32 overflow-y-auto">{anime?.synopsis}</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#82cfff] hover:bg-[#b0e0ff] w-full text-2xl hover:cursor-pointer text-[#1e1e2f] px-6 py-4 rounded-lg font-semibold mb-5"
          onClick={() => {
            selectedGenres.length > 0 ? fetchRandomAnimeByGenre() : fetchRandomAnime();
            setAngle(prev => prev + 360);
          }}
        >
          🎲 Random Anime
        </motion.button>
      </div>
    </div >
  )
}

export default App
