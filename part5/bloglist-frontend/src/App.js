import React, { useState } from 'react';

import Blogs from './components/Blogs';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);

  return <div>{user ? <Blogs user /> : <Login userHandler={setUser} />}</div>;
}

export default App;
