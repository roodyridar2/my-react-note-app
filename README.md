# NoteApp

NoteApp is a web application that allows users to create, update, delete, and manage notes. Users can make notes public or private, like public notes created by other users, and upload images for their notes. The application also includes an admin page where admins can manage users and their notes. This app is built using React and Express.js, and incorporates various libraries for functionality and styling.

## Features

- **User Authentication**: Users can sign up, log in, and log out.
- **Note Management**: Create, update, delete notes.
- **Visibility Control**: Make notes public or private.
- **Like Notes**: Like public notes created by other users.
- **Image Upload**: Upload images for notes.
- **Admin Page**: Admin can delete all users and their notes.
- **Rich Text Editor**: Use ReactQuill for note content.
- **Date Formatting**: Use Moment.js for date formatting.

## Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **JWT (jsonwebtoken)**: For authentication.
- **Cookie-parser**: To handle cookies.
- **Multer**: For handling file uploads.
- **bcryptjs**: For password hashing.
- **Knex.js**: SQL query builder for MySQL.

### Frontend
- **React**
- **Ant Design**: UI component library.
- **Axios**: For making HTTP requests.
- **Moment.js**: For date manipulation.
- **ReactQuill**: Rich text editor.

## Installation

### Prerequisites

- Node.js and npm installed.
- MySQL database set up.

### Steps

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/noteapp.git
    cd noteapp
    ```

2. **Install backend dependencies**
    ```bash
    cd api
    npm install
    ```

3. **Set up the database**
    - Create a MySQL database and update the Knex configuration in `knexfile.js`.
    - Run migrations to set up tables:
    ```bash
    npx knex migrate:latest
    ```

4. **Start the backend server**
    ```bash
    npm run dev
    ```

5. **Install frontend dependencies**
    ```bash
    cd ../client
    npm install
    ```

6. **Start the frontend development server**
    ```bash
    npm run dev
    ```

## Postman Collection

A Postman collection is included to help you test the API endpoints. You can import the collection into Postman using the provided file `NoteApp.postman_collection.json`.


## Contact

For any inquiries or support, please contact us at [ayub.pro2025@example.com](mailto:ayub.pro2025@example.com).

