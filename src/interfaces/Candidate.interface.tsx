// TODO: Create an interface for the Candidate objects returned by the API
import { searchGithub } from "../api/API";

interface Candidate {
    login: string; //username
    name: string | null; //full name (can be null)
    avatar_url: string;  //profile pic URL
    email: string | null; //(can be null)
    company: string | null; //(can be null)
    location: string | null; //(can be null)
    html_url: string; //gitHub profile URL
  }
