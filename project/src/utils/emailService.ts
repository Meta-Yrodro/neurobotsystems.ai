import emailjs from '@emailjs/browser';

const EMAIL_SERVICE_ID = 'service_neurobot';
const EMAIL_TEMPLATE_ID = 'template_lead';
const EMAIL_USER_ID = 'YOUR_USER_ID'; // Replace with actual EmailJS user ID

interface LeadData {
  name: string;
  email: string;
  industry?: string;
  message?: string;
  services?: string[];
  formType: 'start' | 'contact' | 'level_up';
  level?: number;
  badge?: string;
}

export const sendLeadNotification = async (data: LeadData) => {
  const templateParams = {
    to_email: 'neurobotsystems.ai@gmail.com',
    subject: getLevelUpSubject(data),
    from_name: data.name,
    from_email: data.email,
    business_type: data.industry || 'Not provided',
    message: data.message || 'Not provided',
    services_selected: data.services?.join(', ') || 'None selected',
    submission_time: new Date().toLocaleString(),
    audit_link: data.formType === 'audit' ? `${window.location.origin}/audit/${data.auditId}` : undefined,
    level: data.level,
    badge: data.badge
  };

  try {
    await emailjs.send(
      EMAIL_SERVICE_ID,
      data.formType === 'level_up' ? 'template_level_up' : EMAIL_TEMPLATE_ID,
      templateParams,
      EMAIL_USER_ID
    );

    // Only send auto-reply for leads, not level ups
    if (data.formType !== 'level_up') {
      await sendAutoReply(data.email, data.name);
    }
  } catch (error) {
    console.error('Error sending email notification:', error);
    throw error;
  }
};

function getLevelUpSubject(data: LeadData): string {
  if (data.formType === 'level_up') {
    return `🎉 Congratulations! You've Reached Level ${data.level}`;
  } else if (data.formType === 'audit') {
    return `🔔 New Audit Saved by ${data.email}`;
  } else {
    return `🔔 New Lead Captured via ${data.formType === 'start' ? 'Start Page' : 'Contact Form'}`;
  }
}
const sendAutoReply = async (email: string, name: string) => {
  const autoReplyParams = {
    to_email: email,
    to_name: name,
    subject: '🚀 Thanks for reaching out to NeuroBotSystems.ai!',
    message: `Hi ${name},\n\nThanks for reaching out! We'll review your message and get back to you within 24 hours.\n\nBest regards,\nThe NeuroBotSystems.ai Team`
  };

  try {
    await emailjs.send(
      EMAIL_SERVICE_ID,
      'template_autoreply',
      autoReplyParams,
      EMAIL_USER_ID
    );
  } catch (error) {
    console.error('Error sending auto-reply:', error);
    // Don't throw error for auto-reply failure
  }
};