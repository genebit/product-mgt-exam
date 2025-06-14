const PulseLoader = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white dark:bg-slate-950">
      <div className="animate-ping">
        <div className="w-8 h-8 rounded-full bg-primary"></div>
      </div>
    </div>
  );
};

export default PulseLoader;
