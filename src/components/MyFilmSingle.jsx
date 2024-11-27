import dayjs from "dayjs";
import { Col, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import MyDaily from "./MyDaily";

const MyFilmSingle = () => {
  const { id } = useParams();
  const proiezioni = useSelector((store) => store.proiezioni.proiezioni);

  const film = proiezioni.content ? proiezioni.content.find((film) => film.id_film === id) : null;
  const [selectedProiezione, setSelectedProiezione] = useState(film.proiezioneList[0]);

  if (!film) {
    return (
      <Col className="col-10 h-100">
        <div className="rounded-4 w-100 h-100 overflow-hidden position-relative">
          <div
            className="w-100 h-100 object-fit-cover heroSingleFilm backdropfilmingle"
            style={{
              backgroundColor: '#cccccc',
            }}
          >
          </div>
        </div>
      </Col>
    );
  }

  console.log(proiezioni)

  

  const renderStars = (vote) => {
    const vote2 = vote / 2;
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < vote2) {
        starArray.push(
          <i key={i} className="bi bi-star-fill text-warning fs-small me-1"></i>
        );
      } else {
        starArray.push(
          <i key={i} className="bi bi-star text-warning fs-small me-1"></i>
        );
      }
    }
    return starArray;
  };

  return (
    <Col className="col-10 h-100">
      <div className="rounded-4 w-100 h-100 overflow-hidden position-relative">
        <Image
          src={film.backdrop_url}
          className="w-100 h-100 object-fit-cover heroSingleFilm backdropfilmingle"
          alt="film background"
        />
        
        <div className="position-absolute top-0 w-100 h-100 p-5 d-flex flex-column justify-content-between">
          <div className="d-flex px-5">
            <div className="w-18 me-4 flex-grow-0 flex-shrink-0">
              <Image
                src={film.poster_url}
                className="image-topHero w-100 rounded-4"
              />
            </div>
            <div>
              <p className="text-light fs-4 m-0 mb-1 me-3">{film.titolo}</p>
              <p className="text-light fs-small m-0">{film.genere}</p>
              <div className="d-flex align-items-center my-2 pb-3 border-bottom">
                {renderStars(film.voteAverage)}
              </div>

              <div className="w-100">
                <p className="text-light fs-6 m-0">{film.descrizione}</p>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <div className="d-flex gap-3 flex-wrap align-items-start">
              {film.proiezioneList.map((proiezione, index) => (
                <div
                  key={index}
                  className={`rounded-4 border sala p-3 text-light mb-3 cursor-pointer ${
                    selectedProiezione === proiezione
                      ? "selected-proiezione"
                      : ""
                  }`}
                  onClick={() => setSelectedProiezione(proiezione)}
                >
                  <p className="text-center fw-bold m-0 p-0 fs-5 pb-1 mb-1 border-bottom border-light">
                    {proiezione.sala.nome}
                  </p>
                  <p className="text-end m-0 fs-5 fw-bold">
                    {dayjs(proiezione.dataProiezione).format("DD-MM")}
                  </p>
                  <p className="text-end m-0 fs-small fw-bold">
                    {dayjs(proiezione.oraInizio).format("HH:mm")}
                  </p>
                </div>
              ))}
            </div>
            <MyDaily proiezione={selectedProiezione} />
          </div>
        </div>
      </div>
    </Col>
  );
};

export default MyFilmSingle;
