import React, {useContext, useState} from "react"; 
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const CreateStory = () => {
    const { store, actions } = useContext(Context);
    const [updatedTitle, setTitle] = useState("")
    const [updatedDescription,setDescription] = useState("")
    const [genre, setGenre] =useState("a criminal biography")
    const [length, setLength] =useState("250")
    const [era, setEra] =useState("in no specific time")
    const [language, setLanguage] =useState("english")
    const [characters, setCharacters] =useState("no specific amount of")
    const [purpose, setPurpose] =useState("a simple story")
    const navigate = useNavigate();
    const handlePurpose =(e)=>{
        setPurpose(e.target.value)
    }
    const handleLanguage =(e)=>{
        setLanguage(e.target.value)
    }
    const handleEra =(e)=>{
        setEra(e.target.value)
    }
    const handleLength =(e)=>{
        setLength(e.target.value)
    }
    const handleCharacters =(e)=>{
        setCharacters(e.target.value)
    }
    const handleGenre =(e)=>{
        setGenre(e.target.value)
    }
    const handleTitle = (event) =>{
        setTitle(event.target.value)
    }
    const handleDescription = event =>{
        setDescription(event.target.value)
    }
    const generatePrompt= ()=>{
        return "I want to write " + purpose + " in " + language + ". The length should be " + length + " words and the genre should be " + genre
         + ". It should be set " + era + " and have " + characters + " characters. I want you to consider the following while generating the text: " 
        + updatedDescription + ". The text generated should be related to the " + store.currentCriminal.sex + " criminal " + store.currentCriminal.title 
        + " who's race is " + store.currentCriminal.race + ", hair is " + store.currentCriminal.hair_raw + " and nationality is " +
        store.currentCriminal.nationality + ". The criminal was born in " + store.currentCriminal.place_of_birth + " in " + 
        store.currentCriminal.dates_of_birth_used + ". The criminal uses the aliases: " + store.currentCriminal.aliases + ". Description of the criminal's crime: " 
        + store.currentCriminal.description + ". Remarks about the criminal: " + store.currentCriminal.remarks + ". A caution about the criminal: " + 
        store.currentCriminal.caution 
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(generatePrompt())
        const dataToSend = { story: generatePrompt() };
        console.log("los datos que se mandan:", dataToSend);
        const url = `${process.env.BACKEND_URL}/api/hello`;
        const options = {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
              'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, options)
		if (!response.ok) {
			console.log("Error loading message from backend", response.status, response.statusText)
			return
		}
		const data = await response.json()
        console.log(data.message)

        const dataToSend2 = {"user_id": store.user.id, "criminal_id": store.currentCriminal.id,"title": updatedTitle, 
                            "description": updatedDescription, "body": data.message, 
                            "prompt":dataToSend.story, "creation_date":new Date()};
        actions.setCurrentStory(dataToSend2)
        console.log("data to send 2", dataToSend2)
        const url2 = `${process.env.BACKEND_URL}/api/stories-criminals`;
        const options2 = {
            method: 'POST',
            body: JSON.stringify(dataToSend2),
            headers: {
              'Content-Type': 'application/json'
            }
        }
        const response2 = await fetch(url2, options2)
        if (!response2.ok) {
			console.log("Error loading message from backend", response2.status, response2.statusText)
			return
		}
		const data2 = await response2.json()
        navigate("/story");
		return data2; // Don't forget to return something, that is how the async resolves
    }
    return (
        <div className=" p-5 d-flex justify-content-center bg-dark text-white " >
            <article className="card shadow bg-dark w-75 row" >
                <header className="card-header bg-dark">
                    <h3 className="text-center  title text-white">Create your story</h3>
                </header>
                <section className="card-header row bg-dark mx-0">
                    <div className="col-2 p-1">
                        <select className="form-select "  onChange={handlePurpose} aria-label="Default select example">
                            <option defaultValue="Purpose">Purpose</option>
                            <option value="a Tv show script">TV show script</option>
                            <option value="a Tv show script in the style of South Park">TV Show script in the style of South Park</option>
                            <option value="an essay">Essay</option>
                            <option value="a police detailed description of a crime">Police detailed description of a crime</option>
                            <option value="social Media content">Social media content</option>
                            <option value="a podcast script">Podcast script</option>
                            <option value="a novel">Novel</option>
                            <option value="a story">Story</option>
                            <option value="a biography not from the criminal">Biography not from the criminal</option>
                            <option value="a criminal autobiography">Criminal autobiogrpahy</option>
                            <option value="a twitter thread">Twitter thread</option>
                            <option value="a youtube video script">Youtube video script</option>
                            <option value="a youtube video script in the style of Mrs Beast">Youtube video script in the style of Mrs Beast</option>
                            <option value="a tik tok script">Tik tok script</option>
                            <option value="a musical script">Musical script</option>
                            <option value="a musical scripte in the style of Hamilton">Musical script in the style of Hamilton</option>
                            <option value="a film script">Film script</option>
                            <option value="a film script in the style of Quentin Tarantino">Film script in the style of Quentin Tarantino</option>
                            <option value="a film script in the style of Greta Gerwig">Film script in the Style of Greta Gerwig</option>
                            <option value="a film script in the style of James Cameron">Film script in the Style of James Cameron</option>
                            <option value="a pop song lyrics">Pop song lyrics</option>
                            <option value="a pop song lyrics in the Style of Taylor Swift">Pop song lyrics in the style of Taylor Swift</option>
                            <option value="a rap song lyrics">Rap song lyrics</option>
                            <option value="a rap song lyrics in the style of Kendric Lamar">Rap song lyrics in the Style of Kendric Lamar</option>
                        </select>
                    </div>
                    
                    <div className="col-2 p-1">
                        <select className="form-select " onChange={handleGenre} aria-label="Default select example">
                            <option defaultValue="Genre">Genre</option>
                            <option value="drama">Drama</option>
                            <option value="comedy">Comedy</option>
                            <option value="terror">Terror</option>
                            <option value="crime">Crime</option>
                            <option value="biopic">Biopic</option>
                            <option value="sci-fi">Sci-fi</option>
                            <option value="documentary">Documentary</option>
                            <option value="romance">Romance</option>
                            <option value="sports">Sports</option>
                            <option value="Action Flick">Action flick</option>
                        </select>
                    </div>  
                    <div className="col-2 p-1">
                        <select className="form-select " onChange={handleLength} aria-label="Default select example">
                            <option defaultValue="Length">Length</option>
                            <option value="100">100 words</option>
                            <option value="250">250 words</option>
                            <option value="500">500 words</option>
                            <option value="750">750 words</option>
                            <option value="1000">1000 words</option>
                            <option value="1250">1250 words</option>
                            <option value="1500">1500 words</option>
                            <option value="2000">2000 words</option>
                            <option value="2500">2500 words</option>
                            <option value="3000">3000 words</option>
                        </select>
                    </div>
                    <div className="col-2 p-1">
                        <select className="form-select " onChange={handleLanguage} aria-label="Default select example">
                            <option defaultValue="Language">Language</option>
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                            <option value="french">French</option>
                            <option value="mandarin">Mandarin</option>
                            <option value="arabic">Arabic</option>
                            <option value="portuguese">Portuguese</option>
                            <option value="french">German</option>
                            <option value="morse code">Morse code</option>
                        </select>
                    </div>
                    <div className="col-2 p-1">
                        <select className="form-select " onChange={handleCharacters} aria-label="Default select example">
                            <option defaultValue="Characters">Nº of characters</option>
                            <option value="one">One chracter</option>
                            <option value="two">Two chracters</option>
                            <option value="three">Three chracters</option>
                            <option value="four">Four chracters</option>
                            <option value="five">Five characters</option>
                            <option value="more than six">more than six characters</option>
                        </select>
                    </div>
                    <div className="col-2 p-1">
                        <select className="form-select " onChange={handleEra} aria-label="Default select example">
                            <option defaultValue="Era">Era</option>
                            <option value="in the current time">Current time</option>
                            <option value="in thousands of years from now">In thousands of years from now</option>
                            <option value="in the year 2300">In the year 2300</option>
                            <option value="in the near future">Near future</option>
                            <option value="during covid-19 pandemic">During COVID-19 pandemic</option>
                            <option value="during the premiere of Avengers: Endgame">During the premiere of Avengers: Endgame</option>
                            <option value="during the 2010's World Cup">During the 2010's World Cup</option>
                            <option value="in the 2000s">In the 2000s</option>
                            <option value="in the 1990s">In the 1990s</option>
                            <option value="in the 1980s">In the 1980s</option>
                            <option value="in the 1960s">In the 1960s</option>
                            <option value="during WWII">During WWII</option>
                            <option value="during WWI">During WWI</option>
                            <option value="during Napoleon's time">During Napoleon's time</option>
                            <option value="during America's day of Independence">During America's day of Independence</option>
                            <option value="during the discovery of America">During the discovery of the Americas</option>
                            <option value="during Jesus' time">During Jesus' time</option>
                            <option value="in Ancient Greece">In Ancient Greece</option>
                            <option value="in Ancient Rome">In Ancient Rome</option>
                            <option value="during the Jurrasic era">During the Jurassic era</option>
                        </select>
                    </div>
                </section>
                <section className="row my-2">
                    <p className="col-2 text-white">Title:</p>
                    <div className="col-10" >
                        <input className="form-control " type="text"  value={updatedTitle}  onChange={handleTitle}  aria-label="title" />
                    </div>
                </section>
                <section className="row my-2">
                    <p className="col-2 bt-3 text-white">Subject:</p>
                    <div className="col-2 bt-3">
                        <input className="form-control " type="text" placeholder={store.currentCriminal.poster_classification} aria-label="Disabled input example" disabled />
                    </div>
                    <div className="col-4 bt-3">
                        <input className="form-control " type="text" placeholder={store.currentCriminal.title} aria-label="Disabled input example" disabled />
                    </div>
                    <p className="col-4 text-white">This subject information will be loaded automatically as reference</p>
                </section>
                <section className="row my-2">
                    <p className="col-2 text-white"> Description:</p>
                        <textarea className="col-10" name="Description"  value={updatedDescription} onChange={handleDescription} id="description"></textarea>
                </section>
                <footer className="row">
                    <span className="col-9"></span>
                    
                    <button className="btn btn-primary bg-info my-2 col-3" onClick={handleSubmit} type="submit">Create Story</button>
                    
                    
                </footer>
            </article>
        </div>
    );
};