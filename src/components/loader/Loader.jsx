const Loader = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
        <span className="loading loading-spinner"></span>
      </div>
    </div>
  );
};

export default Loader;
