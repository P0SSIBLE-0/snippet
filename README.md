# Snippets App

Snippets is a code snippet management tool designed for developers to create, save, and share their snippets with ease. Built with modern technologies like **Next.js**, **Node.js**, **MongoDB**, and **TailwindCSS**, the app provides an efficient platform for managing and sharing code in multiple programming languages.

## Features

- **Create, Edit, Delete Snippets**: Manage your code snippets with full CRUD functionality.
- **Public & Private Snippets**: Choose whether your snippets are shared with others or kept private.
- **Multi-language Support**: Highlight and format snippets for a variety of programming languages.
- **Search & Filter**: Easily find your snippets using the search functionality.
- **User Authentication**: Secure user accounts powered by Clerk for authentication.
- **Responsive Design**: Fully responsive UI built with TailwindCSS, ensuring a seamless experience on all devices.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Clerk

## Getting Started

### Prerequisites

- **Node.js**
- **MongoDB** (installed locally or accessible via MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/P0SSIBLE-0/snippet

2. Navigate into the project directory:
   ```
   cd snippets-app
3. Install the dependencies:
   ```
   npm install
4. Set up the environment variables:
   Create a .env.local file in the root of your project and add the following:
   ```
    MONGODB_URI=<your-mongodb-connection-string>
    NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api-key>
    CLERK_API_KEY=<your-clerk-api-key>
   ```
5. Start the development server:
   ```
   npm run dev
6. Open your browser and go to:
   ```
   http://localhost:3000
