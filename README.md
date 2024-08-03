
# Note-Taking API

## Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/Harpal2000/Notes_Taking_App_Node.js.git
   cd note-taking-api
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the server:
   ```sh
   npm start
   ```


## Example

### Using Postman

1. **Create a new note:**
   - Method: `POST`
   - URL: `http://localhost:3000/notes`
   - Body (JSON):
     ```json
     {
       "title": "Sample Note",
       "content": "This is a sample note.",
       "tags": ["tag1", "tag2"]
     }
     ```

2. **Retrieve all notes:**
   - Method: `GET`
   - URL: `http://localhost:3000/notes`

3. **Retrieve a single note by its ID:**
   - Method: `GET`
   - URL: `http://localhost:3000/notes/1`

4. **Update a note by its ID:**
   - Method: `PUT`
   - URL: `http://localhost:3000/notes/1`
   - Body (JSON):
     ```json
     {
       "title": "Updated Note"
     }
     ```

5. **Delete a note by its ID:**
   - Method: `DELETE`
   - URL: `http://localhost:3000/notes/1`

6. **Add tags to a note:**
   - Method: `PUT`
   - URL: `http://localhost:3000/notes/1/tags`
   - Body (JSON):
     ```json
     {
       "tags": ["tag3"]
     }
     ```

7. **Remove tags from a note:**
   - Method: `DELETE`
   - URL: `http://localhost:3000/notes/1/tags`
   - Body (JSON):
     ```json
     {
       "tags": ["tag1"]
     }
     ```

8. **Retrieve notes based on a logical tag query:**
   - Method: `GET`
   - URL: `http://localhost:3000/notes/query?tags=tag1,tag2&condition=AND`
