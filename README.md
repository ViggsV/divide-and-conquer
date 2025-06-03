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


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
