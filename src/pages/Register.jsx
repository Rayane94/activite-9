import { useState } from "react";

function Register() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [info, setInfo] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://offers-api.digistos.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: mail, password: pass }),
    });

    const data = await res.json();
    if (res.ok) {
      setInfo("Inscription réussie");
      setMail("");
      setPass("");
    } else {
      setInfo(data.message || "Une erreur s’est produite");
    }
  };

  return (
    <div>
      <h2>S’inscrire</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} />
        <input placeholder="Mot de passe" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
        <button>Valider</button>
      </form>
      {info && <p>{info}</p>}
    </div>
  );
}

export default Register;
