import dayjs from "dayjs";
import { Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyDaily from "./MyDaily";
import { selectProiezioneAction } from "../redux/actions";
import Carousel from "react-multi-carousel";

const MyFilmSingle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const proiezioni = useSelector((store) => store.proiezioni.proiezioni);

  const film = proiezioni.content
    ? proiezioni.content.find((film) => film.id_film === id)
    : null;
  const [selectedProiezione, setSelectedProiezione] = useState(
    film?.proiezioneList[0]
  );

  useEffect(() => {
    dispatch(selectProiezioneAction(selectedProiezione));
  }, [selectedProiezione, dispatch]);

  if (!film) {
    return (
      <Col className="col-10 h-100">
        <div className="rounded-4 w-100 h-100 overflow-hidden position-relative">
          <div
            className="w-100 h-100 object-fit-cover heroSingleFilm backdropfilmingle"
            style={{
              backgroundColor: "#cccccc",
            }}
          ></div>
        </div>
      </Col>
    );
  }

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

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1200 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1200, min: 768 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  return (
    <Col className="col-12 col-xl-10 h-100">
      <div className="rounded-4 w-100 h-100 overflow-hidden position-relative">
        <Image
          src={film.backdrop_url}
          className="w-100 h-100 object-fit-cover heroSingleFilm"
          alt="film background"
        />

        <div className="position-absolute top-0 w-100 h-100 p-5 d-flex flex-column justify-content-between">
          <div className="d-flex px-md-5">
            <div className="w-18 me-4 flex-grow-0 flex-shrink-0 d-none d-md-block">
              <Image src={film.poster_url} className="w-100 rounded-4" />
            </div>
            <div>
              <p className="text-light fs-4 m-0 mb-1 me-3">{film.titolo}</p>
              <p className="text-light fs-small m-0">{film.genere}</p>
              <div className="d-none d-sm-flex align-items-center my-2 pb-3 border-bottom">
                {renderStars(film.voteAverage)}
              </div>

              <div className="w-100">
                <p className="text-light fs-6 m-0 d-none d-sm-block">
                  {film.descrizione}
                </p>
              </div>
            </div>
          </div>

          <div className="justify-content-between d-none d-xl-flex">
            <div className="d-flex gap-3 flex-wrap align-items-end">
              {film.proiezioneList.map((proiezione, index) => (
                <div
                  key={index}
                  className={`rounded-4 border sala p-3 text-light mb-3 cursor-pointer ${
                    selectedProiezione === proiezione
                      ? "active"
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

      {/* Layout per schermi piccoli */}
      <div className="d-xl-none">
      <Carousel
        responsive={responsive}
        infinite={true}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        
      >
        {film.proiezioneList.map((proiezione, index) => (
          <div
            key={index}
            className={`rounded-4 border sala salaschermopiccolo p-1 text-light mb-3 m-2 cursor-pointer ${
              selectedProiezione === proiezione ? " active" : ""
            }`}
            onClick={() => setSelectedProiezione(proiezione)}
          >
            <p className="text-center sala-nome fw-bold m-0 p-0 pb-1 mb-1 border-bottom border-light">
              {proiezione.sala.nome}
            </p>
            <p className="text-center m-0 sala-data fw-bold">
              {dayjs(proiezione.dataProiezione).format("DD-MM")} -{" "}
              {dayjs(proiezione.oraInizio).format("HH:mm")}
            </p>
          </div>
        ))}
      </Carousel>

      <MyDaily proiezione={selectedProiezione} />
      </div>
      
    </Col>
  );
};

export default MyFilmSingle;
