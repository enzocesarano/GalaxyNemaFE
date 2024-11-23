import { Image, Spinner } from "react-bootstrap";

const MyHero = ({ film, isLoading }) => {
  if (isLoading) {
    return (
      <div
        className="mb-4 bg-dark rounded-4 position-relative d-flex justify-content-center align-items-center"
        style={{ height: "20rem" }}
      >
        <Spinner animation="border" size="lg" variant="secondary" />
      </div>
    );
  }

  const renderStars = (vote) => {
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < vote/2) {
        starArray.push(
          <i key={i} className="bi bi-star-fill text-warning fs-supersmall me-1"></i>
        );
      } else {
        starArray.push(
          <i key={i} className="bi bi-star text-warning fs-supersmall me-1"></i>
        );
      }
    }
    return starArray;
  };

  return (
    <div className="mb-4  cursor-pointer border border-black hero-hover rounded-4 position-relative">
      <Image src={film.backdrop_url} className="rounded-4 w-100 hero" />
      <div className="position-absolute w-100 h-100 p-5 icon-wrapper d-flex align-items-end">
        <div className="d-flex px-5">
          <div className="w-25 me-3">
            <Image
              src={film.poster_url}
              className="image-topHero w-100 rounded-4"
            />
          </div>
          <div className="me-3 border-end flex-grow-0 flex-shrink-0">
            <p className="text-light fs-5 m-0 mb-1 me-3">{film.titolo.length > 25
                ? film.titolo.substring(0, 25) + "..."
                : film.titolo}</p>
            <p className="text-light fs-supersmall m-0">{film.genere}</p>
            <div className="d-flex align-items-center mt-2">
              {renderStars(film.vote_average)}
              <span className="text-light fs-small ms-2 me-3 fs-supersmall">
                {film.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="w-75">
            <p className="text-light fs-small m-0">
              {film.descrizione.length > 400
                ? film.descrizione.substring(0, 400) + "..."
                : film.descrizione}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyHero;
