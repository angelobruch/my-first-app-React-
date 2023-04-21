import React, { Fragment, useState, useEffect } from "react";
import GrayImg from "../shared/gray_img";
import DescriptionWithLink from "../shared/gray_img/description_with_link";
import Form from "../planet/form";
import { useParams, useHistory, Redirect } from 'react-router-dom';


async function getPlanet(id) {
    let response = await fetch(`http://localhost:3000/api/${id}.json`)
    let data = await response.json()
    return data;
}

const Planet = () => {
    const [satellites, setSatellites] = useState([]);
    const [planet, setPlanet] = useState({});
    const [redirect, setRedirect] = useState(false);

    let { id } = useParams();
    let history = useHistory();
    
    useEffect(() => {
        getPlanet(id).then(data => {
            setSatellites(data['satellites']);
            setPlanet(data['data']);
        }, error => {
            setRedirect(true)
        })
    }, [])

    const goToPlanets = () => {
        history.push('/');
    }

    const addSatellite = (new_satellite) => {
        setSatellites([...satellites, new_satellite]);
    }


    let title;
    if (planet.title_with_underline)
        title = <h4><u>{planet.name}</u></h4>
    else
        title = <h4>{planet.name}</h4>

    if (redirect)
        return <Redirect to='/' />
    return (
        <div>
            {title}
            <DescriptionWithLink description={planet.description} link={planet.link} />
            <GrayImg img_url={planet.img_url} gray={planet.gray} />
            <h4>Satélites</h4>
            <hr/>
            <Form addSatellite={addSatellite} />
            <hr/>
            <ul>
                {satellites.map((satellite, index) =>
                    <li key={index}>{satellite.name}</li>
                )}
            </ul>
            <hr />
            <button onClick={goToPlanets}>Voltar a Listagem</button>
            {/* <Link to='/'>Voltar a Listagem</Link> */}
        </div>
    );
}

export default Planet;