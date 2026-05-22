import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import BookInfoScreen from './screens/BookInfoScreen';
import BookAddScreen from './screens/BookAddScreen';

function App( ) {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomeScreen
            books={books}
          />
        }
      />
      <Route
        path="/infobook/:id"
        element={
          <BookInfoScreen
            books={books}
            onDeleteBook={handleDeleteBook}
            onUpdateBook={handleUpdateBook}
            onMakeImg={handleMakeImg}
          />
        }
      />
      <Route path="/addbook" element={<BookAddScreen />} />
    </Routes>
  );
}

export default App;
