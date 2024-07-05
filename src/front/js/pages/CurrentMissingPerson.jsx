import React, { useContext, useEffect, useState } from "react";
import "../../styles/index.css";
import "../../styles/cards.css";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CurrentMissingPersons = () => {
    const { store, actions } = useContext(Context);
    const [comment, setComment] = useState();

    useEffect(() => {
        actions.getMissingPerson()
        actions.getCurrentMissingPersonComments()
        actions.addCommentMissingPerson()
    }, [])

    const handleSubmit = () => {
        
        if(comment.trim !== ''){
            const dataToSend = {
                user_id: store.user.id,
                missing_person_id: store.CurrentMissingPerson,
                comment: comment, 
                comment_date: new Date()
            } 
            actions.addCommentMissingPerson(dataToSend)
            setComment('')
        } 
    }

    return (
        <div className="p-5 justify-content-center bg-dark">
            {!store.currentMissingPerson ? <p>Not found</p> :
                <div className="card mb-3 bg-primary">
                    <div className="text-end mt-2">
                        <Link to="/missing-persons">
                            <i className="fas fa-times close fa-xl sing-close"></i>
                        </Link>
                    </div>
                    <div className="row g-0 p-5">
                        <div className="col-3 mb-5 current-card border-none">
                            <img src={store.currentMissingPerson.images} className="img-fluid" alt="..." />
                            <h4 className="mt-3 text-center title"> Last seen: </h4>
                            <p calssName= " body">{store.currentMissingPerson.description ? store.currentMissingPerson.description.replace(/['"\[\]]/g, '') : ''}</p>
                        </div>
                        <div className="col-md-6 ms-5">
                            <div className="card-body text-light">
                                <div className ='mb-5'>
                                <h1 className="card-title title"> {store.currentMissingPerson.title} </h1>
                                <p>{store.currentMissingPerson.sex ? store.currentMissingPerson.sex.replace(/['"\[\]]/g, '') : ''}</p>
                                </div>
                                <div>
                                {store.currentMissingPerson.dates_of_birth_used == null || store.currentMissingPerson.dates_of_birth_used == 'None' ? '' 
                                :
                                 <p className="card-text body"> Date of birth used: {store.currentMissingPerson.dates_of_birth_used.replace(/['"\[\]]/g, '')}  </p> }
                                </div>
                                <div>
                                {store.currentMissingPerson.nationality == null || store.currentMissingPerson.nationality == 'None' ? '' 
                                :
                                <p className="card-text body"> Nationality: {store.currentMissingPerson.nationality} </p>
                                }
                                </div>
                                <div>
                                {store.currentMissingPerson.place_of_birth == null || store.currentMissingPerson.place_of_birth == 'None' ? '' 
                                :
                                <p className="card-text body"> Place of birth: {store.currentMissingPerson.place_of_birth} </p>
                                }
                                </div>
                                <div>
                                {store.currentMissingPerson.eyes== null || store.currentMissingPerson.eyes == 'None' ? '' 
                                :
                                <p className="card-text body"> Eyes: {store.currentMissingPerson.eyes}</p>
                                }
                                </div>
                                <div>
                                {store.currentMissingPerson.weight== null || store.currentMissingPerson.weight == 'None' ? '' 
                                :
                                <p className="card-text body"> Weight: {store.currentMissingPerson.weight}</p>
                                }
                                </div>
                                <div>
                                {store.currentMissingPerson.hair_raw == null || store.currentMissingPerson.hair_raw == 'None' ? '' 
                                :
                                <p className="card-text body"> Hair: {store.currentMissingPerson.hair_raw} </p>
                                }
                                </div>
                                <div>
                                {store.currentMissingPerson.remarks == null || store.currentMissingPerson.remarks == 'None' ? '' 
                                :
                                <p className="card-text body"> Remarks: {store.currentMissingPerson.remarks.replace(/\[|\]|<p>|<\/p>/g, '')} </p>
                                }
                                </div>
                                <div>
                                {store.currentMissingPerson.race == null || store.currentMissingPerson.race == 'None' ? '' 
                                :
                                <p className="card-text mt-1 body"> Race: {store.currentMissingPerson.race.replace(/['"\[\]]/g, '')}  </p>
                                }
                                </div>
                                <div>
                                {store.currentMissingPerson.details== null || store.currentMissingPerson.details == 'None' ? '' 
                                :
                                <p className="card-text body"> Details: {store.currentMissingPerson.details.replace(/\[|\]|<p>|<\/p>/g, '')}  </p>
                                }
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mb-5">
                            <a href="/create-story" className="btn btn-outline-light ms-3 body">Create your Storie</a>
                        </div>
                        <div className='mb-2'>
                        {store.currentMissingPersonComments == '' ? '' : <h1 className="title text-light"> Comments </h1> }
                        </div>
                        {store.currentMissingPersonComments.map((item, id) =>
                            <div className="card">
                                <div className="d-flex justify-content-end p-2 me-2">
                                   {/*  <i className="fa-regular fa-trash-can"></i>  */}
                                    
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
                            {store.isLogin ? 
                        <div>

                        <div className="mb-3 mt-3 justify-content-end">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label text-light"> Write your comment here</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={comment} onChange={(event) => setComment(event.target.value)}></textarea>
                        </div>
                        <button type="submit" className="btn btn-outline-light mt-3 body" onClick={()=> handleSubmit()}>Comment</button>
                        </div>
                                : ''
                    }
                    </div>
                </div>
            }
        </div >
    );
};