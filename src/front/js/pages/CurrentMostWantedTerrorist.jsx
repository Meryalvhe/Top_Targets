import React, { useContext, useEffect, useState } from "react";
import "../../styles/index.css";
import "../../styles/cards.css";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CurrentMostWantedTerrorist = () => {
    const { store, actions } = useContext(Context);
    const [comment, setComment] = useState();

    console.log(comment)
    console.log(store.user.id, store.currentCriminal.id)

    useEffect(() => {
        actions.getCurrentCriminal()
        actions.getCurrentCriminalComments()
        actions.addCommentCriminal()
    }, [])

    const handleSubmit = () => {
        
        if(comment.trim !== ''){
            const dataToSend = {
                user_id: store.user.id,
                criminal_id: store.currentCriminalId,
                comment: comment, 
                comment_date: new Date()
            } 
            actions.addCommentCriminal(dataToSend)
            setComment('')
        } 
    }

    return (
        <div className="p-5 justify-content-center bg-dark">
            {!store.currentCriminal ? <p>Not found</p> :
                <div className="card mb-3 bg-primary">
                    <div className="text-end mt-2">
                        <Link to="/">
                            <i className="fas fa-times close fa-xl sing-close"></i>
                        </Link>
                    </div>
                    <div className="row g-0 p-5">
                        <div className="col-3 mb-5 current-card border-none">
                            <img src={store.currentCriminal.images} className="img-fluid" alt="..." />
                            <h4 className="mt-3 text-center title"> aliases: </h4>
                            <p calssName= " body">{store.currentCriminal.aliases ? store.currentCriminal.aliases.replace(/['"\[\]]/g, '') : ''}</p>
                        </div>
                        <div className="col-md-6 ms-5">
                            <div className="card-body text-light">
                                <div className ='mb-5'>
                                <h1 className="card-title title"> {store.currentCriminal.title} </h1>
                                <p>{store.currentCriminal.subjects}</p>
                                </div>
                                <div>
                                {store.currentCriminal.dates_of_birth_used == null || store.currentCriminal.dates_of_birth_used == 'None' ? '' 
                                :
                                 <p className="card-text body"> Date of birth used: {store.currentCriminal.dates_of_birth_used.replace(/['"\[\]]/g, '')}  </p> }
                                </div>
                                <div>
                                {store.currentCriminal.nationality == null || store.currentCriminal.nationality == 'None' ? '' 
                                :
                                <p className="card-text body"> Nationality: {store.currentCriminal.nationality} </p>
                                }
                                </div>
                                <div>
                                {store.currentCriminal.place_of_birth == null || store.currentCriminal.place_of_birth == 'None' ? '' 
                                :
                                <p className="card-text body"> Place of birth: {store.currentCriminal.place_of_birth} </p>
                                }
                                </div>
                                <div>
                                {store.currentCriminal.sex == null || store.currentCriminal.sex == 'None' ? '' 
                                :
                                <p className="card-text body"> Sex: {store.currentCriminal.sex}</p>
                                }
                                </div>
                                <div>
                                {store.currentCriminal.hair_raw == null || store.currentCriminal.hair_raw == 'None' ? '' 
                                :
                                <p className="card-text body"> Hair: {store.currentCriminal.hair_raw} </p>
                                }
                                </div>
                                <div>
                                {store.currentCriminal.remarks == null || store.currentCriminal.remarks == 'None' ? '' 
                                :
                                <p className="card-text body"> Remarks: {store.currentCriminal.remarks.replace(/\[|\]|<p>|<\/p>/g, '')} </p>
                                }
                                </div>
                                <div>
                                {store.currentCriminal.field_offices == null || store.currentCriminal.field_offices == 'None' ? '' 
                                :
                                <p className="card-text mt-1 body"> Field offices: {store.currentCriminal.field_offices.replace(/['"\[\]]/g, '')}  </p>
                                }
                                </div>
                                <div>
                                {store.currentCriminal.caution == null || store.currentCriminal.caution == 'None' ? '' 
                                :
                                <p className="card-text body"> Caution: {store.currentCriminal.caution.replace(/\[|\]|<p>|<\/p>/g, '')}  </p>
                                }
                                </div>
                            </div>
                        </div>
                        {store.isLogin ? 
                        <div className="d-flex justify-content-end mb-5">
                            <a href="/create-story" className="btn btn-outline-light ms-3 body">Create your Storie</a>
                        </div>
                        : ''}
                        <div className='mb-2'>
                        {store.currentCriminalComments == '' ? '' : <h1 className="title text-light"> Comments </h1> }
                        </div>
                        {store.currentCriminalComments.map((item, id) =>
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