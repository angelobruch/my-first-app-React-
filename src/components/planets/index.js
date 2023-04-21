import React, { Fragment, useState, useEffect } from "react";
import Planet from "./planet";
import { toHaveDescription } from "@testing-library/jest-dom/dist/matchers";
import Form from "./form";

// const clickOnPlanet = (name)  => {
//     console.log(`Um click no planeta: ${name}`);
// }

async function getPlanets(){
    let response = await fetch('http://localhost:3000/api/planets.json');
    let data = await response.json();
    return data
}

const Planets = () => {
    
    const [planets, setPlanets] = useState([])	

    useEffect(() => {  
        getPlanets().then(data => {
            setPlanets(data['planets']);
        })
    }, [])

    const addPlanet = (new_planets) => {
        setPlanets([...planets, new_planets]);
    }

    const removeLast = () => {
        let new_planets = [...planets]
        new_planets.pop()
        setPlanets(new_planets)
    }

    const duplicateLastPlanet = () => {
        let last_planet = planets[planets.length - 1]
        setPlanets([...planets, last_planet])
    }

    return (
        <Fragment>
            <h3> Planet List </h3>
            <hr />
            <Form addPlanet = {addPlanet}/>
            <button onClick={removeLast}>Remove Last</button>
            <button onClick={duplicateLastPlanet}>duplicateLastPlanet</button>
            <hr />
            {planets.map((planet, index) =>
                <Planet
                    name={planet.name}
                    description={planet.description}
                    img_url={planet.img_url}
                    link={planet.link}
                    id={planet.id}
                    key={index}
                // clickOnPlanet={clickOnPlanet}
                // title_with_underline = {true}
                />
            )}
        </Fragment>
    );
}
    

export default Planets;
