

import ExpenseTrack from "./components/ExpenseTrack";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);

  if (!user) {
    return (
      <div className="auth-container">
        {showSignUp ? (
          <>
            <SignUp onSignUp={() => setShowSignUp(false)} />
            <p>
              Already have an account?{' '}
              <button onClick={() => setShowSignUp(false)}>Login</button>
            </p>
          </>
        ) : (
          <>
            <Login onLogin={setUser} />
            <p>
              Don't have an account?{' '}
              <button onClick={() => setShowSignUp(true)}>Sign Up</button>
            </p>
          </>
        )}
      </div>
    );
  }

  return <ExpenseTrack user={user} />;
}

export default App;
