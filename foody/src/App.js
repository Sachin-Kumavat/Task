import CardSection from "./components/CardSection";
import Navbar from "./components/Navbar";
import React,{ useState } from "react";

function App(){

  const [activeCategory, setActiveCategory] = useState("All");
  const [input, setInput] = useState("")
  const [itemData, setItemData] = useState({})

  const handleCategoryChange=(category)=>{
    console.log(category)
    setActiveCategory(category)
    localStorage.setItem("activeCategory", category);
  }

  const handleInputChange = (inputData) => {
    setInput(inputData);
    console.log("Input data in App.js",inputData)
    // localStorage.setItem("inputData", inputData);
  }

  const handleAddItemData = (itemData) => {
    setItemData(itemData);
    console.log("Item data is :",itemData)
  }

  

// onChange={()=>handleinput(res)}
  return(
    <>
      <Navbar onCategoryChange={handleCategoryChange} onInputChange={handleInputChange} onAddItemData={handleAddItemData} />
      <CardSection activeCategory={activeCategory} input={input} itemData={itemData} />
    </>
  )
}

export default App;






















































// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
