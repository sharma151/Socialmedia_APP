import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="flex flex-col items-center justify-center max-w-full">
        <img
          src="../src/assets/page not found.png"
          alt="Page Not Found"
          className="w-64 h-64 md:w-72 md:h-72 object-contain "
        />
        {/* <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 text-center px-4">
          Oops! Page Not Found
        </h1> */}
        <p className="text-gray-600 mb-6 text-center px-4 max-w-md">
          The page you're looking for doesn't exist or may have been removed.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition duration-300 shadow-lg hover:shadow-indigo-300"
        >
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Pagenotfound;
