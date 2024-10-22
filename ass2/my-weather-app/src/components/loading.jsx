// Loading.js
const Loading = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-xl text-blue-600">Loading...</p>
      </div>
    );
  };
  
  export default Loading;
  