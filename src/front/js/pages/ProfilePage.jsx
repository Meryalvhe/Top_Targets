import React, { useContext, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";


export const Profile = () => {
    const { store, actions } = useContext(Context);
    const avatars=[freddy,missery,hannibal,jason,karla,psycho,tiffany,american,monster,ma,dahmer,bundy]
    const user=JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate();
    const handleCriminal =(id) =>{
        actions.setCurrentCriminal(id)
    }
    const handleMissingPersons =(id) =>{
        actions.setCurrentMissingPerson(id)
    }
    const handleButtonCriminal= (story)=>{
        actions.setCurrentStory(story)
        navigate("/edit-story")
        return
    }
    const handleButtonMissing= (story)=>{
        actions.setCurrentStory(story)
        navigate("/edit-story-missing")
        return
    }
    
    return (
        <div className="p-3 d-flex justify-content-center bg-dark">
            <article className=" card d-flex flex-row w-75 row p-3 bg-dark" >

                <aside className=" col-2">
                    <img className={"img-fluid stories-avatar rounded-circle border border-black border-3 object-fit-cover"} src={avatars[user.avatar]} alt="Card image cap"/>
                    <h4 className="text-white text-center mt-3 mb-1">{user.name} {user.surname}</h4>
                    {user.admin?<span className="badge rounded-pill text-bg-warning">Admin</span>:""}
                    <div className="card  mt-3 bg-primary" >
                        <div className="card-body px-2 py-1">
                            <p className="text-white ">{user.description}</p>
                        </div>
                    </div>
                    <a href="/edit-profile" className="btn btn-info my-2 col-12">Edit Profile</a>
                </aside>

                <section className="col-9 row">
                    
                    <ul className="nav nav-tabs" id="myTab" role="tablist" data-bs-theme="dark">
                        <li className="nav-item " role="presentation">
                            <button className="nav-link active text-white" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Criminal Stories</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link text-white" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Missing Person Stories</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link text-white" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Saved Criminals</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link text-white" id="disabled-tab" data-bs-toggle="tab" data-bs-target="#disabled-tab-pane" type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false" >Saved Missing Persons</button>
                        </li>
                    </ul>
                    <div className="tab-content p-0" id="myTabContent">
                        <section className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                            {store.stories.map((item)=>
                                <article className="card col-12 mb-1 bg-dark shadow-lg" >
                                    <div className="card-header ms-1 col-12 p-0 row mt-3">
                                        <h4 className="col-12 p-0 card-title text-center text-white"> {item.title} </h4>
                                    </div>
                                    <div className="card-body my-1">
                                        <div className="card bg-primary my-1" >
                                            <div className="card-body">
                                                <p className="card-text text-white">{item.body}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer row ">
                                        <div className="col-8">
                                            <p className="card-text text-white">Last Modification Date: {item.modification_date} </p>
                                            <p className="card-text text-white">Creation Date: {item.creation_date} </p>
                                        </div>
                                        <button className="col-1 bg-dark "><i className="fa-solid fa-trash"></i></button>
                                        <div className="col-3 px-1 ">
                                            <button  onClick={()=>{handleButtonCriminal(item)}} id-story={9} id-criminal={item.criminal_id} className="btn btn-primary bg-info h-100 text-center">Edit Story</button>
                                        </div>
                                    </div>
                                </article>
                            )}
                        </section>
                        <section className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                            {store.storiesMissingPersons.map((item)=>
                                <article className="card col-12 mb-2 bg-dark shadow-lg p-0" >
                                    <div className="card-header mt-3">
                                        <h4 className="card-title text-center text-white"> {item.title} </h4>
                                    </div>
                                    <div className="card-body my-1">
                                        <div className="card bg-primary my-1" >
                                            <div className="card-body">
                                                <p className="card-text text-white">{item.body}</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="card-footer row ">
                                        <div className="col-9">
                                            <p className="card-text text-white">Last Modification Date: {item.modification_date} </p>
                                            <p className="card-text text-white">Creation Date: {item.creation_date} </p>
                                        </div>
                                        <button  onClick={()=>{handleButtonMissing(item)}} id-criminal={1} className="btn btn-primary bg-info col-3 p-0 text-center">Edit Story</button>
                                    </div>
                                </article>
                                )}
                        </section>
                        <section className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">
                            {!store.favoritesCriminals? 
                                <div>
                                    <h1 className="text-white text-center mt-5">No criminals saved</h1> 
                                    <p className="text-white text-center">"Criminals won't save you either"</p>
                                </div>
                            :
                                <div className="row row-cols-1 row-cols-md-3 justify-content-center ">
                                    
                                    {store.favoritesCriminals.map((item, id) =>
                                        <article key={id} className="col mt-5 mb-5 mx-4 col-lg-2 col-md-6 col-sm-10 mb-1 cardM bg-primary">
                                            <div  className="card border-primary border-none mt-5"> 
                                                <Link to="/current-criminal" onClick={()=>handleCriminal(item.id)} className="bg-primary"><img src={item.images} className="ms-1" alt="..." /></Link> 
                                                {!store.isLogin ? 
                                                    '' 
                                                : 
                                                    <button className="btn-save favoriteLocation bg-primary">
                                                        <i className="fa-solid fa-heart-crack fa-xl favoriteSize" onClick={() => actions.removeFavoriteCriminalDB(item.id)}></i>
                                                    </button>
                                                }
                                                <section className="card-body bg-primary border-primary">
                                                    <div className="row text-center text-light">
                                                        <div className="col">
                                                            <h5 className="card-title title" >{item.title}</h5>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="card-text body text-light">{item.subjects}</p>
                                                    </div>
                                                </section>
                                            </div>
                                        </article>
                                    )}
                                </div>
                            }
                        </section>
                        <section className="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabIndex="0">
                           {!store.favoritesMissingPersons ? 
                                <p> not found </p> 
                            :
                                <div className="row row-cols-1 row-cols-md-3 justify-content-center ">
                                    {store.favoritesMissingPersons.map((item, id) =>
                                        <article key={id} className="col mt-5 mb-5 mx-4 col-lg-2 col-md-6 col-sm-10 mb-1 cardM bg-primary">
                                            <div  className="card border-primary border-none mt-5">
                                                <Link to="/current-missing-persons" onClick={()=>handleMissingPersons(item.id)} className="bg-primary"><img src={item.images} className="ms-1" alt="..." /></Link> 
                                                {!store.isLogin ? 
                                                    '' 
                                                :   
                                                    <button className="btn-save favoriteLocation bg-primary">
                                                        <i className="fa-solid fa-heart-crack fa-xl favoriteSize" onClick={() => actions.removeFavoritesMissingPersons(item.id)}></i> 
                                 
                                                    </button>
                                                }
                                                <section className="card-body bg-primary border-primary">
                                                    <div className="row text-center text-light">
                                                        <div className="col">
                                                            <h5 className="card-title title" >{item.title}</h5>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="card-text body text-light">{item.description}</p>
                                                    </div>
                                                </section>
                                            </div>
                                        </article>
                                    )}
                                </div>
                            }     
                        </section>
                    </div>
                </section>
            </article>
        </div>
    );
};
