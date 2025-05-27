import { Link } from "react-router-dom";

const Usernotfound = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 p-4 overflow-hidden">
      <img
        src="../src/assets/usernotfound.png"
        alt="User Not Found"
        className="w-64 h-64 object-contain mb-6"
      />
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 text-center">
        Oops! User Not Found
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-md px-4">
        The user you're looking for doesn't exist or may have been removed.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
      >
        Go Back to Homepage
      </Link>
    </div>
  );
};

export default Usernotfound;