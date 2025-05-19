import { useState, useEffect } from "react";
import { handleRandomusers } from "@/services/Handleapi";

const Suggestions = ({ className }) => {
  const [randomUsers, setrandomUsers] = useState([]);

  const fetchRandomUsers = async () => {
    try {
      const response = await handleRandomusers();
      setrandomUsers(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRandomUsers();
  }, []);

  return (
    <div
      className={`hidden sm:block md:w-full lg:w-72 p-4 bg-white dark:bg-neutral-900 rounded-xl shadow-md ${className}`}
    >
      <p className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
        Suggestions
      </p>
      <div className="space-y-3">
        {randomUsers?.map((user) => (
          <div
            key={user.id}
            className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-800 transition"
          >
            {user?.picture?.medium && (
              <img
                src={user.picture.medium}
                alt={`${user.name.first} ${user.name.last}`}
                className="h-11 w-11 rounded-full object-cover"
              />
            )}
            <div className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-100">
              {user?.name?.first} {user?.name?.last}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
