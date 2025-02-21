import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showResponse, setShowResponse] = useState(false);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setShowResponse(false);
        setResponse(null);

        try {
            const jsonData = JSON.parse(input);
            const res = await axios.post('https://testbfhl.herokuapp.com/bfhl', jsonData);
            setResponse(res.data);
            setShowResponse(true);
        } catch (err) {
            setError('Invalid JSON format. Please enter valid JSON.');
        }
    };

    const handleOptionChange = (e) => {
        const value = e.target.value;
        setSelectedOptions((prev) =>
            prev.includes(value) ? prev.filter((option) => option !== value) : [...prev, value]
        );
    };

    const renderResponse = () => {
        if (!response) return null;

        const { numbers, alphabets, highest_alphabet } = response;

        return (
            <div>
                {selectedOptions.includes('Alphabets') && (
                    <div>
                        <h3>Alphabets:</h3>
                        <p>{alphabets.length > 0 ? alphabets.join(', ') : 'None'}</p>
                    </div>
                )}
                {selectedOptions.includes('Numbers') && (
                    <div>
                        <h3>Numbers:</h3>
                        <p>{numbers.length > 0 ? numbers.join(', ') : 'None'}</p>
                    </div>
                )}
                {selectedOptions.includes('Highest alphabet') && (
                    <div>
                        <h3>Highest Alphabet:</h3>
                        <p>{highest_alphabet.length > 0 ? highest_alphabet.join(', ') : 'None'}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="App">
            <h1>ABCD123</h1> {/* Replace with your roll number */}
            <form onSubmit={handleSubmit}>
                <textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder='Enter JSON here, e.g., {"data": ["A", "C", "z"]}'
                    rows="4"
                    cols="50"
                />
                <br />
                <button type="submit">Submit</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            {showResponse && (
                <div>
                    <h2>Select Options to View Response:</h2>
                    <label>
                        <input
                            type="checkbox"
                            value="Alphabets"
                            onChange={handleOptionChange}
                        />
                        Alphabets
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Numbers"
                            onChange={handleOptionChange}
                        />
                        Numbers
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Highest alphabet"
                            onChange={handleOptionChange}
                        />
                        Highest Alphabet
                    </label>
                    {renderResponse()}
                </div>
            )}
        </div>
    );
}
