# data-catalogue-backend

## About
This Node.js application is used to setup and query a MySQL database containing the data catalogue of Foo lab experiments. Used with [data-catalogue-frontend](https://github.com/Foo-Lab/data-catalogue-frontend).

The database was designed according to this ER model:

![photo6246913474450009700](https://user-images.githubusercontent.com/17565859/148182521-ddfc6a32-192e-4282-ae67-f4ccade74294.jpg)

## Getting Started
### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/Foo-Lab/data-catalogue-backend.git
   ```
2. Create a copy of the ```.env.default``` file and rename it to ```.env```
3. Inside the ```.env``` file, fill in your environment details (e.g. your database configuration)
4. Run ```npm install``` inside the project folder to install dependencies

## Usage
Run ```npm start``` to run the application
