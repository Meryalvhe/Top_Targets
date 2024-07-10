import React, { useContext, useEffect, useState } from "react";
import "../../styles/current.css";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import freddy from "../../img/freddykrueger.jpg";
import hannibal from "../../img/hannibal.webp";
import jason from "../../img/jason.webp";
import psycho from "../../img/psycho.png";
import dahmer from "../../img/dahmer.jpeg";
import missery from "../../img/Missery.jpeg";
import ma from "../../img/ma.png";
import monster from "../../img/monster.png";
import tiffany from "../../img/tiffany.png";
import karla from "../../img/karla.png";
import bundy from "../../img/bundy.jpeg";
import american from "../../img/american.png";

export const CurrentMissingPersons = () => {
    const { store, actions } = useContext(Context);
    const [comment, setComment] = useState();
    const avatars = [freddy, missery, hannibal, jason, karla, psycho, tiffany, american, monster, ma, dahmer, bundy];


    useEffect(() => {
        actions.getCurrentMissingPerson()
        actions.getCurrentMissingComments()
        actions.addCommentMissingPerson()
    }, [])

    const handleSubmit = () => {

        if (comment.trim !== '') {
            const dataToSend = {
                user_id: store.user.id,
                missing_person_id: store.currentMissingPersonId,
                comment: comment,
                comment_date: new Date()
            }
            actions.addCommentMissingPerson(dataToSend)
            console.log(dataToSend)
            setComment('')
        }
    }

    return (
        <div className="p-5 justify-content-center bg-dark">
            {!store.currentMissingPerson ? <p>Not found</p> :
                <div className="card mb-3 bg-primary">
                    <div className="text-end mt-2">
                        <Link to="/missing-persons">
                            <i className="fas fa-times close fa-xl sing-close btn btn-outline-light rounded-3"></i>
                        </Link>
                    </div>
                    <div className="row g-0 p-5">
                        <div className="col-3 mb-5 current-card border-none rounded-3">
                            <img src={store.currentMissingPerson.images} className="img-fluid rounded-3" alt="..." />
                            <h4 className="mt-3 text-center title"> Last seen: </h4>
                            <p calssName="body">{store.currentMissingPerson.description ? store.currentMissingPerson.description.replace(/['"\[\]]/g, '') : ''}</p>
                        </div>
                        <div className="col-md-6 ms-xl-5">
                            <div className="card-body text-light">
                                <div className=''>
                                    <h1 className="card-title title"> {store.currentMissingPerson.title} </h1>
                                    <p>{store.currentMissingPerson.sex ? store.currentMissingPerson.sex.replace(/['"\[\]]/g, '') : ''}</p>
                                </div>
                                <div className="mb-1">
                                    {store.currentMissingPerson.dates_of_birth_used == null || store.currentMissingPerson.dates_of_birth_used == 'None' ||
                                        store.currentMissingPerson.dates_of_birth_used == 'null' ? ''
                                        :
                                        <p className="card-text body"> <span className="title">Date of birth used:</span> {store.currentMissingPerson.dates_of_birth_used.replace(/['"\[\]]/g, '')}  </p>}
                                </div>
                                <div className="mb-1">
                                    {store.currentMissingPerson.nationality == null || store.currentMissingPerson.nationality == 'None' ? ''
                                        :
                                        <p className="card-text body"> <span className="title">Nationality:</span> {store.currentMissingPerson.nationality} </p>
                                    }
                                </div>
                                <div className="mb-1">
                                    {store.currentMissingPerson.place_of_birth == null || store.currentMissingPerson.place_of_birth == 'None' ? ''
                                        :
                                        <p className="card-text body"> <span className="title"> Place of birth:</span> {store.currentMissingPerson.place_of_birth} </p>
                                    }
                                </div>
                                <div className="mb-1">
                                    {store.currentMissingPerson.eyes == null || store.currentMissingPerson.eyes == 'None' ? ''
                                        :
                                        <p className="card-text body"> <span className="title">Eyes:</span> {store.currentMissingPerson.eyes}</p>
                                    }
                                </div>
                                <div className="mb-1">
                                    {store.currentMissingPerson.weight == null || store.currentMissingPerson.weight == 'None' ? ''
                                        :
                                        <p className="card-text body"><span className="title"> Weight:</span> {store.currentMissingPerson.weight}</p>
                                    }
                                </div>
                                <div className="mb-1">
                                    {store.currentMissingPerson.hair_raw == null || store.currentMissingPerson.hair_raw == 'None' ? ''
                                        :
                                        <p className="card-text body"> <span className="title">Hair: </span> {store.currentMissingPerson.hair_raw} </p>
                                    }
                                </div>
                                <div className="mb-1">
                                    {store.currentMissingPerson.remarks == null || store.currentMissingPerson.remarks == 'None' ? ''
                                        :
                                        <p className="card-text body"> <span className="title">Remarks: </span>{store.currentMissingPerson.remarks.replace(/\[|\]|<p>|<\/p>/g, '')} </p>
                                    }
                                </div>
                                <div className="mb-1">
                                    {store.currentMissingPerson.race == null || store.currentMissingPerson.race == 'None' ? ''
                                        :
                                        <p className="card-text mt-1 body"> <span className="title">Race: </span> {store.currentMissingPerson.race.replace(/['"\[\]]/g, '')}  </p>
                                    }
                                </div>
                                <div className="mb-1">
                                    {store.currentMissingPerson.details == null || store.currentMissingPerson.details == 'None' ? ''
                                        :
                                        <p className="card-text body"> <span className="title">Details:</span> {store.currentMissingPerson.details.replace(/\[|\]|<p>|<\/p>/g, '')}  </p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mb-5">
                            {store.isLogin ? <Link to="/create-story-missing" className="btn btn-outline-light ms-3 body rounded-3">Create your Story</Link>
                                : ''
                            }
                        </div>
                        <div className='mb-2'>
                            {store.currentMissingPersonComments == '' ? '' : <h1 className="title text-light"> Comments </h1>}
                        </div>
                        {store.currentMissingPersonComments.map((item, id) =>
                            <div key={id} className="bg-white rounded-3 m-1 p-2 ">
                                <div className="row  m-xl-3">
                                    <div className="avatar-comment d-flex">
                                        <img src={avatars[item.user.avatar]} alt="mdo" className="rounded-circle" />
                                        <div className="row ms-1">
                                            <div className="col">
                                                <p className="title ms-1">{item.user.name}</p>
                                            </div>
                                            <div className="col">
                                                <p className="title">{item.user.surname}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <p className="body">
                                            {item.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {store.isLogin ?
                            <div>

                                <div className="mb-3 mt-3 justify-content-end">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label text-light"> Write your comment here</label>
                                    <textarea className="form-control rounded-3" id="exampleFormControlTextarea1" rows="3" value={comment} onChange={(event) => setComment(event.target.value)}></textarea>
                                </div>
                                <button type="submit" className="btn btn-outline-light mt-3 body rounded-3" onClick={() => handleSubmit()}>Comment</button>
                            </div>
                            : ''
                        }
                    </div>
                </div>
            }
        </div >
    );
};