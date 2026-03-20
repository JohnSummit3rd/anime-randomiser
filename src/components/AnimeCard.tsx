import { motion } from "framer-motion";

import type { AnimeCardProps } from "../types";

function AnimeCard({ animeImage, angle, animeURL }: AnimeCardProps) {

	return (
		<div
			className="anime-card mt-5 mb-10 w-full"
			style={{ perspective: "1000px" }}
		>
			<motion.div
				onClick={() => window.open(animeURL, "_blank")}
				animate={{ rotateY: angle }}
				transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
				style={{ transformStyle: "preserve-3d", position: "relative", height: "375px" }}
				className="w-full rounded-lg bg-[#1e1e2f] flex items-center justify-center shadow-2xl shadow-[#82cfff]/50 hover:cursor-pointer"
			>
				{animeImage
					? <img src={animeImage} alt="animePoster" className="w-full h-full object-cover rounded-lg" />
					: <p className="text-white/40 text-4xl">?</p>}
			</motion.div>
		</div>
	)
}

export default AnimeCard;