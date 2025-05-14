import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const r = await fetch("https://offers-api.digistos.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: mail, password: pass }),
    });

    const json = await r.json();
    if (r.ok) {
      const exp = new Date(Date.now() + json.expires_in * 1000).toISOString();
      localStorage.setItem("auth", JSON.stringify({ token: json.access_token, expiresAt: exp }));
      nav("/dashboard");
    } else {
      setMsg(json.message || "Erreur de connexion");
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} />
        <input placeholder="Mot de passe" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
        <button>Se connecter</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}

export default Login;
