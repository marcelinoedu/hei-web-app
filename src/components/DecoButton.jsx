export default function DecoButton({ children, onClick, type = "button", disabled, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative 
        px-6 py-3 
        font-display text-[15px] tracking-wide 
        text-[#3a2418] 
        rounded-xl 
        bg-gradient-to-br from-[#ffb46a] to-[#ff7a2d]
        shadow-[0_4px_10px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.4)]
        border border-[rgba(181,59,24,0.3)]
        transition-all duration-300 ease-out
        hover:shadow-[0_8px_16px_rgba(255,122,45,0.3)]
        hover:-translate-y-[2px]
        active:translate-y-[1px] active:shadow-inner
        focus:outline-none focus:ring-2 focus:ring-[#ff7a2d]/40 focus:ring-offset-2 focus:ring-offset-[#f3e7d6]
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
        ${className}
      `}
      style={{
        backgroundImage:
          "linear-gradient(135deg, #ffb46a 0%, #ff7a2d 40%, #b53b18 100%)",
      }}
    >
      <span className="relative z-10 drop-shadow-[0_1px_0_rgba(255,255,255,0.3)]">
        {children}
      </span>
      <div
        className="absolute inset-0 opacity-30 rounded-xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.6), transparent 60%)",
        }}
      />
    </button>
  );
}
