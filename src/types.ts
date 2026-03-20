export interface Genre {
  mal_id: number
  name: string
}

export interface Anime {
  title: string
  score: number
  rank: number
  type: string
  episodes: number
  synopsis: string
  url: string
  aired: { string: string }
  genres: Genre[]
  images: { jpg: { large_image_url: string } }
}

export interface AnimeCardProps {
  animeImage?: string
  angle: number
  animeURL?: string
}

export interface FilterMenuProps {
  genres: Genre[]
  selectedGenres: number[]
  toggleGenre: (id: number) => void
  resetGenres: () => void
  onApply: () => void
}