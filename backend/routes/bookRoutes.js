import express from "express";
import { Book } from "../models/bookModel.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    //Validate request parameters
    if (!title || !author || !publishYear) {
      return res.status(400).json({
        message: "Please provide valid title, author and publishYear",
      });
    }

    const book = {
      title,
      author,
      publishYear,
    };
    //Create book
    const data = await Book.create(book);

    //Respond with success
    res.status(201).json(data);
  } catch (error) {
    console.log(error);

    //Respond with error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "book not found" });
    }
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book deleted already" });
    }

    res.status(200).json({ data: book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ length: books.length, data: books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "book not found" });
    }
    const { title, author, publishYear } = req.body;

    //Validate request parameters
    if (!title || !author || !publishYear) {
      return res.status(400).json({
        message: "Please provide valid title, author and publishYear",
      });
    }

    const book = {
      title,
      author,
      publishYear,
    };
    const bookUpdated = await Book.findByIdAndUpdate(id, book);
    if (!bookUpdated) {
      return res.status(404).json({ message: "Book deleted already" });
    }
    res
      .status(201)
      .json({ message: "book updated successfully", book: bookUpdated });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Book not found" });
    }
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book delete already" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Errror" });
  }
});
export default router;
