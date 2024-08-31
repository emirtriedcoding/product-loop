import React from 'react';

const TOSPage = () => {
  return (
    <div className='space-y-3' style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 className='font-bold text-lg' >Terms of Service</h1>
      
      <p className='text-sm' >Welcome to Product Loop. By accessing and using this website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using the website.</p>
      
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using this website, you accept and agree to be bound by these terms of service. If you do not agree with any part of these terms, you must not use this website.</p>
      
      <h2>2. Changes to Terms</h2>
      <p>We reserve the right to modify these terms of service at any time. Any changes will be posted on this page, and your continued use of the website after any such changes constitutes your acceptance of the new terms.</p>
      
      <h2>3. User Accounts</h2>
      <p>To access certain features of our website, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
      
      <h2>4. Intellectual Property Rights</h2>
      <p>All content, trademarks, and intellectual property rights related to this website are the property of Product Loop or its content suppliers. Unauthorized use of any materials on this site may violate copyright, trademark, and other laws.</p>
      
      <h2>5. Limitation of Liability</h2>
      <p>Product Loop shall not be liable for any direct, indirect, incidental, special, or consequential damages that result from the use of, or inability to use, this website, even if we have been advised of the possibility of such damages.</p>
      
      <h2>6. Governing Law</h2>
      <p>These terms of service are governed by and construed in accordance with the laws of [Your Country], and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
      
      <h2>7. Contact Us</h2>
      <p>If you have any questions about these Terms of Service, please contact us at [Your Email Address].</p>
      
      <p>Last updated: {new Date().getFullYear()} </p>
    </div>
  );
};

export default TOSPage;
