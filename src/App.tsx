import BabyNames from './data/babyNamesData.json'
import React, {useState} from 'react';
import './App.css'

interface BabyNamesProps{
  name:string;
  id: number;
  sex:string;
}

function App(): JSX.Element {
  const babyNames: BabyNamesProps[]= BabyNames.sort(function(a, b) { return (a.name > b.name ? 1 : (a === b ? 0 : -1)) })
  const [searchTerm, setSearchTerm] = useState('');
  const showFilterNames = babyNames.filter(filterSearch);
  console.log(showFilterNames)
  

  function handleOnChange(event:any){
    setSearchTerm(event.target.value);
  }
  function filterSearch(nameInfo: BabyNamesProps): boolean{
    return nameInfo.name.toLowerCase().includes(searchTerm.toLowerCase())

  }





  return(
    
      <div className="App">
       <h1>Baby Names </h1> 

       <input
       placeholder="Search names..."
       value = {searchTerm}
       onChange = {handleOnChange}
       />
       <p> Showing {showFilterNames.length} of {babyNames.length} total names</p>

       <hr/>
 
      <div className="babyNameList"> 
      {showFilterNames.map(nameInfo => (
        <div
        className={"babyName "+ nameInfo.sex}
        key={nameInfo.id}
        >{nameInfo.name}</div>
      ))}
      </div>
        
      </div>
  )
}

export default App;
