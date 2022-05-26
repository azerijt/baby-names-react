import BabyNames from "./data/babyNamesData.json";
import React, { useState } from "react";
import "./App.css";

interface BabyNamesProps {
  name: string;
  id: number;
  sex: string;
}

function App(): JSX.Element {
  const babyNames: BabyNamesProps[] = BabyNames.sort(function (a, b) {
    return a.name > b.name ? 1 : a === b ? 0 : -1;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [favouriteNames, setFavouriteNames] = useState<BabyNamesProps[]>([]);
  const showFilterNames = babyNames.filter(filterSearch);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }
  function filterSearch(nameInfo: BabyNamesProps): boolean {
    return nameInfo.name.toLowerCase().includes(searchTerm.toLowerCase());
  }

  function isInFavouriteNamesList(target: BabyNamesProps) {
    return favouriteNames.find((x) => x.id === target.id) !== undefined;
  }
  function handleClickMainList(nameInfo: BabyNamesProps) {
    if (isInFavouriteNamesList(nameInfo)) {
      window.alert(`${nameInfo.name} is already in list`);
    } else {
      const newFavouriteNames = [...favouriteNames, nameInfo];
      setFavouriteNames(newFavouriteNames);
    }
  }

  function handleClickFavourites(nameInfo: BabyNamesProps) {
    const newFavouriteNames = favouriteNames.filter(
      (x) => x.id !== nameInfo.id
    );
    setFavouriteNames(newFavouriteNames);
  }

  return (
    <div className="App">
      <h1 className="head">Baby Names </h1>

      <input
        placeholder="Search names..."
        value={searchTerm}
        onChange={handleOnChange}
      />
      <p>
        {" "}
        Showing {showFilterNames.length} of {babyNames.length} total names
      </p>

      <hr />
      <h2>Favourite Names</h2>

      <div className="babyNameList">
        {favouriteNames.length === 0 && (
          <p>Click on a name to add to favourites</p>
        )}
        {favouriteNames.map((nameInfo) => (
          <div
            onClick={() => handleClickFavourites(nameInfo)}
            className={"babyName " + nameInfo.sex}
            key={nameInfo.id}
          >
            {nameInfo.name}
          </div>
        ))}
      </div>
      {favouriteNames.length > 0 && (
        <p>Click a name to remove from favourites</p>
      )}
      <hr />

      <div className="babyNameList">
        {showFilterNames.map((nameInfo) => (
          <div
            className={"babyName " + nameInfo.sex}
            key={nameInfo.id}
            onClick={() => handleClickMainList(nameInfo)}
          >
            {nameInfo.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
