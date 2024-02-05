export const Ping = () => {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
      <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
    </span>
  );
};
