import { useState, useEffect } from "react";
import io from "socket.io-client";

function Home() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!socket) {
      const initSocket = async () => {
        try {
          const res = await fetch("/api/socket");
          console.log("res", res, res.status);

          const newSocket = io();
          setSocket(newSocket);

          newSocket.on("receive-message", (message) => {
            console.log("message", message);
            setAllMessages((prev) => [...prev, message]);
          });
        } catch (err) {
          console.error("Error initializing socket:", err);
        }
      };

      initSocket();
    }

    return () => {
      if (socket) {
        socket.off("receive-message");
      }
    };
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && message) {
      if (socket) {
        socket.emit("send-message", {
          id: Math.random().toString(36).substring(7),
          username,
          message,
        });
        setMessage("");
      } else {
        console.error("Socket not initialized yet. Try again later.");
      }
    }
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div style={{ width: "50%" }}>
        <h2>Opa!</h2>
        {/* 
        <h3>olá olá</h3>
        <h3>
          olha isso, consigo alterar o código desse site e me comunicar
          diretamente com você em tempo real
        </h3>
        <h3>posso fazer coisas como por exemplo:</h3>
        <img
          src="https://clicr.com.br/wp-content/uploads/2023/01/linguicinha-pet-1.jpg"
          style={{ width: "100%" }}
        />
        <h3>PAM!</h3>
        <h3>sacou?</h3>
        <h3>legal né?</h3>
        <h3>
          agora para conseguirmos nos comunicar de forma completa, aguarde um
          pouco e depois preencha o campo que irá aparecer do lado direito
        </h3>
        <h3></h3>
        */}
      </div>
      {/* <div>
        <div>
          {allMessages.map(({ username, message }, index) => (
            <h2 key={index}>
              {username}:{message}
            </h2>
          ))}
        </div>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={handleSubmit}
        >
          <input
            style={{ height: "30px" }}
            type=""
            placeholder="Digite seu nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {username && (
            <>
              <input
                style={{ height: "30px" }}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value && e.target.value)}
                placeholder="Digite sua mensagem"
              />
              <input style={{ height: "40px" }} type="submit" value="Enviar" />
            </>
          )}
        </form>
      </div> */}
    </div>
  );
}

export default Home;
