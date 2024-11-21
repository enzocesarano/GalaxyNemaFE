import { Card } from "react-bootstrap"


const MyNews = () => {

    return(
        <Card className="border-0 bg-transparent flex-row mb-4">
            <div className="w-50 me-4">
              <Card.Img
                variant="top"
                className="rounded-4 w-100"
                src="https://www.thespacecinema.it/-/media/tsc/2024/11/wicked/new-new/locandina_wicked.jpg?w=200"
              />
            </div>

            <Card.Body className="text-secondary m-0 p-0 flex-column justify-content-between">
              <div>
                <p className="fs-4 m-0 p-0">WHICKED </p>
                <p className="mb-3">Genere</p>
              </div>
              <p className="p-0 m-0">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
                eum aperiam reprehenderit ullam eveniet maiores odio...
              </p>
            </Card.Body>
          </Card>
    )
}

export default MyNews