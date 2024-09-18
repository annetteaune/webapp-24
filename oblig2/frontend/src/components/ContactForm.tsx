import React, { useState } from "react";

type Message = {
  name: string;
  message: string;
};

export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [submittedMessage, setSubmittedMessage] = useState<Message>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Enkel validering
    if (name.trim() === "" || message.trim() === "") {
      setErrorMsg("Begge feltene må fylles ut.");
      return;
    }

    // Lagre dataen som ble sendt inn
    setSubmittedMessage({ name, message });

    // Resette skjemaet ved innsending
    setErrorMsg("");
    setName("");
    setMessage("");
  };

  return (
    <section className="message-form-wrapper">
      <h3>Legg igjen en melding!</h3>
      <form className="msg-form" onSubmit={handleSubmit}>
        <label>
          Navn:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Melding:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        {errorMsg === "" ? null : <p className="error-txt">{errorMsg}</p>}
        <button type="submit" className="msg-btn">
          Send
        </button>
      </form>
      {submittedMessage && <pre>{JSON.stringify(submittedMessage)}</pre>}
    </section>
  );
}
