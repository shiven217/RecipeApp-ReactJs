import React, { useState} from "react";
import "./App.css";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";
import Particles from 'react-particles-js';
import Linear from './components/Linear';

const particles={
  particles: {
    number:{
      value:70,
      density:{
        enable:true,
        value_area:800
      }
    
    }
    
  }
}

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const[loading,setLoading]=useState(false);

  const APP_ID = "4e9f05eb";
  const APP_KEY = "9b904d703fa0d46a88ce1ac63f29f498";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      
      if (!result.data.more) {
        return setAlert("No food with such name");
        setLoading(false);  
      }
      setRecipes(result.data.hits);
      setAlert("");
      setLoading(false);  
      
    } else {
      setAlert("Please fill the form");
      setLoading(false);  
    }
  };

  const onChange = e => setQuery(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    getData();
    
  };

  return (
    <div className="App">
    <Particles className="particle"
              params={particles}
            />

      <h1>Let's try out some food</h1>
      
      <form onSubmit={onSubmit} className="search-form">
        {alert !== "" && <Alert alert={alert} />}
        <input
          type="text"
          name="query"
          onChange={onChange}
          value={query}
          autoComplete="off"
          placeholder="Search Food"
        />
        <button  className="btn">Search</button>
               </form>
      <div className="recipes">
        {loading ? <Linear/> : recipes !== [] &&
          recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>      
    </div>
  );
}

export default App;
