import { Form } from "react-bootstrap"

const MySearch = () => {

    return(
        <Form className="d-flex mb-4">
            <Form.Control
              type="search"
              placeholder="Search..."
              className="rounded-4 px-4 py-2 text-light bg-black border-0 placeholder-light"
              aria-label="Search"
            />
          </Form>
    )
}

export default MySearch;