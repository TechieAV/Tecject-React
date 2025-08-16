import React, { useState } from 'react';
import styled from 'styled-components';
import contactGif from '../../assets/Login/contact.gif';
import { submitConnectForm } from '../../Services/ContactService.js';

/* ====== Styled Components with Responsiveness ====== */
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #0d0d2b, #1a1a3d);
  color: white;
  font-family: 'Poppins', sans-serif;
  padding: 2rem;

  @media (max-width: 1024px) {
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 2rem;

  @media (max-width: 1024px) {
    padding-right: 1rem;
  }

  @media (max-width: 768px) {
    padding-right: 0;
    text-align: center;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;

  @media (max-width: 1024px) {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const SubText = styled.p`
  font-size: 1rem;
  color: #ccc;

  a {
    color: #8ab4f8;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const RightSection = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.02);
  padding: 2rem;
  border-radius: 12px;

  @media (max-width: 1024px) {
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    margin-top: 2rem;
    padding: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  background: #1a1a2e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 0.85rem;
    font-size: 0.95rem;
  }
`;

const TextArea = styled.textarea`
  background: #1a1a2e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  resize: none;
  height: 120px;

  @media (max-width: 768px) {
    padding: 0.85rem;
    font-size: 0.95rem;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  flex-wrap: wrap;

  label {
    margin-left: 0.5rem;
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    label {
      font-size: 0.8rem;
    }
  }
`;

const TimeSlotsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

const TimeSlotButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: ${({ active }) => (active ? '2px solid #8a2be2' : '1px solid #444')};
  background: ${({ active }) => (active ? '#4b0082' : '#1a1a2e')};
  color: white;
  cursor: pointer;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    flex: 1 1 calc(50% - 0.5rem);
    text-align: center;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(to right, #8a2be2, #4b0082);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1.5rem;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    padding: 0.9rem;
    font-size: 0.95rem;
  }
`;

/* ====== Component ====== */
const ContactFormSplit = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    agree: false,
  });

  const [scheduleMeeting, setScheduleMeeting] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');

  const timeSlots = [
    '9:00 - 9:30 AM',
    '9:30 - 10:00 AM',
    '10:00 - 10:30 AM',
    '10:30 - 11:00 AM',
    '5:00 - 5:30 PM',
    '5:30 - 6:00 PM',
    '6:00 - 6:30 PM',
    '6:30 - 7:00 PM',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { agree, ...formDataWithoutAgree } = form;

    const payload = {
      ...formDataWithoutAgree,
      timeSlot: scheduleMeeting ? selectedSlot : 'No time slot selected',
    };

    try {
      await submitConnectForm(payload);
      alert('Form submitted successfully! We’ll contact you shortly.');
      setForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        agree: false,
      });
      setScheduleMeeting(false);
      setSelectedSlot('');
    } catch (error) {
      alert('Error submitting form: ' + error);
    }
  };

  return (
    <Container>
      <LeftSection>
        <Title>Let’s Get In Touch.</Title>
        <SubText>
          Or just reach out manually to{' '}
          <a href="footer">tecject@gmail.com</a>.
        </SubText>
        <img
          src={contactGif}
          alt="Contact GIF"
          style={{
            marginTop: '1.5rem',
            maxWidth: '100%',
            borderRadius: '12px',
          }}
        />
      </LeftSection>

      <RightSection>
        <Form onSubmit={handleSubmit}>
          <Label>Full Name</Label>
          <Input
            name="name"
            type="text"
            placeholder="Enter your full name..."
            value={form.name}
            onChange={handleChange}
            required
          />

          <Label>Email Address</Label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email address..."
            value={form.email}
            onChange={handleChange}
            required
          />

          <Label>Phone Number</Label>
          <Input
            name="phone"
            type="tel"
            placeholder="+44 (000) 000–0000"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <CheckboxWrapper>
            <input
              type="checkbox"
              checked={scheduleMeeting}
              onChange={(e) => {
                setScheduleMeeting(e.target.checked);
                if (!e.target.checked) setSelectedSlot('');
              }}
            />
            <label>Yes, I'd love a free 1:1 strategy session</label>
          </CheckboxWrapper>

          {scheduleMeeting && (
            <div style={{ marginTop: '1rem' }}>
              <Label>Pick a time that works for you:</Label>
              <TimeSlotsWrapper>
                {timeSlots.map((slot, index) => (
                  <TimeSlotButton
                    type="button"
                    key={index}
                    active={selectedSlot === slot}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </TimeSlotButton>
                ))}
              </TimeSlotsWrapper>
            </div>
          )}

          <Label>Message</Label>
          <TextArea
            name="message"
            maxLength="300"
            placeholder="Enter your main text here..."
            value={form.message}
            onChange={handleChange}
            required
          />
          <small style={{ textAlign: 'right', color: '#aaa' }}>
            {form.message.length}/300
          </small>

          <CheckboxWrapper>
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              required
            />
            <label>
              I hereby agree to our <a href="#">Privacy Policy</a> terms.
            </label>
          </CheckboxWrapper>

          <SubmitButton type="submit">Submit Form →</SubmitButton>
        </Form>
      </RightSection>
    </Container>
  );
};

export default ContactFormSplit;
