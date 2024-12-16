export default function Toggler({ toggled, onToggle }: { toggled: boolean, onToggle: () => void }) {
    return (
        <>
            {toggled ? (
                <svg onClick={onToggle} className="z-30 top-0 right-2 w-[48] h-[48px] fill-none stoke-1 stroke-white/30 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="5" width="22" height="14" rx="7" ry="7" className="fill-white/50"></rect>
                    <circle cx="16" cy="12" r="3" className="fill-black/90 stroke-black stroke-[3]"></circle>
                </svg>
            ) : (
                <svg onClick={onToggle} className="top-0 z-30 right-2 w-[48] h-[48px] fill-none stoke-1 stroke-white/30 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="5" width="22" height="14" rx="7" ry="7" className="fill-black/50"></rect>
                    <circle cx="8" cy="12" r="3" className="fill-white/90 stroke-white stroke-[3]"></circle>
                </svg>
            )}
        </>
    )
}