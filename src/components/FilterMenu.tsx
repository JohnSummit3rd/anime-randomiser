import { motion } from "framer-motion";

import type { FilterMenuProps } from "../types";

function FilterMenu({ genres, selectedGenres, toggleGenre, resetGenres, onApply }: FilterMenuProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="absolute w-full bg-[#2a2a3d] p-4 rounded-lg z-20"
    >
      <div className="flex justify-between sticky top-0 pb-3">
        <p
          className="text-[#a0a0b2] cursor-pointer hover:text-white transition-colors"
          onClick={resetGenres}
        >
          Reset
        </p>
        <button
          className="bg-[#82cfff] text-[#1e1e2f] px-4 py-2 rounded-lg font-semibold text-sm"
          onClick={onApply}
        >
          Filter
        </button>
      </div>
      <div className="bg-[#1e1e2f] mt-4 p-4 rounded-lg overflow-y-auto max-h-128">
        <p className="text-[#82cfff] mb-3">Genres</p>
        {genres.map(genre => (
          <label key={genre.mal_id} className="flex items-center gap-2 text-white mb-2">
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre.mal_id)}
              onChange={() => toggleGenre(genre.mal_id)}
            />
            {genre.name}
          </label>
        ))}
      </div>
    </motion.div>
  )
}

export default FilterMenu;