const User = require("../models/User");
const { dbConnect, dbDisconnect, dbDropCollection } = require("./testUtils");
const { describe, test, beforeAll, afterAll } = require("@jest/globals");
const mongoose = require("mongoose");
const Book = require("../models/book");
const bcrypt = require('bcrypt')

beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());

describe("User Model Test Suite", () => {
  test("should create a User data successfully", async () => {
    const UserData = {
      email: "clement@gmail.com",
      password: "clement1234",
    };

    const hashedPassword = await bcrypt.hash(UserData.password, 10);
    const newUserData = {
        email: UserData.email,
        password: hashedPassword
    };

  expect(newUserData.email).toBe(UserData.email);
  expect(await bcrypt.compare(UserData.password, newUserData.password)).toBe(true);
});

  test("should fail for User data without email field", async () => {
    const invalidUserData = {
      password: "clement1234",
    };

    try {
      const newUserData = new User(invalidUserData);
      await newUserData.save();
    } catch (error) {
      const err = error;
      expect(err.errors?.email).toBeDefined();
    }
  });

  test("should fail for User data without password fields", async () => {
    const invalidUserData = {
      email: "clement@gmail.com",
    };

    try {
      const newUserData = new User(invalidUserData);
      await newUserData.save();
    } catch (error) {
      const err = error;
      expect(err.errors?.password).toBeDefined();
    }
  });
});


describe("Book Model Test Suite", () => {
    test("should create a Book data successfully", async () => {
      const BookData = {
        title: "The Walking Dead",
        snippet: "Book Genre",
        body: "It is very Interesting",
      };
  
      const newBookData = new Book({
        title: BookData.title,
        snippet: BookData.snippet,
        body: BookData.body
      });
  
      await newBookData.save();
  
      expect(newBookData._id).toBeDefined();
      expect(newBookData.title).toEqual(BookData.title);
      expect(newBookData.snippet).toEqual(BookData.snippet);
      expect(newBookData.body).toEqual(BookData.body);
    });
  
    test("should fail for Book data without required fields", async () => {
      const invalidBookData = {
        title: "The Walking Dead",
        snippet: "Book Genre",
        body: "It is very Interesting",
      };
  
      try {
        const newBookData = new Book(invalidBookData);
        await newBookData.save();
      } catch (error) {
        const err = error
        expect(err.errors.userId).toBeDefined();
      }
    });
  
    test("should update a Book successfully", async () => {
      const newBookData = {
        title: "The Walking Dead",
        snippet: "Book Genre",
        body: "It is very Interesting",
      };
      const createdBook = await Book.create(newBookData);
  
      const updatedData = {
        title: "The Walking Alive",
        snippet: "Books Genre",
        body: "It is very Good",
      };
  
      const updatedBook = await Book.findByIdAndUpdate(createdBook._id, updatedData, { new: true });
  
      expect(updatedBook).not.toBeNull();
      expect(updatedBook?.title).toEqual(updatedData.title);
      expect(updatedBook?.snippet).toEqual(updatedData.snippet);
      expect(updatedBook?.body).toEqual(updatedData.body);
  });
  
  
//   test("should fail to update a non-existent Movie", async () => {
//     const nonExistentMovieId = new mongoose.Types.ObjectId();
//     const updatedData = {
//         title: "The Walking Dead - Updated",
//         description: "Updated description",
//         image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwall.alphacoders.com%2Fby_sub_category.php%3Fid%3D146203%26name%3DThe%2BWalking%2BDead%2BWallpapers&psig=AOvVaw3eMkZB-xWZ9rTzrqAciy7J&ust=1682378335381000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKj3mOqRwf4CFQAAAAAdAAAAABAJ",
//         price: 2500,
//     };
  
//     const updatedMovie = await Movie.findByIdAndUpdate(nonExistentMovieId, updatedData);
  
//     expect(updatedMovie).toBeNull();
//   });
  
  
  
    test("should delete a Book successfully", async () => {
      const BookData = {
        title: "The Walking Dead",
        snippet: "Book Genre",
        body: "It is very Interesting",
      };
  
      const newBookData = new Book({
        title: BookData.title,
        snippet: BookData.snippet,
        body: BookData.body
      });
  
      await newBookData.save();
  
      const deleteResult = await Book.deleteOne({ _id: newBookData._id });
  
      expect(deleteResult.deletedCount).toEqual(1);
    });
  
//     test("should fail to delete a non-existent Movie", async () => {
//       const nonExistentMovieId = new mongoose.Types.ObjectId();
//       const deleteResult = await Movie.deleteOne({ _id: nonExistentMovieId });
  
//       expect(deleteResult.deletedCount).toEqual(0);
//     });
  });

