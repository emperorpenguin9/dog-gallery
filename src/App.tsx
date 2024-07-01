import React, { useEffect, useState } from "react";
import "./App.css";

type BreedObj = {
  breed: string;
  dogImgUrl: string;
};

function App() {
  // Get dog breed data
  const [breeds, setBreeds] = useState<BreedObj[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`https://dog.ceo/api/breeds/list/all`);
      const data = await response.json();
      const breeds = Object.keys(data.message);

      const breedPromises = breeds.map(async (breed) => {
        const imgURL = `https://dog.ceo/api/breed/${breed}/images/random`;
        const res = await fetch(imgURL);
        const imgData = await res.json();

        return { breed, dogImgUrl: imgData.message as string };
      });

      const breedImages = await Promise.all(breedPromises);

      setBreeds(breedImages);
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <div id="js_loading">Loading....</div>
      ) : (
        <div id="js_gallery">
          {!!breeds &&
            breeds.map(({ breed, dogImgUrl }, idx) => (
              <div className="gallery-item" key={idx}>
                <img src={dogImgUrl} alt={breed} className="js_img" />
                <div className="js_name">{breed}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
