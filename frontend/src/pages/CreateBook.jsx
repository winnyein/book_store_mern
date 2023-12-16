import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author && publishYear) {
      const book = { title, author, publishYear: +publishYear };

      (async () => {
        try {
          setIsLoading(true);
          const data = await axios.post(
            "https://book-store-mern-navy.vercel.app/books/create",
            book
          );
          console.log(data);
          navigate("/");
        } catch (error) {
          console.log(`failed to submit: ${error.message}`);
        }
      })();
    }
  };
  return (
    <div className=" flex items-center justify-center h-screen ">
      {isLoading ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="border border-gray-600 p-8 rounded-lg text-xl w-1/2"
        >
          <div className="flex items-center mb-4">
            <label htmlFor="title" className="w-1/3">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="outline-none border border-gray-600 px-3 py-1 rounded-lg w-2/3"
            />
          </div>

          <div className="flex items-center mb-4">
            <label htmlFor="author" className="w-1/3">
              Author:
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="outline-none border border-gray-600 px-3 py-1 rounded-lg w-2/3"
            />
          </div>

          <div className="flex items-center mb-4">
            <label htmlFor="publishYear" className="w-1/3">
              Publish Year:
            </label>
            <input
              min="1900"
              max={new Date().getFullYear()}
              type="number"
              id="publishYear"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="outline-none border border-gray-600 px-3 py-1 rounded-lg w-2/3"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="border border-gray-600 px-3 py-1 rounded-lg bg-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateBook;
