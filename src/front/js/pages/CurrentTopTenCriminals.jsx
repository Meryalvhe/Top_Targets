import React, { useContext } from "react";
import "../../styles/index.css";
import "../../styles/cards.css";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CurrentTopTenCriminals = () => {
    const { store, actions } = useContext(Context);


    return (
        <div className="p-5 justify-content-center bg-dark">
        {!store.currentTopTenCriminals ? <p>Not found</p> :
            <div className="card mb-3 bg-primary">
                <div className="text-end mt-2">
                    <Link to="/">
                        <i className="fas fa-times close fa-xl sing-close"></i>
                    </Link>
                </div>
                <div className="row g-0 p-5">
                    <div className="col-3 mb-5 current-card border-none">
                        <img src={store.currentTopTenCriminals.images} className="img-fluid" alt="..." />
                        <h4 className="mt-3 text-center title"> aliases: </h4>
                        <p>{store.currentTopTenCriminals.aliases}</p>
                    </div>
                    <div className="col-md-6 ms-5">
                        <div className="card-body text-light">
                            <div className ='mb-5'>
                            <h1 className="card-title title"> {store.currentTopTenCriminals.title} </h1>
                            <p>{store.currentTopTenCriminals.subjects}</p>
                            </div>
                            <div>
                            {store.currentTopTenCriminals.dates_of_birth_used == null || store.currentTopTenCriminals.dates_of_birth_used == 'None' ? '' 
                            :
                             <p className="card-text body"> Date of birth used: {store.currentTopTenCriminals.dates_of_birth_used}  </p> }
                            </div>
                            <div>
                            {store.currentTopTenCriminals.nationality == null || store.currentTopTenCriminals.nationality == 'None' ? '' 
                            :
                            <p className="card-text body"> Nationality: {store.currentTopTenCriminals.nationality} </p>
                            }
                            </div>
                            <div>
                            {store.currentTopTenCriminals.place_of_birth == null || store.currentTopTenCriminals.place_of_birth == 'None' ? '' 
                            :
                            <p className="card-text body"> Place of birth: {store.currentTopTenCriminals.place_of_birth} </p>
                            }
                            </div>
                            <div>
                            {store.currentTopTenCriminals.sex == null || store.currentTopTenCriminals.sex == 'None' ? '' 
                            :
                            <p className="card-text body"> Sex: {store.currentTopTenCriminals.sex}</p>
                            }
                            </div>
                            <div>
                            {store.currentTopTenCriminals.hair_raw == null || store.currentTopTenCriminals.hair_raw == 'None' ? '' 
                            :
                            <p className="card-text body"> Hair: {store.currentTopTenCriminals.hair_raw} </p>
                            }
                            </div>
                            <div>
                            {store.currentTopTenCriminals.remarks == null || store.currentTopTenCriminals.remarks == 'None' ? '' 
                            :
                            <p className="card-text body"> Remarks: {store.currentTopTenCriminals.remarks} </p>
                            }
                            </div>
                            <div>
                            {store.currentTopTenCriminals.field_offices == null || store.currentTopTenCriminals.field_offices == 'None' ? '' 
                            :
                            <p className="card-text mt-1 body"> Field offices: {store.currentTopTenCriminals.field_offices}  </p>
                            }
                            </div>
                            <div>
                            {store.currentTopTenCriminals.caution == null || store.currentTopTenCriminals.caution == 'None' ? '' 
                            :
                            <p className="card-text body"> Caution: {store.currentTopTenCriminals.caution}  </p>
                            }
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mb-5">
                        <a href="/create-story" className="btn btn-outline-light ms-3 body">Create your Storie</a>
                    </div>
                    <div className='mb-2'>
                    {store.currentTopTenCriminalsComments == '' ? '' : <h1 className="title text-light"> Comments </h1> }
                    </div>
                    {store.currentTopTenCriminalsComments.map((item, id) =>
                        <div className="card">
                            <div className="d-flex justify-content-end p-2 me-2">
                                <i className="fa-regular fa-trash-can"></i>
                            </div>
                            <div key={item.id} className="row">
                                <div className=" col-1 avatar-comment ms-3 d-flex justify-content-end ">
                                    <img src="https://github.com/mdo.png" alt="mdo" className="rounded-circle" />
                                </div>
                                <div className="col-9 card-body p-none aling-text-start user-comment mt-1 mb-3 title me-5">
                                    User Name. <p className="body">
                                        {item.comment} </p>
                                </div>
                            </div>
                        </div>
                    )}
                        {!store.user ? 
                    <div>

                    <div className="mb-3 mt-3 justify-content-end">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label text-light"> Write your comment here</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button type="button" className="btn btn-outline-light mt-3 body">Comment</button>
                    </div>
                            : ''
                }
                </div>
            </div>
        }
    </div >
);
};