function Login() {
  const { login } = React.useContext(UserContext);
  const [mode, setMode] = React.useState("login");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");

  const validatePassword = (pass) => {
    if (pass.length < 6) return "Password must be at least 6 characters.";
    if (!/[0-9]/.test(pass)) return "Password must contain at least one number.";
    if (!/[A-Za-z]/.test(pass)) return "Password must contain a letter.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    if (mode === "signup") {
      if (users[username]) {
        setError("User already exists.");
        return;
      }
      const validation = validatePassword(password);
      if (validation) {
        setError(validation);
        return;
      }
      users[username] = password;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem(`workouts_${username}`, "[]");
      alert("Sign up successful! Please log in.");
      setMode("login");
      setPassword("");
      setError("");
      return;
    }

    if (users[username] !== password) {
      setError("Invalid username or password.");
      return;
    }

    login(username);
  };

  return (
    <div style={{
      padding: "40px",
      textAlign: "center",
      maxWidth: "400px",
      margin: "auto",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    }}>
      <h2>{mode === "login" ? "🔐 Log In" : "🆕 Sign Up"}</h2>

      {error && (
        <div style={{ color: "red", marginBottom: "12px" }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br /><br />

        <div style={{ position: "relative", display: "inline-block" }}>
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ paddingRight: "30px" }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "6px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              userSelect: "none",
              fontSize: "14px"
            }}
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div><br /><br />

        <button type="submit">
          {mode === "login" ? "Log In" : "Sign Up"}
        </button>
      </form>

      <br />
      <button onClick={() => {
        setMode(mode === "login" ? "signup" : "login");
        setError("");
        setUsername("");
        setPassword("");
      }}>
        {mode === "login" ? "Create Account" : "Have an account? Log In"}
      </button>
    </div>
  );
}
