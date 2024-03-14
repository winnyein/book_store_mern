import { CgAddR } from "react-icons/cg";

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner } from "../components";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    try {
      (async () => {
        const response = await axios.get(
          "https://book-store-mern-dn72.onrender.com/books/"
        );
        setBooks(response.data.data);
        setIsLoading(false);
      })();
    } catch (error) {
      console.log(`error fetching data: ${error.message}`);
      setIsLoading(false);
    }
  }, []);
  return (
    <div className="mx-auto max-w-[1440px] p-8">
      <nav className="flex justify-between items-center">
        <h1 className="text-xl">Book List </h1>
        <Link className="cursor-pointer" to="/books/create">
          <CgAddR className="w-8 h-8 text-blue-900" />
        </Link>
      </nav>
      {isLoading ? <Spinner /> : <Table books={books} />}
    </div>
  );
};

export default Home;
