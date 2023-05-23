import React from 'react';
import './about.css';

function About(props: any) {
    return (
        <div>
            <div className="about-header">
                <h1>About</h1>
            </div>

            <div className="about">
                <p>Welcome to my fullstack exam project!</p>
                <p>On my home page, you'll find a comprehensive list of events.</p>
                <p>To create your own events and book others, please create an account.</p>
                <p>Join us and dive into a world of exciting experiences.</p>
            </div>

        </div>
);
}

export default About;