import React, { useState } from 'react';
import axios from 'axios';
import HomeLayout from '../../Layouts/HomeLayouts';

const CitySearch = () => {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    if (searchQuery.length < 2) {
      // Return early if query is too short
      setCities([]);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get('https://us1.locationiq.com/v1/autocomplete.php', {
        params: {
          key: 'pk.2bc21e092c881e1b4035ef20f9da09f6', // Replace with your LocationIQ API key
          q: searchQuery,
          format: 'json'
        }
      });

      // Filter results to show only city names
      const cityResults = response.data.map(item => item.display_name).filter(name => name.includes('India'));
      setCities(cityResults);
    } catch (err) {
      setError('Error fetching city data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <HomeLayout>
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a city..."
        className="border p-2 rounded"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="mt-2">
        {cities.length > 0 ? (
          cities.map((city, index) => (
            <li key={index} className="border-b py-2">
              {city}
            </li>
          ))
        ) : (
          <li>No cities found</li>
        )}
      </ul>
    </div>
    </HomeLayout>
  );
};

export default CitySearch;
