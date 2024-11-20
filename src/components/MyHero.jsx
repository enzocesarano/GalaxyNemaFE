import { Image } from "react-bootstrap"


const MyHero = () => {

    return(
        <div className="mb-4  cursor-pointer border border-black hero-hover rounded-4 position-relative">
            <Image src="https://imperodisney.wordpress.com/wp-content/uploads/2014/04/malebanner01.jpg" className="rounded-4 w-100"/>
            <div className="position-absolute icon-wrapper text-center">
                <i className="bi bi-play-circle-fill text-secondary display-1"></i>
                <i className="fs-2 text-light d-block">Guarda il trailer...</i>
            </div>
        </div>
    )
}

export default MyHero