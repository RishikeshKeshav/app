import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faUtensils } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
    const [zipCode, setZipCode] = useState('');
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:5001/get_data', {
                zip_code: parseInt(zipCode),
                prompt: prompt
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Mobile Food Facility</h1>
            </header>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label>
                        Zip Code:
                        <input
                            type="text"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Prompt:
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
            {loading && <div className="loader">Loading...</div>}
            {result && (
                <div className="result-container">
                    <div className="generated-text">
                        <h2>Mobile Food Facility AI</h2>
                        <p>{result.generated_text}</p>
                    </div>
                    <div className="food-items">
                        <h2>Food Items <FontAwesomeIcon icon={faUtensils} /></h2>
                        <ul>
                            {result.food_items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="applicant-names">
                        <h2>Restaurants Names <FontAwesomeIcon icon={faTruck} /></h2>
                        <ul>
                            {result.applicant_names.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="address-names">
                        <h2>Address <FontAwesomeIcon icon={faTruck} /></h2>
                        <ul>
                        {result.address_names.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
