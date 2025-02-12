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
      const storedCandidates
    }
  }
}





}




  
export default CandidateSearch;
