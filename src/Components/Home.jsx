import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Home.css";
import Cards from "./Cards";
import Items from "./Items";

const Home = () => {
  const [species, setSpecies] = useState([]);
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
  const navigate = useNavigate();

  // Fetch data initially (for the first page or all items)
  useEffect(() => {
    const fetchSpeciesData = async () => {
      try {
        const response = await axios.get(
          "https://perenual.com/api/species-list?key=sk-CssK66efa1cace0d36943&page=1"
        );
        setSpecies(response.data.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching species data:", err);
        setError("Failed to fetch species data");
        setIsLoading(false);
      }
    };

    fetchSpeciesData();
  }, []);

  // Function to fetch species based on search query
  const handleSearch = async () => {
    setIsLoading(true); // Show loading state while fetching
    try {
      const response = await axios.get(
        `https://perenual.com/api/species-list?key=sk-CssK66efa1cace0d36943&q=${searchQuery}`
      );
      setSpecies(response.data.data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error searching species data:", err);
      setError("Failed to search species data");
      setIsLoading(false);
    }
  };

  // Function to handle adding selected plant
  const handleSelectPlant = (plant) => {
    setSelectedPlants((prevSelectedPlants) => [...prevSelectedPlants, plant]);
  };

  // Function to handle removing selected plant
  const handleDeletePlant = (plantId) => {
    setSelectedPlants((prevSelectedPlants) =>
      prevSelectedPlants.filter((plant) => plant.id !== plantId)
    );
  };

  const handleSubmit = () => {
    navigate("/invoice", { state: { selectedPlants } });
  };

  return (
    <>
      <div className="d-flex">
        {/* All items section */}
        <section className="all-items">
          <div className="header">
            <h2>All Items</h2>

            {/* Search bar and button */}
            <div className="search-bar">
              <input
              className="form-control form-control-sm"
                type="text"
                placeholder="Search for a plant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={handleSearch} className="btn btn-primary">Search</button>
            </div>
          </div>

          <div className="species-list">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              species.map((item) => (
                <Cards
                  key={item.id}
                  id={item.id}
                  common_name={item.common_name}
                  scientific_name={item.scientific_name}
                  imgURL={item.default_image?.original_url || ""}
                  onSelect={() =>
                    handleSelectPlant({
                      id: item.id,
                      common_name: item.common_name,
                      scientific_name: item.scientific_name,
                      imgURL: item.default_image?.original_url || "",
                    })
                  }
                />
              ))
            )}
          </div>
        </section>

        {/* Selected items section */}
        <section className="Selected-items">
          <div className="header">
            <h2>Selected Items</h2>
          </div>
          <div className="selected-plant-list">
            {selectedPlants.length > 0 ? (
              selectedPlants.map((plant, index) => (
                <Items
                  key={index}
                  img={plant.imgURL}
                  common_name={plant.common_name}
                  scientific_name={plant.scientific_name}
                  onDelete={() => handleDeletePlant(plant.id)}
                />
              ))
            ) : (
              <p>No plants selected</p>
            )}
            {/* Render Submit button when there are selected plants */}
            {selectedPlants.length > 0 && (
              <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
