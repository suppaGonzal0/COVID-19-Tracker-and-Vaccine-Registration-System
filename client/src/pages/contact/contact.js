import emailjs from 'emailjs-com';
import './contact.css'

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
    <div className='contactContainer'>
      <div className='contactImgBox'>
        <img src="contact.png" alt="" className='contactImg'/>
      </div>
      <form onSubmit={sendEmail} className="contactForm">

        <h2 className="contactH2">Submit Your Ticket </h2>

        <div className="contactField">
          <label className='contactLabel'>Subject</label>
          <select name="subject" className="subject">
            <option defaultValue hidden></option>            
            <option>Seeking help from Medical Experts</option>
            <option>Inquiry regarding vaccination</option>
            <option>Facing technical issues</option>
            <option>Feedback</option>
          </select>        
        </div>

        <div className="contactField">
          <label className='contactLabel'>Name</label>
          <input type="text" className="name"/>
        </div>

        <div className="contactField">
          <label className='contactLabel'>E-mail</label>
          <input type="text" className="email"/>
        </div>

        <div className="contactField">
          <label className='contactLabel'>Message</label>
          <textarea className="msg"/>
        </div>

        <input type="submit" className="contactButton" value="Send Email"/>

        </form>
        
    </div>
  );
};