import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:7071/api/FormFunction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error("Har du verkligen fyllt i alla fält korrekt?");
      }

      await response.json();
      setMessage("Tack, du är nu inskriven!");
    } catch (error) {
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
