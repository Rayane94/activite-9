import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://offers-api.digistos.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Inscription réussie !");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.message || "Erreur lors de l’inscription.");
      }
    } catch (error) {
      setMessage("Erreur de réseau ou du serveur.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "80px" }}>
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          S'inscrire
        </button>
      </form>
      {message && <p style={{ marginTop: "20px", color: "red" }}>{message}</p>}
    </div>
  );
}

export default Register;
