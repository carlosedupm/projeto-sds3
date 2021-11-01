import DataTable from 'components/DataTable/DataTable';
import Footer from 'components/Footer/Footer';
import NavBar from 'components/NavBar/NavBar';
import React from 'react';

function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="text-primary">Olá mundo!</h1>
      </div>
      <DataTable />
      <Footer />
    </>
  );
}

export default App;
