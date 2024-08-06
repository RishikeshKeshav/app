### Introduction

The Mobile Food Facility application streamlines the process of finding mobile food facilities by integrating a user-friendly interface with advanced AI-powered search capabilities. 
It enables users to easily discover relevant food vendors in their area and access detailed information based on their specific preferences.

### Why This Project?

1. Streamlined Access: Simplifies discovering local mobile food facilities through an intuitive interface and robust backend processing.

2. AI-Enhanced Search:  Uses Generative AI to extract relevant food-related keywords from user prompts, offering a more precise search experience.

3. Empowering Users: Provides actionable insights on food items, restaurants, and addresses, helping users make informed dining choices and supporting local businesses.

4. Technological Innovation: Combines Flask and React to demonstrate practical applications of modern web technologies and AI in solving real-world problems.

5. Community Engagement: Enhances access to food facilities, fostering community engagement and supporting local vendors.

### Overall Vision

The project bridges the gap between users and food service providers, delivering a seamless, efficient experience through advanced technology and data processing.





# Mobile Food Facility Data API (Server)

The Flask application fetches and processes data from a CSV file hosted on GitHub.
It provides an endpoint to filter and return food-related data based on a user's zip code and a prompt.
The prompt is processed using Google's Generative AI to extract relevant food-related keywords.
The application supports Cross-Origin Resource Sharing (CORS) to allow requests from different origins.

## Features

1. Fetch Data from GitHub: Downloads a CSV file containing mobile food facility permit data from a GitHub repository.
2. Generative AI for Keyword Extraction: Utilizes Google's Generative AI to extract food-related keywords from a user-provided prompt.
3. Data Filtering: Filters the food facility data based on a given zip code and the extracted keywords.
4. JSON API: Provides a JSON API endpoint that returns filtered data, including food items, applicant names, and addresses.

```
```
## Prerequisites

1. Python: Ensure Python3 is installed on your machine.
2. Virtual Environment: It is recommended to use a virtual environment to manage dependencies.

## Setup Instructions

1. **Clone the Project**:
   ```bash
   git clone https://github.com/RishikeshKeshav/mobile_facility.git
   cd server
   

2. **Create and Activate Virtual Environment**:
   - On Windows:
     ```bash
     python3 -m venv venv
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```bash
     python -m venv venv
     source venv/bin/activate
     ```

3. **Install Dependencies**:
   ```bash
   pip3 install Flask flask-cors pandas requests python-dotenv google-generativeai
   ```

4. **Create `.env` File**:
   Create a `.env` file in the project directory with the following content:
   ```dotenv
   GOOGLE_API_KEY= { "I can Provide you with API Key if required" }
   ```

5. **Run the Application**:
   ```bash
   python3 app.py
   ```

### Loading Environment Variables

The `load_dotenv` function loads environment variables from the `.env` file.

### Fetching CSV Data

The application uses the `requests` library to download the CSV file from the specified GitHub URL and loads it into a pandas DataFrame.

### Setting Up Generative AI

The API key for Google's Generative AI is configured using the `genai.configure` method.

### Endpoint `/get_data`

#### Request

Accepts a JSON payload with `zip_code` and `prompt`.

```json
{
  "zip_code": "94110",
  "prompt": "Looking for tacos and burritos"
}
```

#### Response

Returns filtered data including food items, applicant names, and addresses that match the keywords extracted from the prompt.

```json
{
  "food_items": ["Tacos", "Burritos"],
  "applicant_names": ["Some Applicant"],
  "address_names": ["123 Some Street"],
  "generated_text": ["tacos", "burritos"]
}
```

## API Endpoint

### POST `/get_data`

- **Request**:
  ```json
  {
    "zip_code": "28854",
    "prompt": "Looking for tacos and burritos"
  }
  ```

- **Response**:
  ```json
  {
    "food_items": ["Tacos", "Burritos"],
    "applicant_names": ["Applicants "],
    "address_names": ["786 Street"],
    "generated_text": ["tacos", "burritos"]
  }
  ```

## Security

- **Environment Variables**: Sensitive information such as the API key is stored in the `.env` file and loaded at runtime.
- **CORS**: The application uses `flask-cors` to handle CORS and allow cross-origin requests.


== CLIENT ==



# Mobile Food Facility React App

The React application interfaces with a Flask backend to fetch and display food-related data based on user inputs for a zip code and a prompt.
The data is processed using Google's Generative AI to extract relevant keywords, and then filtered from a dataset of mobile food facilities.

## Features

1. User Input Form: Accepts zip code and a prompt from the user.
2. Loading Indicator: Displays a loading indicator while fetching data from the backend.
3. Data Display: Shows the extracted keywords, food items, applicant names, and addresses that match the user's input.


## Prerequisites

1. Node.js and npm: Ensure Node.js and npm are installed on your machine.

## Setup Instructions

1. **Clone the Project**:
   ```bash
   git clone https://github.com/RishikeshKeshav/mobile_facility.git
   cd Client
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the React Application**:
   ```bash
   npm start
   ```

   The application will run on `http://localhost:3000`.


### Components

- App: The main component that renders the user input form and displays the results.
- useState: Manages state for zip code, prompt, result, and loading status.
- axios: Used to make HTTP POST requests to the Flask backend.

### Form Submission

- When the form is submitted, the `handleSubmit` function is triggered.
- The function sends a POST request to `http://127.0.0.1:5001/get_data` with the zip code and prompt.
- The backend processes the request and returns the filtered data.
- The results are then displayed on the UI.

### UI Components

- Header: Displays the application title.
- Form: Includes input fields for zip code and prompt, and a submit button.
- Loader: Shows a loading message while data is being fetched.
- Result Container: Displays the generated keywords, food items, applicant names, and addresses in a structured format with FontAwesome icons.

## API Endpoint

### POST `/get_data`

- **Request**:
  ```json
  {
    "zip_code": "28854",
    "prompt": "Looking for tacos and burritos"
  }
  ```

- **Response**:
  ```json
  {
    "food_items": ["Tacos", "Burritos"],
    "applicant_names": ["Some Applicant"],
    "address_names": ["123 Some Street"],
    "generated_text": ["tacos", "burritos"]
  }
  ```

## Dependencies

- axios: Promise-based HTTP client for the browser and Node.js.
- react: JavaScript library for building user interfaces.
- react-dom: Entry point to the DOM and server renderers for React.
- @fortawesome/react-fontawesome: FontAwesome React component library.
- @fortawesome/free-solid-svg-icons: Solid style icons for FontAwesome.
- react-scripts: Configuration and scripts for Create React App.



### Thank You


