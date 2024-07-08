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
    const handleButtonCriminal= (e)=>{
        actions.setCurrentStoryId(e.currentTarget.getAttribute("id-criminal"))        
        actions.setCurrentCriminalId(e.currentTarget.getAttribute("id-criminal"))
        actions.getCurrentStory()
        navigate("/edit-story")
        return
    }
    const handleButtonMissing= (e)=>{
        console.log(e.currentTarget.getAttribute("id-criminal"))
        actions.setCurrentCriminal(e.currentTarget.getAttribute("id-criminal"))
        actions.setCurrentCriminal(id)
        navigate("/edit-story")
        return
    }
    return (
        <div className="p-3 d-flex justify-content-center bg-dark">
            <article className=" card d-flex flex-row w-75 row p-3 bg-dark" >
                <section className=" col-2">
                    <img className={"img-fluid stories-avatar rounded-circle border border-black border-3 object-fit-cover"} src={avatars[user.avatar]} alt="Card image cap"/>
                    <h4 className="text-white text-center mt-3 mb-1">{user.name} {user.surname}</h4>
                    {user.admin?<span class="badge rounded-pill text-bg-warning">Admin</span>:""}
                    <div className="card  mt-3 bg-primary" >
                        <div className="card-body px-2 py-1">
                            <p className="text-white ">{user.description}</p>
                        </div>
                    </div>
                    <a href="/edit-profile" className="btn btn-info my-2 col-12">Edit Profile</a>
                </section>
                <section className="col-9 row">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
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
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                            {store.stories.map((item)=>
                            <div className="card col-12 my-1 bg-dark shadow-lg" >
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
                                    <button  onClick={handleButtonCriminal} id-story={9} id-criminal={item.criminal_id} className="btn btn-primary bg-info col-3 p-0 text-center">Edit Story</button>
                                </div>
                            </div>
                            )}
                        </div>
                        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                        {store.storiesMissingPersons.map((item)=>
                            <div className="card col-12 my-1 bg-dark shadow-lg" >
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
                                    <button  onClick={handleButtonMissing} id-criminal={1} className="btn btn-primary bg-info col-3 p-0 text-center">Edit Story</button>
                                </div>
                            </div>
                            )}
                        </div>
                        <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                        {!store.criminals ? <p> not found </p> :
                <div className="row row-cols-1 row-cols-md-3 justify-content-center ">
                    {store.favoritesCriminals.map((item, id) =>
                        <div key={id} className="col mt-5 mb-5 mx-4 col-lg-2 col-md-6 col-sm-10 mb-1 cardM bg-primary">
                            <div  className="card border-primary border-none mt-5">
                               <Link to="/current-criminal" onClick={()=>handleCriminal(item.criminal_id)} className="bg-primary"><img src={item.criminal['images']} className="ms-1" alt="..." /></Link> 
                                {!store.isLogin ? '' : <button className="btn-save favoriteLocation bg-primary">
                                    
                                {store.favoritesCriminals.filter((element)=> item.id == element.criminal_id).length > 0 ? <i className="fa-solid fa-heart-crack fa-xl favoriteSize" onClick={() => actions.removeFavoriteCriminalDB(item.id)}></i> :
                                 <i className="fa-solid fa-heart fa-xl text-light favoriteSize" onClick={() => actions.addFavoriteCriminalDB(item.id)}></i> }
                                </button>}

                                <div className="card-body bg-primary border-primary">
                                    <div className="row text-center text-light">
                                        <div className="col">
                                            <h5 className="card-title title" >{item.criminal.title}</h5>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="card-text body text-light">{item.criminal.subjects}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
                        </div>
                        <div class="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabindex="0">

                           {!store.favoritesMissingPersons ? <p> not found </p> :
                                <div className="row row-cols-1 row-cols-md-3 justify-content-center ">
                                    {store.favoritesMissingPersons.map((item, id) =>
                                        <div key={id} className="col mt-5 mb-5 mx-4 col-lg-2 col-md-6 col-sm-10 mb-1 cardM bg-primary">
                                            <div  className="card border-primary border-none mt-5">
                                            <Link to="/current-missing-persons" onClick={()=>handleMissingPersons(item.missing_person_id)} className="bg-primary"><img src={item.missing_person["images"]} className="ms-1" alt="..." /></Link> 
                                            {!store.isLogin ? '' : <button className="btn-save favoriteLocation bg-primary">
                                                    
                                                    {store.favoritesMissingPersons.filter((element)=> item.id == element.missing_person_id).length > 0 ? <i className="fa-solid fa-heart-crack fa-xl favoriteSize" onClick={() => actions.removeFavoritesMissingPersons(item.id)}></i> :
                                                    <i className="fa-solid fa-heart fa-xl text-light favoriteSize" onClick={() => actions.addFavoritesMissingPersons(item.id)}></i> }
                                                    </button>}

                                                <div className="card-body bg-primary border-primary">
                                                    <div className="row text-center text-light">
                                                        <div className="col">
                                                            <h5 className="card-title title" >{item.missing_person.title}</h5>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="card-text body text-light">{item.missing_person.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            } 
                            
                        </div>
                    </div>
                </section>
            </article>
        </div>
    );
};
