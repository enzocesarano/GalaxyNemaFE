import dayjs from "dayjs";
import { Col, Image } from "react-bootstrap";
import { useSelector } from "react-redux";

const MyFilmSingle = () => {
  const proiezioni = useSelector((store) => store.proiezioni.proiezioni);

  const number = 0;


  if (!proiezioni || !proiezioni.content || !proiezioni.content[number]) {
    return <p>Caricamento in corso...</p>;
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

  

  return (
    <Col className="col-10 h-100">
      <div className="rounded-4 w-100 h-100 overflow-hidden position-relative">
        <Image
          src={proiezioni.content[number].backdrop_url}
          className=" w-100 h-100 object-fit-cover backdropproiezioniingle"
        />
        <div className="position-absolute top-0 w-100 h-100 p-5 d-flex flex-column justify-content-between">
          <div className="d-flex px-5">
            <div className="w-18 me-4 flex-grow-0 flex-shrink-0">
              <Image
                src={proiezioni.content[number].poster_url}
                className="image-topHero w-100 rounded-4"
              />
            </div>
            <div>
              <p className="text-light  fs-4 m-0 mb-1 me-3">
                {proiezioni.content[number].titolo}
              </p>
              <p className="text-light fs-small m-0">
                {proiezioni.content[number].genere}
              </p>
              <div className="d-flex align-items-center my-2 pb-3 border-bottom">
                {renderStars(proiezioni.content[number].voteAverage)}
              </div>

              <div className="w-100">
                <p className="text-light fs-6 m-0">
                  {proiezioni.content[number].descrizione}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-4 border sala p-3 text-secondary w-25">
              <p className="text-center fw-bold m-0 p-0 fs-5 pb-1 mb-1 border-bottom border-secondary ">
                {proiezioni.content[number].proiezioneList[0].sala.nome}
              </p>
              <p className="text-end m-0 fs-5 fw-bold">
                {dayjs(proiezioni.content[number].proiezioneList[0].oraInizio).format("HH:mm")}
              </p>
              <p className="text-end m-0 fs-small fw-bold">
                {dayjs(proiezioni.content[number].proiezioneList[0].oraInizio).format("DD-MM")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default MyFilmSingle;
