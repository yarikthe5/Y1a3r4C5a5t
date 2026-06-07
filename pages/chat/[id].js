import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/router";

export default function Chat() {
  const router = useRouter();
  const { id } = router.query;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!id) return;
    loadMessages();

    const channel = supabase
      .channel("chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((m) => [...m, payload.new]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [id]);

  async function loadMessages() {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", id);

    setMessages(data || []);
  }

  async function send() {
    await supabase.from("messages").insert({
      chat_id: id,
      content: text,
      sender_id: "test",
    });

    setText("");
  }

  return (
    <div style={{ background: "#1a0b2e", color: "white", height: "100vh" }}>
      <div>
        {messages.map((m) => (
          <div key={m.id} style={{ padding: 5 }}>
            {m.content}
          </div>
        ))}
      </div>

      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}