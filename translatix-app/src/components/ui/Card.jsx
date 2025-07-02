export function Card({ platform, onStart }) {
  return (
    <div
      className="card p-6 md:p-8 fadeInUpScale"
      style={{ animationDelay: platform.delay }}>
      <div className="flex-grow">
        <div className="flex items-center justify-center h-16 w-16 bg-white/10 dark:bg-black/10 rounded-full mx-auto mb-6">
          <span role="img" aria-label={platform.title} className="text-3xl">
            {platform.icon}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">{platform.title}</h3>
        <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
          {platform.description}
        </p>
      </div>
      <button onClick={() => onStart(platform.id)} className="btn-primary">
        Bắt đầu
      </button>
    </div>
  );
}
