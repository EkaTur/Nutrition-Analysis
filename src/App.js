import { useEffect, useLayoutEffect, useState } from 'react';
import './App.css';
import LoaderPage from './Loader/LoaderPage';
import Nutrition from './Nutrition';
import gsap from 'gsap';
import video from './Assets/background.mp4'

function App() {
  const APP_ID = '1029c529';
  const APP_KEY = '0e2e08e15c0af5b7f350a601445a14b3';
  const APP_URL = 'https://api.edamam.com/api/nutrition-details'

  const [search, setSearch] = useState('');
  const [myAnalysis, setMyAnalysis] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [stateLoader, setStateLoader] = useState(false);

  useLayoutEffect(() => {
    gsap.fromTo('.header', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 3 });
    gsap.fromTo('.input', { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 3 });
    gsap.fromTo('.btn', { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 3 });
  }, [])

  useEffect(() => {
    gsap.fromTo('.AnalysisContainer', { opacity: 0 }, { opacity: 1, duration: 3 });
  }, [myAnalysis])

  const newAnalysis = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(`${APP_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ingr})
    });
    if (response.ok) {
      setStateLoader(false);
      const info = await response.json();
      setMyAnalysis(info);
    } else {
      setStateLoader(false);
      alert('Ingredients entered incorrectly. Example: 1 banana');
    }
  }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      newAnalysis(ingr);
    }
    
  }, [wordSubmitted]);

  const productSearch = (e) => {
    setSearch(e.target.value);
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(search);
  }

  return (    
    <div>
      
      {stateLoader && <LoaderPage />}
      
      <div>
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
      </div>

      <div className='containerHeader'>
        <h1 className='header'>Nutrition Analysis</h1>
      </div>
      <div className='containerSearch'>
        <form onSubmit={finalSearch}>
          <input className='input' placeholder='Type here ...' onChange={productSearch} value={search}></input>
          <button onClick={finalSearch} className='btn'>SEARCH</button>
          </form>
      </div>
      <div className='AnalysisContainer'>
        {
          myAnalysis && Object.values(myAnalysis.totalNutrients).map(({label, quantity, unit}) => 
            <Nutrition
            key={label}
            label={label}
            quantity={quantity}
            unit={unit}/>
          )
        }
      </div>
    </div>
  );
}

export default App;
