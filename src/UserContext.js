const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const stored = localStorage.getItem("loggedInUser");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (username) => {
    setUser(username);
    localStorage.setItem("loggedInUser", JSON.stringify(username));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
