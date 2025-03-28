export interface AuditEmailData {
  firstName: string;
  industry: string;
  mainIssue: string;
  selectedServices: string[];
}

export const generateAuditEmail = (data: AuditEmailData): string => {
  const {
    firstName,
    industry,
    mainIssue,
    selectedServices
  } = data;

  return `Subject: ✅ Your Free Automation Audit — Delivered by NeuroBotSystems.ai

Hi ${firstName},

Thanks for requesting a free automation audit! 🎯
We reviewed the information you shared, and here's what we found:

🔍 Quick Overview:
Industry: ${industry}
Main bottleneck: ${mainIssue}
Requested services: ${selectedServices.join(', ')}

⚙️ Opportunities for Automation:
${selectedServices.includes('CRM Integration') ? '✅ CRM: You\'re missing automation in lead scoring and contact management\n' : ''}${selectedServices.includes('Chatbots / Customer Support') ? '✅ Customer Support: AI chatbot can handle 70% of common inquiries\n' : ''}${selectedServices.includes('Appointment Automation') ? '✅ Appointments: We can fully automate scheduling with smart logic\n' : ''}${selectedServices.includes('Lead Generation') ? '✅ Lead Gen: You\'re losing leads at the qualification step — we\'ll fix that\n' : ''}

📦 Next Steps:
If this sounds like what you need, reply to this email or schedule a strategy call below 👇
👉 https://calendly.com/neurobotsystems

Looking forward to helping you build your AI-powered backend,
Paul & the NeuroBotSystems.ai Team
📧 neurobotsystems.ai@gmail.com`;
};