# divide-and-conquer

An MVP for a Roommate Chore & Bill Organizer that helps roommates register, assign chores, log shared expenses, and view a fairness summary. This initial version focuses on core functionality without advanced features like push notifications or receipt image uploads.

---

## Features

- **User Registration & Authentication**  
  - Secure sign-up and login using email/password  
  - Passwords hashed with bcrypt

- **Chore Management**  
  - Create, assign, and mark chores as completed  
  - Each chore has a title, description, assignee, due date, and status

- **Expense Tracking**  
  - Log shared expenses with title, amount, date, and who paid  
  - Automatically split expenses equally among all registered roommates

- **Fairness Summary Dashboard**  
  - Overview of total chores assigned vs. completed per user  
  - Breakdowns of each user’s share of overall expenses  
  - Net balance calculation to show who owes whom (or who’s owed)

- **Role-based Access (MVP)**  
  - Basic user roles (all roommates have the same privileges in this version)  

---

## Tech Stack

- **Backend**  
  - [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)  
  - [MongoDB](https://www.mongodb.com/) (hosted locally or via Atlas)  
  - [Mongoose](https://mongoosejs.com/) ODM for schema modeling  
  - [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing  
  - [nodemon](https://www.npmjs.com/package/nodemon) for development

- **Dependencies & Dev Tools**  
  - `dotenv` for environment variables  
  - `cors` for cross-origin requests (if front-end served separately)  

- **Database**  
  - MongoDB 

---

