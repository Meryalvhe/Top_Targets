import React, {useContext, useState} from "react"; 
import "../../styles/index.css";
import "../../styles/profile.css";
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
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    
    const avatars=[freddy,missery,hannibal,jason,karla,psycho,tiffany,american,monster,ma,dahmer,bundy]
    //const avatars_colors=["danger","info","warning","success","light","black","danger","info","warning","success","light","black"]
   
    const [profile,setProfile]=useState({})
    
    const handleName= event=>{
        const temp = profile
        temp["name"] = event.target.value
        setProfile(temp)
    }
    const handleSurname = event=>{
        const temp = profile
        temp["surname"] = event.target.value
        setProfile(temp)
    }
    const handleDescription = event=>{
        const temp = profile
        temp["description"]= event.target.value
        setProfile(temp)
    }
    /*const handleAvatar = avatar =>{
        const temp = profile
        temp["avatar"]= avatar
        setProfile(temp)
        console.log(temp)
    }*/

    const updateUser = event=>{
        const temp=store.user
        profile.map()

        
    }
	return (
		<div className="p-3 d-flex justify-content-center bg-dark">
			<div className=" w-75  p-3 mb-5" >
                <h3 className=" text-center title text-white"> Edit Profile</h3>
                <article className=" card   bg-dark my-1" >
                    <div className=" card-body row ">
                        <section className="col-4 ">
                            <div className="col-12 my-1">
                                
                            </div>

                            <button type="button" className="btn btn-dark rounded-circle p-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <img className={"card-img-top profile-avatar rounded-circle border border-black border-3 object-fit-cover"} src={avatars[store.user.avatar]} alt="Card image cap"/>
                            </button>

                        
                            <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-xl">
                                    <div className="modal-content">
                                    <div className="modal-header bg-primary">
                                        <h1 className="modal-title fs-5 text-white" id="modalHeader">Change Avatar</h1>
                                        <button type="button" className="bg-dark btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className=" modal-body bg-dark mx-0 row ">
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(1)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={freddy} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(2)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={missery} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(3)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={hannibal} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(4)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={jason} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(5)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={karla} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(6)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={psycho} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(7)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={tiffany} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(8)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={american} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(9)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={monster} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(10)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={ma} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle " onClick={()=> handleAvatar(11)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={dahmer} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle  " onClick={()=> handleAvatar(12)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border  border-black border-4 object-fit-cover" src={bundy} alt="Card image cap"/>
                                        </button>
                                    </div>
                                    
                                    </div>
                                </div>
                            </div>

                            <h4 className="text-white title">
                                {store.user.name} {store.user.surname}
                            </h4>
                            {store.user.is_admin?<p className="text-white body my-1 card-text"> Admin</p>:<p className="text-white body my-1 card-text"> User</p>}
                        </section>
                        <section className="col-8 row">
                            <p className="text-white body card-text col-2 mb-1 mt-4">Name:</p>
                            <input id="name"className="col-10 mb-1 mt-4" type="text" onChange={handleName} placeholder={store.user.name} aria-label="Name"></input>
                            <p className="text-white body my-1 card-text col-2">Surname:</p>
                            <input className="col-10 my-1" type="text" onChange={handleSurname} placeholder={store.user.surname} aria-label="Surname"></input>
                            <p className="col-2 my-1 text-white body card-text">Email: </p>
                            <input className="col-10 my-1" type="text" placeholder={store.user.email} aria-label="email"></input>
                            <p className="col-2 mt-1 mb-3 text-white body card-text">Description:</p>
                            <textarea className="col-10 mt-1 mb-3" id="description" onChange={handleDescription} placeholder={store.user.description} rows="3"></textarea>
                            <a href="#" className="btn btn-primary p-0 pt-3" onClick={updateUser}>Update</a>
                        </section>
                        
                    </div>
                </article>    
            </div>
		</div>
	);
};
