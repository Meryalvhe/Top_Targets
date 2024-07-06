import React, {useContext} from "react"; 
import "../../styles/index.css";
import "../../styles/stories.css";
import { Context } from "../store/appContext";
import freddy from "../../img/freddykrueger.jpg"
import hannibal from "../../img/hannibal.webp"
import jason from "../../img/jason.webp"
import psycho from "../../img/psycho.png"
import dahmer from "../../img/dahmer.jpeg"
import missery from "../../img/Missery.jpeg"
import ma from "../../img/ma.png"
import monster from "../../img/monster.png"
import tiffany from "../../img/tiffany.png"
import karla from "../../img/karla.png"
import bundy from "../../img/bundy.jpeg"
import american from "../../img/american.png"

export const Stories = () => {
    const { store, actios } = useContext(Context);
    const avatars=[freddy,missery,hannibal,jason,karla,psycho,tiffany,american,monster,ma,dahmer,bundy]
    const user=JSON.parse(localStorage.getItem("user"))
    return (
        <div className="p-3 d-flex justify-content-center bg-dark">
            <section className=" card d-flex flex-row w-75 row p-3 bg-dark" >
                <div className=" col-2">
                    <img className={"img-fluid stories-avatar rounded-circle border border-black border-3 object-fit-cover"} src={avatars[user.avatar]} alt="Card image cap"/>
                    <h4 className="text-white text-center mt-3 mb-1">{user.name} {user.surname}</h4>
                    {user.admin?<span class="badge rounded-pill text-bg-warning">Admin</span>:""}
                    <div className="card  mt-3 bg-primary" >
                        <div className="card-body px-2 py-1">
                            <p className="text-white ">{user.description}</p>
                        </div>
                    </div>
                    <a href="/profile" className="btn btn-info my-2 col-12">Edit Profile</a>
                </div>
                <div className="col-9 row">

                   
                    <button type="button" class="my-2 btn btn-white  text-white col-6"></button>
                    
                    <div  className="col-3 p-1">
                        <a href="/criminals" className="btn btn-info col-12">New Criminal</a>
                    </div>
                    <div  className="col-3 p-1">
                        <a href="/missing-persons" className="btn btn-info px-0 col-12">New Missing Person</a>
                    </div>

                    {store.stories.map((item)=>
                    <div className="card col-12 my-1 bg-dark shadow-lg" >
                        <div class="card-header">
                            <h4 className="card-title text-center text-white"> {item.title} </h4>
                        </div>
                        <div className="card-body my-1">
                            <p className="text-white">Description:</p>
                            <div class="card bg-primary" >
                                <div class="card-body">
                                    
                                    <p className="card-text text-white">{item.description} </p>
                                    
                                </div>
                            </div>
                            <p className="mt-2 text-white">Story:</p>
                            <div class="card bg-primary my-1" >
                                <div class="card-body">
                                    <p className="card-text text-white">{item.body}</p>
                                </div>
                            </div>
                            
                        </div>
                        <div class="card-footer row ">
                            <a href="/create-story" className="btn btn-primary bg-info col-2">Edit Story</a>
                            <p className="card-text text-white col-9">Last Modification Date:{item.modification_date} </p>
                            
                        </div>
                    </div>
                    )}
                </div>
            </section>
        </div>
    );
};
