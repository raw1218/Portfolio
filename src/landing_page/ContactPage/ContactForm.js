import React, { useState } from 'react'

function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        message: '',
    });

    async function sendEmail() {
        try {
            const response = await fetch('http://localhost:5000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log('Email sent successfully!', data);
            } else {
                console.error('Failed to send the email:', data);
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send a POST request to your backend or Formspree endpoint.
        fetch('https://formspree.io/f/xzblgyaq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="name-wrapper">
                <input
                    type="text"
                    name="firstName"
                    className="first-name-form"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="lastName"
                    className="last-name-form"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
            </div>

            <div className="personal-info-wrapper">
                <input
                    type="email"
                    name="email"
                    className="email-form"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <input
                    type="tel"
                    name="phoneNumber"
                    className="phone-number-form"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                />
            </div>

            <textarea
                className="message-form"
                name="message"
                placeholder="Your Message..."
                value={formData.message}
                onChange={handleInputChange}
            ></textarea>

            <button className='submit-button' type="submit">Submit</button>
        </form>
    )
}

export default ContactForm;
