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
   
    const [profile,setProfile]=useState(JSON.parse(localStorage.getItem('user')))
    
    
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
    const handleAvatar = avatar =>{
        const temp = profile
        temp["avatar"]= avatar
        setProfile(temp)
        console.log(temp)
    }

    const user= JSON.parse(localStorage.getItem('user'))
    const updateUser = async (e) => {
        console.log(profile)
        e.preventDefault();
        const dataToSend = profile;
        console.log("los datos que se mandan:", dataToSend);
    
        const url = `${process.env.BACKEND_URL}/api/users/`+profile.id;
        const options = {
          method: 'PUT',
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json'
          }
        }
        console.log("la url y la options:",url, options)
        const response = await fetch(url, options);
        console.log(response)
        if (!response.ok) {
          console.log('Error fatalisima: ', response.status, response.statusText)
          return
        }
        const data = await response.json();
        console.log(data);
        // Aquí comienza nuestra lógica
        const user = JSON.stringify(data.results)
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('user', user)
        actions.setCurrentUser(user)
        // console.log(data.access_token);
        
      };

    return (
        <div className="p-3 d-flex justify-content-center bg-dark">
            <div className=" w-75  p-3 mb-5" >
                <article className=" card  shadow bg-dark my-1" >
                    <div className="card-header bg-primary">
                        <h3 className="text-center  title text-white"> Profile</h3>
                    </div>
                    <div className=" card-body row ">
                        <section className="col-lg-4 col-md-12  ">

                            <button type="button" className="btn btn-dark rounded-circle p-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <img className={"img-fluid profile-avatar rounded-circle border border-black border-3 object-fit-cover"} src={avatars[profile.avatar]} alt="Card image cap"/>
                            </button>

                        
                            <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-xl">
                                    <div className="modal-content">
                                    <div className="modal-header bg-primary">
                                        <h1 className="modal-title fs-5 text-white" id="modalHeader">Change Avatar</h1>
                                        <button type="button" className="bg-dark btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className=" modal-body bg-dark mx-0 row ">
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(0)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={freddy} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(1)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={missery} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(2)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={hannibal} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(3)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={jason} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(4)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={karla} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(5)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={psycho} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(6)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={tiffany} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(7)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={american} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(8)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={monster} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle" onClick={()=> handleAvatar(9)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={ma} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle " onClick={()=> handleAvatar(10)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border border-black border-4 object-fit-cover" src={dahmer} alt="Card image cap"/>
                                        </button>
                                        <button type="button" className="btn btn-dark col-2 my-1 p-2 rounded-circle  " onClick={()=> handleAvatar(11)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img className="card-img-top avatar-circle rounded-circle border  border-black border-4 object-fit-cover" src={bundy} alt="Card image cap"/>
                                        </button>
                                    </div>
                                    
                                    </div>
                                </div>
                            </div>

                            <h4 className="text-white title">
                                {user.name} {user.surname}
                            </h4>
                            {store.user.is_admin?<p className="text-white body my-1 card-text"> Admin</p>:<p className="text-white body my-1 card-text"> User</p>}
                        </section>
                        <section className="col-lg-8 col-md-12 row">
                            <p className="col-2 my-1 text-white body card-text">Email: </p>
                            <input className="col-10 my-1" type="text" value={user.email} aria-label="email" disabled readonly></input>
                            <p className="text-white body card-text col-2 mb-1 mt-4">Name:</p>
                            <input id="name"className="col-10 mb-1 mt-4" type="text" onChange={handleName} placeholder={user.name} aria-label="Name"></input>
                            <p className="text-white body my-1 card-text col-2">Surname:</p>
                            <input className="col-10 my-1" type="text" onChange={handleSurname} placeholder={user.surname} aria-label="Surname"></input>
                            <p className="col-2 mt-1 mb-3 text-white body card-text">Description:</p>
                            <textarea className="col-10 mt-1 mb-3" id="description" onChange={handleDescription} placeholder={user.description} rows="3"></textarea>
                            <a href="#" className="btn btn-primary p-0 pt-3" onClick={updateUser}>Update</a>
                        </section>
                        
                    </div>
                </article>    
            </div>
        </div>
    );
};
