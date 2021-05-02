import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";

function App() {
  // #1 set up state values...default "loading" will be true
  const [loading, setLoading] = useState(true);
  // #2 "jobs" state will be set to an empty array
  const [jobs, setJobs] = useState([]);
  // #3 set "value" to the first item of the array..
  const [value, setValue] = useState(0);

  // #4 fetch the API..
  const fetchJobs = async () => {
    // fetch the url for the API...
    const response = await fetch(url);
    const newJobs = await response.json();
    // we want to set "jobs" state equal to the API array...
    setJobs(newJobs);
    // we want to set "loading"state to false...
    setLoading(false);
  };

  // #5 useEffect is essentially "when do you want to run this function".."[]" means "when the initial app renders"
  useEffect(() => {
    fetchJobs();
  }, []);

  // #6 if the app is loading, return an <h1> saying "loading..."
  if (loading) {
    return (
      <section className="section loading">
        <h1>loading...</h1>
      </section>
    );
  }
  // otherwise, if the app is done loading, return this...

  // #7 we want to destructure all the properties of the "jobs" array item
  // "value" refers to the array item (by default the first item [0])...
  const { company, dates, duties, title } = jobs[value];
  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* button container */}
        <div className="btn-container">
          {/* we want to iterate over the "jobs" array, and for every "job", we display a button */}
          {jobs.map((item, index) => {
            return (
              <button
                key={item.id}
                //  when we click the button, we want to grab that index
                // so when we click on the button, we want to "setValue" to the specific index of the jobs array that the button coresponds to..
                // when the state of "value" changes, so does what is being displayed..
                onClick={() => setValue(index)}
                //  if the index of the button matches the current state value, THEN (&&) add the "active-btn" class...
                className={`job-btn ${index === value && "active-btn"}`}
              >
                {item.company}
              </button>
            );
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {/* iterate over "duties" array within the "jobs" array.. */}
          {duties.map((duty, index) => {
            // return a <p> tag with the individual "duty"...
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default App;
