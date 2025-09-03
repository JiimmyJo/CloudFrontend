import { useState } from "react";
import "./App.css";
import { submit } from "../api/api";

function App() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    if (!fullName) {
      setMessage("Kontrollera att du har fyllt i ditt namn.");
      return;
    }
    if (!email || !email.includes("@")) {
      setMessage("Kontrollera att din Email är rätt.");
      return;
    }

    const data = await submit(fullName, email);
    if ((data.statusCode = 200)) {
      setMessage(data.message || "Tack, du är nu inskriven!");
      setFullName("");
      setEmail("");
    } else {
      setMessage("Nu blev det lite tokigt, försök igen senare.");
    }
  };

  return (
    <>
      <div className="form-container">
        <form>
          <input
            type="fullName"
            placeholder="Namn"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </form>
      </div>
      <div className="form-container-shadow"></div>
      <div className="form-background-button">
        <button onClick={handleSubmit} type="submit" title="Skicka"></button>
        <i
          onClick={handleSubmit}
          className="bi bi-send-check"
          aria-hidden="true"
        ></i>
      </div>
      <div className="error-message">{message && <p>{message}</p>}</div>
    </>
  );
}

export default App;
