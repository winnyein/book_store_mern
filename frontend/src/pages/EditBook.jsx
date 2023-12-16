import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../components";
import areObjectsEqual from "../utils/AreObjectsEqual";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    try {
      (async () => {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        setBook({
          title: response.data.data.title,
          author: response.data.data.author,
          publishYear: response.data.data.publishYear,
        });
        setTitle(response.data.data.title);
        setAuthor(response.data.data.author);
        setPublishYear(response.data.data.publishYear);
        setIsLoading(false);
      })();
    } catch (error) {
      console.log(`data fetching error: ${error.message}`);
      setIsLoading(false);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author && publishYear) {
      const newBook = { title, author, publishYear: +publishYear };

      if (areObjectsEqual(book, newBook)) {
        navigate("/");
        return;
      }
      (async () => {
        try {
          setIsLoading(true);
          const data = await axios.put(
            `http://localhost:5000/books/update/${id}`,
            newBook
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
          <div className="flex justify-center ">
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

export default EditBook;
