import React from 'react';

const PrivacyPage = () => {
  return (
    <div  className='space-y-3' style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 className='text-lg font-bold text-center' >Privacy Policy</h1>
      
      <p>Your privacy is important to us. This Privacy Policy explains how Product Loop collects, uses, and safeguards your personal information when you use our website.</p>
      
      <h2>1. Information We Collect</h2>
      <p>We collect information that you provide directly to us when you create an account, submit content, or communicate with us. This may include your name, email address, and any other information you choose to provide.</p>
      
      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect for the following purposes:</p>
      <ul>
        <li>To operate, maintain, and improve our website</li>
        <li>To personalize your experience on our website</li>
        <li>To understand and analyze how you use our website</li>
        <li>To communicate with you, including for customer service, updates, and promotional purposes</li>
        <li>To enforce our terms of service and policies</li>
        <li>To protect against fraudulent, unauthorized, or illegal activities</li>
      </ul>
      
      <h2>3. Sharing Your Information</h2>
      <p>We do not share your personal information with third parties except in the following cases:</p>
      <ul>
        <li>With your consent</li>
        <li>To comply with legal obligations</li>
        <li>To protect and defend our rights and property</li>
        <li>In connection with a merger, sale, or acquisition of all or part of our business</li>
      </ul>
      
      <h2>4. Cookies and Tracking Technologies</h2>
      <p>We use cookies and similar tracking technologies to enhance your experience on our website. You can manage your cookie preferences through your browser settings.</p>
      
      <h2>5. Data Security</h2>
      <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is completely secure.</p>
      
      <h2>6. Your Rights</h2>
      <p>You have the right to access, update, or delete your personal information. You can do this by contacting us at [Your Email Address].</p>
      
      <h2>7. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and your continued use of the website after such changes signifies your acceptance of the new terms.</p>
      
      <h2>8. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at [Your Email Address].</p>
      
      <p>Last updated: {new Date().getFullYear()} </p>
    </div>
  );
};

export default PrivacyPage;
