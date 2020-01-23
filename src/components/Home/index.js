import React from "react";
import Footer from "../Footer";
import { useSelector, useDispatch } from "react-redux";
import EbbtideWordmark from '../../svg/EbbtideWordmark';
import EbbtideLogo from '../../svg/EbbtideLogo';
import SearchIcon from '../../svg/SearchIcon';
import StationApi from '../StationApi';
import "./homepage.scss";
import "./waves.scss";
import "./form.scss";


// Station Match
function stationMatch(formInput, stationList, props){
	stationList.stations.map((station, index) => {
		console.log((station.name).toLowerCase());
		if((formInput.toLowerCase() === (station.name).toLowerCase()) || (formInput === station.id)) {
			props.history.push(`/tide/${station.id}`);
		}
	});
}

// HOME
function Home(props){
	
  // Redux function
  const dispatchRedux = useDispatch();
  
  // Redux State
  const stationInput = useSelector(appState => appState.home.stationInput),
				stationData = useSelector(appState => appState.station.stationData);
	
	console.log(stationInput);

  // Handle Form Change
  const handleChange = e => {
    const newTypedStation = (e.target.value).toLowerCase();
    dispatchRedux({ type: "setStationInput", payload: newTypedStation });
  };

  // Handle Form Submit
  const handleSubmit = async e => {
    e.preventDefault();
    dispatchRedux({ type: "setHomeStation", payload: stationInput.toLowerCase() });
    stationMatch(stationInput, stationData, props);
  };
  
	// Homepage View
  return (
    <div className="homepage">
      <header className="branding">
        <EbbtideLogo />
        <h1><EbbtideWordmark /></h1>
      </header>
      <main className="main">
        <section>
          <form className="station-form" onSubmit={handleSubmit} >
            <div className="autocomplete">
              <input
                className="station-form__input"
                onChange={handleChange}
                placeholder='tide location...'
                value={stationInput}
                type="text"
              />
              <button
                className="station-form__button"
                id="button"
                type="submit"
              >
                <SearchIcon />
              </button>
    					<StationApi />
            </div>
          </form>
          <div className="waves"></div>
          <div className="waves"></div>
          <div className="waves"></div>
        </section>
      </main>
      <Footer />
    </div>
  )
	
}

export default Home;