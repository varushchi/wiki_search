import './App.css';
import React, { useState } from 'react'
import axios from 'axios'
import ResultItem from './ResultItem';

function App() {

  const [searchResult, setSearchResult] = useState(null)
  const [searchInput, setSearchInput] = useState('')

  async function getSearchResult(){
    const res = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&origin=*&srlimit=10&utf8=&format=json&srsearch=${searchInput.trim()}`)
    if (res.status === 200){
      setSearchResult(res.data.query.search)
    }
  }

  async function getRandomPage(){
    const res = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/random/summary`)
    if (res.status === 200){
      const randomPageId = res.data.pageid
      window.open(`https://en.wikipedia.org/wiki?curid=${randomPageId}`, '_blank')
    }
  }

  function handleSubmit(e)
  {
    e.preventDefault()
    if (searchInput){
      getSearchResult()
    }
    else(
      getRandomPage()
    )
    
  }

  const searchResultElem = searchResult && searchResult.map(elem => {
    return(
      <ResultItem
        id = {elem.pageid}
        key = {elem.pageid}
        title = {elem.title}
        snippet = {elem.snippet}
        time = {elem.timestamp}
      />
    )
  })

  return (
    <div className="App">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type='text' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder='Search or get random article on Wiki'/>
        <button type='submit'>{searchInput ? 'Search' : 'Random'}</button>
      </form>
    {searchResultElem}
    </div>
  );
}

export default App;
