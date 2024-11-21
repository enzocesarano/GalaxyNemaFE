import { Image } from "react-bootstrap"



const MyProfNav = () =>{

    return(
        <div className="d-flex fs-5 align-items-center">
            <div className="w-10 me-3">
                <Image src="https://starwalk.space/gallery/images/full-moon-black-tree/1140x641.jpg" alt="" className="imageProfile w-100 h-100 object-fit-cover rounded-circle" />
            </div>
        
            <p className="text-secondary p-0 m-0 me-3">Vincenzo</p>
            <i className="bi bi-bell-fill text-secondary "></i>
        </div>
    )
}


export default MyProfNav