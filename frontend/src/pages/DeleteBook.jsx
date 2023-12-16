import axios from "axios";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Spinner } from "../components";

const DeleteBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const deleteHandler = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `https://book-store-mern-navy.vercel.app/books/delete/${id}`
      );

      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.log(`data deleting error: ${error.message}`);
      setIsLoading(false);
    }
  };
  return (
    <div className=" flex items-center justify-center h-screen ">
      <div className="border border-gray-600 p-8 rounded-lg text-xl w-1/2">
        <p className="text-xl text-center">Are you sure to delete this book?</p>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex justify-center gap-4 mt-4">
            <Link
              to="/"
              className="border border-gray-600 px-3 py-1 rounded-lg bg-blue-500"
            >
              Cancel
            </Link>
            <button
              onClick={deleteHandler}
              className="border border-gray-600 px-3 py-1 rounded-lg bg-red-500"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteBook;
