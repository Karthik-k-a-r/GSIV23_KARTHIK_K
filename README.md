## GSIV23_KARTHIK_K

Check out the deployed App - https://karthik-k-a-r.github.io/GSIV23_KARTHIK_K/

# MovieFusion: Movie Information App

Welcome to MovieFusion, web application designed to provide users with information about upcoming movies, detailed movie pages and search functionality.
Tech Stack - ReactJS, JavaScript, Tailwind CSS, HTML.

# Features

- View Upcoming Movies: Explore a curated list of upcoming movies with brief information.
- Movie Detail Pages: Get detailed information about each movie by clicking on their individual pages.
- Search Capability: Easily search for movies based on titles.

# Getting Started

Follow these steps to set up and run the MovieFusion app:

## **Clone the Repository:**
    git clone <repository_url>
## **Checkout to folder**
    cd GSIV23_KARTHIK_K

## **Install Dependencies:**
    npm install

## **Set Up API Key:**
Rename `.env.example` to `.env` and provide your movie API key and movie Base URL.

## **Run the App:**
    npm start

## **Access the App:**
Open your web browser and go to `http://localhost:3000` to access MovieFusion.

# Brief description of main technology/library I have mentioned in my React project:

## React Router DOM: 
Used for handling client-side routing and navigation in a single-page application.(I have used it to enabling navigation between different views without requiring a full page reload between list and details page)

## HashRouter 
Used HashRouter a React Router component that helps ensure that routing works correctly in deployed sites by using URL hashes to manage different routes within a single-page application.(I have used it to deploy the MovieFusion app in the web hosting environment of GitHub Pages)

## Tailwind CSS
Used for rapidly styling components with utility classes.(Which allows to rapidly build custom designs by composing small utility classes)

## Tailwind Line Clamp 
Used for truncating text with ellipsis after a certain number of lines/text.(I have used to ellipsis movie name and description)

## Lodash
Used for optimizing performance by debouncing function calls.(I have used used it to limit the frequency of invoking a function to improve performance while searching movie)

## React Infinite Scroll Component 
Used for implementing infinite scrolling in the application.(I have used to create dynamic scrolling experience as the user scrolls down the page, providing a seamless and efficient way to display upcoming movie details)

## Material-UI and Icons 
Used for designing the UI components and icons (Search,Home icon etc..).

# Additional improvements recomended for the MovieFusion app.

## Axios
JavaScript library for making HTTP requests. By using this we can improve the efficiency and reliability of data fetching as it supports some additional features like interceptors for request and response manipulation, request cancellation, and handling different types of responses.(As this MovieFusion requires minimal number of API calls, I used simple fetch API (return promise))

## Redux
It is a state management library that helps to manage the state of application in a more organized manner. It's particularly beneficial for apps with complex data flows/shared states between components. (As this MovieFusion requires minimal/no state management, I used local state for storing the data) 

## Jest for Testcases
It is a JavaScript testing framework.Test-driven development (TDD) or writing tests after implementation can improve the overall quality and stability of the app.

