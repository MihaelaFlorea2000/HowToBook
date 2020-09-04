# Books
* Title - Text, required
* Author - Text, required
* Series - Text
* Description - Text
* Cover - ImageURL
* Read - Boolean - false
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
                - mark as read and add extra info
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
                 - add new book to shelf
* [x] DELETE /shelves/:shelfId
  * Delete a shelf
