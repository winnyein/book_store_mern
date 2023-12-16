import { MdDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
const Table = ({ books }) => {
  return (
    <table className="border-separate   w-full">
      <thead>
        <tr>
          <th className="table-data">No</th>
          <th className="table-data">Title</th>
          <th className="table-data">Author</th>
          <th className="table-data">Publish Year</th>
          <th className="table-data">Operation</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id}>
            <td className="table-data">{index + 1}</td>
            <td className="table-data">{book.title}</td>
            <td className="table-data">{book.author}</td>
            <td className="table-data">{book.publishYear}</td>
            <td className="table-data  flex justify-center items-center gap-1 ">
              <Link to={`/books/${book._id}`}>
                <BsInfoCircle className="table-icon" />
              </Link>
              <Link to={`/books/edit/${book._id}`}>
                <CiEdit className="table-icon" />
              </Link>
              <Link to={`/books/delete/${book._id}`}>
                <MdDelete className="table-icon" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
