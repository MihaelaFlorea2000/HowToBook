# Books
* Title - Text, required
* Author - Text, required
* Series - Text
* Description - Text
* Cover - ImageURL
* ReadStatus - String - [Read Unread Currently]
* Reads - Array of obj
  * Date Started - DateTime - now
  * Date Finished - DateTime - now
  * Rating - Number 1-5 - 0
  * Review - Text - null

# Shelf
* Title - Text
* Books - Array of BookIds
* Image - ImageURL

* [x] GET /books
  * List all books
* [x] GET /books/:bookId
  * List a book
* [x] POST /books/add
  * Create a new book
* [x] PATCH /books/:bookId/
  * Edit a book - change the initial info
* [x] PATCH /books/:bookId/:readStatus
  * Edit a book - mark as read / currently reading and add reviews
* [x] DELETE /books/:bookId
  * Delete a book

* [x] GET /shelves
  * List all shelves
* [x] GET /shelves/:shelfId
  * List a shelf
* [x] POST /shelf/add
  * Create a new shelf
* [x] PATCH /shelves/:shelfId/
  * Edit a shelf - change shelf details
* [x] PATCH /shelves/:shelfId/add/:bookId
  * Edit a shelf - add new book to shelf
* [x] PATCH /shelves/:shelfId/remove/:bookId
  * Edit a shelf - remove book from shelf
* [x] DELETE /shelves/:shelfId
  * Delete a shelf
