import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

interface Candidate {
  login: string; //username
  name: string | null; //full name (can be null)
  avatar_url: string;  //profile pic URL
  email: string | null; //(can be null)
  company: string | null; //(can be null)
  location: string | null; //(can be null)
  html_url: string; //gitHub profile URL
}

const CandidateSearch = () => {
const [candidate, setCandidate] = useState<Candidate | null>(null);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);
const [_savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

useEffect(() => {
  loadCandidate();
  loadSavedCandidates();
}, []);

//find and load one of the (valid)candidates
const loadCandidate = async () => {
  setLoading(true);
  setError(null);

  try {
    console.log("We're fetching the candidate list for you...");
    const users = await searchGithub();

    for (const user of users) {
      console.log("We're fetching the candidate details for you", user.login);
      const userDetails = await searchGithubUser(user.login);

      if (userDetails) {
        console.log("Candidate data was received:", userDetails);
        setCandidate(userDetails);
        return;
      }
    }
    console.warn("We didn't find valid candidates. Sorry!");
    setCandidate(null);
  } catch (error) {
    setError("We failed to load candidate. Please try again!");
    console.error("There was an error fetching candidate:", error);
  } finally {
    setLoading(false);
  }
};
//load a saved candidate from local storage
const loadSavedCandidates = () => {
  const storedCandidates = localStorage.getItem("savedCandidates");
  if (storedCandidates) {
    setSavedCandidates(JSON.parse(storedCandidates));
  }
};

//saving candidate to my local storage
const saveCandidate = () => {
  if (candidate) {
    try {
      const storedCandidates: Candidate[] = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
      if (!storedCandidates.some((c) => c.login === candidate.login)) {
        const updatedCandidates = [...storedCandidates, candidate];
        localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));

        setSavedCandidates(updatedCandidates); //update
        console.log("Candidate Saved successfully:", candidate);
        loadCandidate(); //load the next candidate
      } else {
        console.warn("Candidate already saved:")
      }
    } catch (error) {
      console.error("There was an error saving this candidate:", error);
    }
  }
};

//what the webpage actually looks like using it
return (
  <main>
      <h1>Candidate Search</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
      ) : candidate ? (
        <div className="card">
          <img
            src={candidate.avatar_url}
            alt={candidate.name || "Candidate"}
            className="candidate-avatar"
          />
          <h2>{candidate.name || "No Name Available"} <em>({candidate.login})</em></h2>
          <p><strong>Location:</strong> {candidate.location || "Not available"}</p>
          <p><strong>Company:</strong> {candidate.company || "Not available"}</p>
          <p><strong>Email:</strong>
            {candidate.email ? (
              <a href={`mailto:${candidate.email}`} style={{ color: "#00aaff" }}>
                {candidate.email}
              </a>
            ) : "Not available"}
          </p>
          <p>
            <strong>Profile:</strong>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer" style={{ color: "#00aaff" }}>
              GitHub Profile
            </a>
          </p>

          <div className="button-container">
            <button className="reject-btn" onClick={loadCandidate}>−</button>
            <button className="accept-btn" onClick={saveCandidate}>+</button>
          </div>
        </div>
      ) : (
        <p>No candidates available.</p>
      )}
    </main>
);

};


  
export default CandidateSearch;
