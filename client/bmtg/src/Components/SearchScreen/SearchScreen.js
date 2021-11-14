import axios from "axios";
import React, {useState} from "react";
import SearchResult from "./SearchResult";
import "./SearchScreen.css";
import {useNavigate} from 'react-router-dom'
import {makeGetRequest} from "../../makeGetRequest";
import DJANGO_URL from "../../constants";

function SearchScreen() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [allPlaces, setAllPlaces] = useState([])
    const [loader, setLoader] = useState(false);
    const [closeIcon, setCloseIcon] = useState(false)
    let allPlacesSecond = [];


    const performLiveSearch = async (searchText) => {

        if (searchText.length === 0) {
            setCloseIcon(false);
            allPlacesSecond = []
            setSearchResults(allPlacesSecond);
        } else if (searchText.length === 1) {
            setLoader(true);
            setCloseIcon(true);
            const response = await makeGetRequest(DJANGO_URL + "/guide/search");
            const temp = response.data.places.concat(response.data.citys);
            allPlacesSecond = temp;
            setAllPlaces(temp);
            setLoader(false);
            let matches = allPlacesSecond.filter((place) => {
                const regex = new RegExp(`^${searchText}`, "gi");
                console.log(place)
                if (place.place_name)
                    return place.place_name.match(regex)
                else if (place.city)
                    return  place.city.match(regex)
            });
            console.log(matches)
            setSearchResults(matches);
            return ;
        }
        let matches = allPlaces.filter((place) => {
            const regex = new RegExp(`^${searchText}`, "gi");
                if (place.place_name)
                    return place.place_name.match(regex)
                else if (place.city)
                    return  place.city.match(regex)
        });
        console.log(matches)
        setSearchResults(matches);
    };

    const fetchSearchResults = (e) => {
        setSearchText(e.target.value);
        performLiveSearch(e.target.value)
    }

    return (
        <div>
            <div className="realSearchBoxContainer">
                <i
                    className="fa fa-angle-left"
                    style={{
                        position: "absolute",
                        top: "16px",
                        left: "10px",
                        color: "#f78383",
                        fontSize: "20px",
                    }}
                    onClick={() => navigate(-1)}
                />
                <input
                    type="text"
                    value={searchText}
                    onInput={(e) => fetchSearchResults(e)}
                    id="realSearchBox"
                    name=""
                    placeholder="Search For Places..."
                />
                <i
                    className={closeIcon ? 'fa fa-times' : 'fa fa-search'}
                    style={{
                        position: "absolute",
                        top: "18px",
                        right: "20px",
                        color: "#f78383",
                        fontSize: "17px",
                    }}
                />
            </div>
            <div className="searchResults">
                {searchResults.map(result => <SearchResult key={result.id} data={result}/>)}
            </div>
        </div>
    );
}

export default SearchScreen;
