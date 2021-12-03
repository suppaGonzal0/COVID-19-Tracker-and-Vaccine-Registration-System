import emailjs from 'emailjs-com';
import './Contact.css'

export default function Contact(){

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('VaxTrak', 'VaxTrak', e.target, 'user_Cxb50mTDX9UVFFj8HJZQQ')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
  };

  return (
    <>
      <form onSubmit={sendEmail} className="form">

        <p>Submit Your Ticket </p>

        <div className="field">
          <label for="subject">Subject</label>
          <select name="subject" className="subject">
            <option value="" selected hidden></option>
            <option>Seeking help from Medical Experts</option>
            <option>Inquiry regarding vaccination</option>
            <option>Facing technical issues</option>
            <option>Feedback</option>
          </select>        
        </div>

        <div className="field">
          <label for="name">Name</label>
          <input type="text" name="name" className="name"/>
        </div>

        <div className="field">
          <label for="email">E-mail</label>
          <input type="text" name="email" className="email"/>
        </div>

        <div className="field">
          <label for="msg">Message</label>
          <textarea name="msg" className="msg"/>
        </div>

        <input type="submit" id="button" value="Send Email"/>

        </form>
    </>
  );
};
