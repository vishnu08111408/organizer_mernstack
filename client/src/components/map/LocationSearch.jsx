import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MAPBOX_TOKEN = import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN;

const LocationSearchInput = ({ setLatLng }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);
        setSuggestions([]);
        if (value.length < 3) return;
        setLoading(true);
        try {
            const res = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=5`
            );
            const data = await res.json();
            setSuggestions(data.features || []);
        } catch (err) {
            setSuggestions([]);
        }
        setLoading(false);
    };

    const handleSelect = (feature) => {
        setQuery(feature.place_name);
        setSuggestions([]);
        if (feature.center && feature.center.length === 2) {
            setLatLng({
                longitude: feature.center[0],
                latitude: feature.center[1],
            });
        }
    };

    return (
        <div className="mb-4 relative flex flex-col gap-2">
            <div className="flex gap-0">
                <input
                    type="search"
                    placeholder="Search Places ..."
                    className="location-search-input border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full shadow-sm text-base"
                    value={query}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <button
                    type="button"
                    className="bg-blue-700 hover:bg-blue-900 text-white px-6 py-2 rounded-r-lg font-bold text-base shadow border-l border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    style={{ minWidth: '110px', color: '#fff', backgroundColor: '#1d4ed8', borderLeft: '2px solid #1d4ed8' }}
                    onClick={() => {
                        if (suggestions.length > 0) {
                            handleSelect(suggestions[0]);
                        } else if (query.length >= 3 && !loading) {
                            // Trigger search if not loading and query is long enough
                            // Optionally show a message if no results
                        }
                    }}
                    disabled={loading}
                >
                    <span role="img" aria-label="search">🔍</span> Search
                </button>
            </div>
            { (loading || suggestions.length > 0) && (
                <div className="autocomplete-dropdown-container p-2 bg-white border border-gray-200 rounded-md absolute z-10 w-full mt-2 shadow-lg max-h-56 overflow-y-auto" style={{top: '100%', left: 0}}>
                    {loading && <div>Loading...</div>}
                    {suggestions.map((feature, idx) => (
                        <div
                            key={feature.id || idx}
                            className="suggestion-item cursor-pointer hover:bg-blue-100 p-2 rounded"
                            onClick={() => handleSelect(feature)}
                        >
                            <span>{feature.place_name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

LocationSearchInput.propTypes = {
    setLatLng: PropTypes.func.isRequired,
};

export default LocationSearchInput;
