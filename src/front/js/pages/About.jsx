import React from "react"; 
import "../../styles/index.css";
import fide from "../../img/Fidev.jpeg"
import mar  from "../../img/Mar.jpeg"
import mery from "../../img/Mery.jpeg"
import logo from "../../img/logo.png"

export const About = () => {

    return (
        <div className=" bg-dark p-5">
            <section className="row bg-dark text-white " >
                <h1 className="text-center text-white title">About</h1>
                <article className=" col-12 pt-3 pb-3">
                    <h3 className="text-white title">What is <strong>Top Target</strong>?</h3>
                    <p className="body ps-4">It is a web application that, with the assitance of IA, generates
                        stories based on real criminals. The user will be able to use this stories to generate their
                        own stories.</p>
                    <h3 className="text-white title">Our main <strong>Goal</strong></h3>
                    <p className="body ps-4">Our main goal is to help writers generate </p>
                    <h3 className="text-white title">Why <strong>Top Target</strong></h3>
                    <p className="body ps-4">There is an increase in the interest of people on real life crime stories </p>
                    <h3 className="text-white title">About the <strong>API</strong> we use</h3>
                    <p className="body ps-4">The API that we use contains the information of about on thousand people.
                        The information contains data about the crimes, age, weight, and location of where the crime was committed.
                    </p>
                    <h3 className="text-white title">Main <strong>features</strong></h3>
                    <ul>
                        <li className="body">Provide information to users about the most wanted criminals and missing persons</li>
                        <li className="body">Save the cards of the most wanted criminals and missing persons in the profile</li>
                        <li className="body">Generate stories using IA based on the stories of the most wanted criminals and missing persons</li>
                    </ul>
                    
                    <div className="d-flex ">
                        <span className="m-3   w-3">
                            <a href="https://www.google.com">
                                <i className="fas fa-inbox fa-xl" style={{ color: "#ffffff" }} />
                            </a>
                        </span>
                        <span className="m-3">
                            <a href="https://www.google.com">
                            <i className="fab fa-instagram fa-xl" style={{ color: "#ffffff" }} />
                            </a>
                        </span>
                        <span className="m-3">
                            <a href="https://www.google.com">
                                <i className="fab fa-linkedin fa-xl" style={{ color: "#ffffff" }} />
                            </a>
                        </span>
                    </div>
                </article>
            </section>

            <section className="row  ">
                <h3 className="mt-3 mb-3 title text-white">Developers</h3>

                <div className=" bg-dark col-4 px-1" >
                    <aside className="card bg-primary text-white px-1">
                        <img className="card-img-top mt-3" src={mar} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Mar Aguayo</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <aside className="d-flex">
                                <span className="m-3">
                                    <a href="https://www.google.com">
                                        <i className="fas fa-inbox fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                                <span className="m-3">
                                    <a href="https://www.google.com">
                                    <i className="fab fa-instagram fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                                <span className="m-3">
                                    <a href="https://www.google.com">
                                    <i className="fab fa-linkedin fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                            </aside>
                        </div>
                    </aside>
                </div>
                <div className="bg-dark col-4 px-1" >
                    <aside className="card bg-primary text-white px-1" >
                        <img className="card-img-top mt-3" src={mery} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Mery Alvarez</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <aside className="d-flex">
                                <span className="m-3">
                                    <a href="https://www.google.com">
                                        <i className="fas fa-inbox fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                                <span className="m-3">
                                    <a href="https://www.google.com">
                                    <i className="fab fa-instagram fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                                <span className="m-3">
                                    <a href="https://www.google.com">
                                    <i className="fab fa-linkedin fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                            </aside>
                        </div>
                    </aside>
                </div>
                
                <div className="col-4 px-1 bg-dark">
                    <aside className="card bg-primary text-white px-1" >
                        <img className="card-img-top mt-3" src={fide} alt="José Fidel Paredes"/>
                        <div className="card-body">
                            <h5 className="card-title">José Fidel Paredes</h5>
                            <p className="card-text">Computer Science student at 4Geeks Academy. Currently studying computer science and developing my knoledge .</p>
                            <aside className="d-flex">
                                <span className="m-3">
                                    <a href="https://www.google.com">
                                        <i className="fas fa-inbox fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                                <span className="m-3">
                                    <a href="https://www.google.com">
                                    <i className="fab fa-instagram fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                                <span className="m-3">
                                    <a href="https://www.google.com">
                                    <i className="fab fa-linkedin fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                            </aside>
                        </div>
                    </aside>
                </div>

            </section>
            <section className=" row  ">
                <h3 className="mt-3 mb-3 text-white">Managers</h3>
                <div className="bg-dark col-4 px-1" >
                    <aside className="card bg-primary text-white px-1" >
                        <img className="card-img-top mt-3" src={mery} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Mery Alvarez</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <aside className="d-flex">
                                <span className="m-3">
                                    <a href="https://www.google.com">
                                        <i className="fas fa-inbox fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                                <span className="m-3">
                                    <a href="https://www.google.com">
                                    <i className="fab fa-instagram fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                                <span className="m-3">
                                    <a href="https://www.google.com">
                                    <i className="fab fa-linkedin fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                            </aside>
                        </div>
                    </aside>
                </div>
                <div className="bg-dark col-4 px-1" >
                    <aside className="card bg-primary text-white px-1" >
                        <img className="card-img-top mt-3" src={mery} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Mery Alvarez</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <aside className="d-flex">
                                <span className="m-3">
                                    <a href="https://www.google.com">
                                        <i className="fas fa-inbox fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                                <span className="m-3">
                                    <a href="https://www.google.com">
                                    <i className="fab fa-instagram fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                                <span className="m-3">
                                    <a href="https://www.google.com">
                                    <i className="fab fa-linkedin fa-xl" style={{ color: "#ffffff" }} />
                                    </a>
                                </span>
                            </aside>
                        </div>
                    </aside>
                </div>
            </section>
            
        </div>
    );
};