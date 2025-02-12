import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <>
      <Nav />
      <main>
      <Routes>
          <Route path="/" element={<CandidateSearch />} />
          <Route path="/potential" element={<PotentialCandidates />} /> {}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
