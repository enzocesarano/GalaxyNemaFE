import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { filmsArray } from "../redux/actions";

const MySearch = () => {
  const [filters, setFilters] = useState({
    titolo: "",
    genere: "",

    minVoteAverage: "",
    maxVoteAverage: "",
    sortBy: "",
    proiezioneAfter: "",
    proiezioneBefore: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value)
    );
    dispatch(filmsArray(activeFilters));
  };

  return (
    <Form className="mb-4 mt-1" onSubmit={handleSearch}>
      <div className="d-flex mb-3">
        <Form.Control
          type="text"
          placeholder="Cerca..."
          name="titolo"
          value={filters.titolo}
          onChange={handleInputChange}
          className="rounded-4 px-4 py-2 bg-black text-light border-0 placeholder-light w-75 me-2"
        />
        <Form.Select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleInputChange}
          className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 w-25"
        >
          <option value="">Ordina per</option>
          <option value="titolo">Titolo</option>
          <option value="voteAverage">Voto Medio</option>
          <option value="dataUscita">Data di Uscita</option>
        </Form.Select>
      </div>
      
      <div className="d-flex gap-2">
        <Form.Select
          name="genere"
          value={filters.genere}
          onChange={handleInputChange}
          className="rounded-4 px-4 py-2 bg-black border-0 placeholder-light text-secondary"
        >
          <option value="">GENERE</option>
          <option value="AZIONE">AZIONE</option>
          <option value="AVVENTURA">AVVENTURA</option>
          <option value="ANIMAZIONE">ANIMAZIONE</option>
          <option value="COMMEDIA">COMMEDIA</option>
          <option value="CRIME">CRIME</option>
          <option value="DOCUMENTARIO">DOCUMENTARIO</option>
          <option value="DRAMMA">DRAMMA</option>
          <option value="FAMIGLIA">FAMIGLIA</option>
          <option value="FANTASY">FANTASY</option>
          <option value="STORIA">STORIA</option>
          <option value="HORROR">HORROR</option>
          <option value="MUSICA">MUSICA</option>
          <option value="MISTERO">MISTERO</option>
          <option value="ROMANCE">ROMANCE</option>
          <option value="FANTASCIENZA">FANTASCIENZA</option>
          <option value="TELEVISIONE_FILM">TELEVISIONE FILM</option>
          <option value="THRILLER">THRILLER</option>
          <option value="GUERRA">GUERRA</option>
          <option value="WESTERN">WESTERN</option>
        </Form.Select>

        <Form.Control
          type="date"
          placeholder="Proiezione Dopo"
          name="proiezioneAfter"
          value={filters.proiezioneAfter}
          onChange={handleInputChange}
          className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0"
        />

        <Form.Control
          type="date"
          placeholder="Proiezione Prima"
          name="proiezioneBefore"
          value={filters.proiezioneBefore}
          onChange={handleInputChange}
          className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0"
        />

        <Form.Select
          name="minVoteAverage"
          value={filters.minVoteAverage}
          onChange={(e) => {
            const minVote = parseInt(e.target.value, 10);
            if (filters.maxVoteAverage && minVote > filters.maxVoteAverage) {
              alert("Il voto minimo non può essere maggiore del voto massimo.");
              return;
            }
            handleInputChange(e);
          }}
          className="rounded-4 px-4 py-2 bg-black border-0 text-secondary placeholder-light"
        >
          <option value="">Voto Min</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </Form.Select>

        <Form.Select
          name="maxVoteAverage"
          value={filters.maxVoteAverage}
          onChange={(e) => {
            const maxVote = parseInt(e.target.value, 10);
            if (filters.minVoteAverage && maxVote < filters.minVoteAverage) {
              alert("Il voto massimo non può essere minore del voto minimo.");
              return;
            }
            handleInputChange(e);
          }}
          className="rounded-4 px-4 py-2 bg-black border-0 text-secondary placeholder-light"
        >
          <option value="">Voto Max</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </Form.Select>

        <Button
          type="submit"
          className="botton-check border-0 rounded-4 text-black fw-bold"
        >
          Search
        </Button>
      </div>
    </Form>
  );
};

export default MySearch;
