import React,{useContext} from "react"; 
import "../../styles/home.css";
import fide from "../../img/Fide.jpeg"
import mar from "../../img/Mar.jpeg"
import mery from "../../img/Mery.jpeg"
import { Context } from "../store/appContext.js";

export const Contact = () => {

    const { store, actions } = useContext(Context);
    console.log(store.criminals)
	return (
		<div className="text-center mt-5 row p-5">
			<div className="card col-12" >
                <img className="card-img-top" src="..." alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Top Target</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p>{store.Criminals}</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
			<div className="card col-4" >
                <img className="card-img-top" src={mar} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Mar Aguayo</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
			<div className="card col-4" >
                <img className="card-img-top" src={mery} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Mery Alvarez</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
			<div className="card col-4" >
                <img className="card-img-top" src={fide} alt="José Fidel Paredes"/>
                <div className="card-body">
                    <h5 className="card-title">José Fidel Paredes</h5>
                    <p className="card-text">Computer Science student at 4Geeks Academy</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
			
		</div>
	);
};