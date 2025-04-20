import React, { useState } from 'react';
import './EmailForm.css';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Validate email format
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const sendEmail = async (data) => {
    // This is where you would integrate with your email service
    // For example, using a service like EmailJS, SendGrid, or your custom backend
    
    // Simulating an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Email would be sent with data:', data);
        resolve({ success: true });
      }, 1500);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus('pending');
      
      try {
        // Send the form data
        const result = await sendEmail(formData);
        
        if (result.success) {
          setSubmitStatus('success');
          // Clear the form fields
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: ''
          });
        } else {
          setSubmitStatus('error');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
        // Reset status after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Contact Us</h2>
      <p className="form-description">Fill out the form below and we will get back to you as soon as possible.</p>
      
      {submitStatus === 'success' && (
        <div className="form-message success">
          Thank you for contacting us! We have received your message and will respond shortly.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="form-message error">
          There was an error sending your message. Please try again or contact us directly.
        </div>
      )}
      
      <form className="email-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-field">
            <label className="form-label" htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              className={`form-input ${errors.firstName ? 'form-input-error' : ''}`}
              type="text"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>
          
          <div className="form-field">
            <label className="form-label" htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              className={`form-input ${errors.lastName ? 'form-input-error' : ''}`}
              type="text"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>
        
        <div className="form-field">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            id="email"
            className={`form-input ${errors.email ? 'form-input-error' : ''}`}
            type="email"
            name="email"
            placeholder="johndoe@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-field">
          <label className="form-label" htmlFor="subject">Subject</label>
          <input
            id="subject"
            className={`form-input ${errors.subject ? 'form-input-error' : ''}`}
            type="text"
            name="subject"
            placeholder="How can we help you?"
            value={formData.subject}
            onChange={handleChange}
          />
          {errors.subject && <span className="error-message">{errors.subject}</span>}
        </div>
        
        <div className="form-field">
          <label className="form-label" htmlFor="message">Message</label>
          <textarea
            id="message"
            className={`form-textarea ${errors.message ? 'form-input-error' : ''}`}
            name="message"
            placeholder="Please provide details about your inquiry..."
            value={formData.message}
            onChange={handleChange}
            rows="5"
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>
        
        <div className="form-actions">
          <button 
            className="form-button" 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
        
        <p className="form-footer">
          By submitting this form, you agree to our <a href="#">Privacy Policy</a>.
        </p>
      </form>
    </div>
  );
};

export default EmailForm;