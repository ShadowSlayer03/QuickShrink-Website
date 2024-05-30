import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

const Support = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

  const handleMesgSend = async (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: name,
      from_email: email,
      message: feedback,
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID_EMAILJS,
        import.meta.env.VITE_TEMPLATE_ID_EMAILJS,
        templateParams,
        import.meta.env.VITE_USER_ID_EMAILJS 
      );
      setMessage('Feedback sent successfully');
      setName("");
      setEmail("");
      setFeedback("");
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage('Error sending feedback');
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      data-scroll-section
      id="support"
      className="w-full h-[120vh] text-white font-outfit flex flex-col items-center justify-center gap-[2vw]"
    >
      <p className="uppercase text-blue-300">Share Your Thoughts</p>
      <h2 className="font-lobster mb-9 text-center text-3xl lg:text-4xl font-semibold">
        Contact Us&nbsp; for Support and Feedback
      </h2>
      <div className="text-center">
        {message && <p>{message}</p>}
      </div>
      <form
        className="h-[45%] w-[85%] md:w-[40%] glassmorphic-background flex items-center flex-col p-4 gap-2 rounded-lg"
        onSubmit={handleMesgSend}
      >
        <input
          className="input-style"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input-style"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          className="input-style"
          name="feedback"
          cols="30"
          rows="15"
          placeholder="Your suggestions or feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
        <button type="submit" className="text-center bg-[#7521fc59] text-white p-2 whitespace-nowrap rounded-4xl">Send Feedback</button>
      </form>
    </div>
  );
};

export default Support;