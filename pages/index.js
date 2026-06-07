import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  async function login() {
    const fakeId = crypto.randomUUID();

    await supabase.from("profiles").insert({
      id: fakeId,
      username,
    });

    setUser({ id: fakeId, username });
  }

  return (
    <div style={{ background: "#1a0b2e", color: "white", height: "100vh", padding: 20 }}>
      <h1>YarChat</h1>

      {!user ? (
        <div>
          <input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={login}>Enter</button>
        </div>
      ) : (
        <ChatList user={user} />
      )}
    </div>
  );
}

function ChatList({ user }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    loadChats();
  }, []);

  async function loadChats() {
    const { data } = await supabase.from("chats").select("*");
    setChats(data || []);
  }

  return (
    <div>
      <h2>Chats</h2>
      {chats.map((c) => (
        <a key={c.id} href={`/chat/${c.id}`}>
          <div style={{ padding: 10, borderBottom: "1px solid #333" }}>
            {c.name}
          </div>
        </a>
      ))}
    </div>
  );
}