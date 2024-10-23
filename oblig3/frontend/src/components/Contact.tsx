import { Student } from "../interfaces";
import ContactForm from "./ContactForm";

interface ContactProps {
  student: Student;
}

export default function Contact({ student }: ContactProps) {
  const handleEmailClick = () => {
    alert(`E-post: ${student.email}`);
  };

  return (
    <>
      <h2 className="section-title" id="contact">
        Kontakt
      </h2>
      <section id="contact-wrapper">
        <section className="info-wrapper">
          <h3>{student.name}</h3>
          <p>{student.degree}</p>
          <button className="email-btn" onClick={handleEmailClick}>
            E-post
          </button>
        </section>
        <ContactForm />
      </section>
    </>
  );
}
