import React, { Component } from 'react';
import NeoData from './sample-neo';
import { ProgressBar, Panel, PanelGroup, Table } from 'react-bootstrap';

class DisplayData extends Component {
  constructor(props){
    super(props);
    let today = new Date();
    this.state = {
      //asteroids: [],
      start_date: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
      api_key: "NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo"
    }
  }

  componentDidMount(){
    //console.log(this.state);
    fetch("https://api.nasa.gov/neo/rest/v1/feed?"+`start_date=${this.state.start_date}&api_key=${this.state.api_key}`).then((rawResponse)=>{
      console.log(rawResponse);
      return rawResponse.json();
    }).then((parsedResponse) => {
      let neoData = parsedResponse.near_earth_objects;
      let asteroids = [];
      console.log(neoData);
      Object.keys(neoData).forEach((date) => {
        neoData[date].forEach((asteroid) => {
          asteroids.push({
            closestApproach: parseInt(asteroid.close_approach_data[0].miss_distance.miles),
            id: asteroid.neo_reference_id,
            name: asteroid.name,
            date: asteroid.close_approach_data[0].close_approach_date,
            diameterMin: asteroid.estimated_diameter.feet.estimated_diameter_min.toFixed(0),
            diameterMax: asteroid.estimated_diameter.feet.estimated_diameter_max.toFixed(0),
            velocity: parseFloat(asteroid.close_approach_data[0].relative_velocity.miles_per_hour).toFixed(0),
            distance: asteroid.close_approach_data[0].miss_distance.miles,
            hazardous: asteroid.is_potentially_hazardous_asteroid
          });
        });
      });
      console.log("in comp will mount: ", asteroids);
      let asteroid_list = asteroids.map((asteroid, i) => {
        if(asteroid.hazardous === true){
        //console.log(asteroid.name);
          let p_bar = ((100-(asteroid.closestApproach)/1000000) < 80) ? "warning" : "danger";
          console.log(p_bar, (100-(asteroid.closestApproach)/1000000));
          return (
            <section key={asteroid.id}>
              <div className="title"><h3>Asteroid: {asteroid.name}</h3></div>
              <span>{asteroid.closestApproach.toLocaleString('en')} miles away<ProgressBar bsStyle={p_bar} active now={100-(asteroid.closestApproach)/1000000}/></span>
              <Table responsive>
                <thead>
                <tr>
                  <th>date</th>
                  <th>velocity</th>
                  <th>hazardous</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{asteroid.date}</td>
                    <td>{asteroid.velocity}</td>
                    <td>{asteroid.hazardous.toString()}</td>
                  </tr>
                </tbody>
              </Table>
            </section>
          );
        }
      });
      this.setState({asteroids: asteroid_list});
      });
    }

  render(){
    console.log(this.state);
    let { asteroids } = this.state;
    console.log("asteroids: ", asteroids);
    //console.log(asteroid_list);
    return(
      <main>
        {asteroids}
      </main>
    )
  }
}
export default DisplayData;

// style={{width: 20+"rem", border: 1+"px solid black"}}

// <section key={asteroid.id}>
//   <h3>Asteroid: {asteroid.name}</h3>
//   <div>{Object.keys(asteroid).map((key, i) => {
//     //console.log(key, asteroid[key]);
//     if(key !== "name" && key !== "id"){
//       if(key === "closestApproach"){
//         return (<span>How Close?<ProgressBar active now={(asteroid[key])/500000}/></span>);
//       }
//       if(key === "hazardous"){
//         return (<li key={i}>{key} : {asteroid[key].toString()}</li>);
//       }
//       return (<li key={i}>{key} : {asteroid[key]}</li>);
//     }
//   })}
//   </div>
// </section>);
// }});
