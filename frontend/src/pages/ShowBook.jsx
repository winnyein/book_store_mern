import { useState, useEffect } from "react";
import { Spinner } from "../components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ShowBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState({});
  const { id } = useParams();

  useEffect(() => {
    try {
      (async () => {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        setBook(response.data.data);
        setIsLoading(false);
      })();
    } catch (error) {
      console.log(`data fetching error: ${error.message}`);
      setIsLoading(false);
    }
  }, [id]);
  return (
    <div className=" flex items-center justify-center h-screen ">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="border border-gray-600 p-8 rounded-lg text-xl w-1/2">
          <div className="flex items-center mb-2">
            <p className="w-1/3">Title:</p>
            <p>{book.title}</p>
          </div>
          <div className="flex items-center mb-2">
            <p className="w-1/3">Author:</p>
            <p>{book.author}</p>
          </div>
          <div className="flex items-center mb-2">
            <p className="w-1/3">Publish Year:</p>
            <p>{book.publishYear}</p>
          </div>
          <div className="flex items-center mb-2">
            <p className="w-1/3">Last Update:</p>
            <p>{new Date(book.updatedAt).toLocaleDateString()}</p>
          </div>
          <div className="flex justify-center mt-4 ">
            <Link
              to="/"
              className="border border-gray-600 rounded-lg px-4 bg-blue-400"
            >
              Go Back
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
