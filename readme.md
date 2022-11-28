# Crawler Backend

- This application is simply display the list of crawler job.
- Following are the key feature of this application
  - User can add product url from - [flaconi](https://www.flaconi.de/accessoires/flaconi/diy-geschenkverpackung/flaconi-diy-geschenkverpackung-black-edition-geschenkverpackung.html#sku=80055137-1)
  - After product is added it will show the live status of crawling job.
  - We are using `reduxjs & socket.io` to display live data.

# How to setup Backend Repository

- You require these tools installed beforehand:

  - NodeJS https://nodejs.org/en/download/
    - This application was created on nodejs v14.16.1. Please install that for smooth and error free operation.
  - You need to have postgres database installed

- Clone the repo:

  - https://github.com/radhakishan404/crawler-backend.git

- To start the application, run these commands:

  - `npm install`: to install all the package in your project
  - `npm run dev`: to start the server

- After that your server will start at : `localhost:4000`.
