import { nanoid } from 'nanoid';
import { supabase } from './supabase';

interface CertificateData {
  userEmail: string;
  userName: string;
  achievementName: string;
  earnedDate: Date;
}

export const generateCertificate = async (data: CertificateData) => {
  try {
    const certificateId = nanoid();
    
    // Create certificate template data
    const templateData = {
      id: certificateId,
      name: data.userName,
      achievement: data.achievementName,
      date: data.earnedDate.toLocaleDateString(),
      style: {
        background: 'linear-gradient(135deg, #2D3748 0%, #1A202C 100%)',
        border: '2px solid #9F7AEA',
        logo: 'https://assets.neurobotsystems.ai/logo.png'
      }
    };

    // Save to database
    const { error } = await supabase
      .from('printable_certificates')
      .insert([{
        user_email: data.userEmail,
        certificate_type: 'achievement',
        achievement_name: data.achievementName,
        earned_date: data.earnedDate.toISOString(),
        template_data: templateData,
        pdf_url: `https://certificates.neurobotsystems.ai/${certificateId}.pdf`
      }]);

    if (error) throw error;

    return certificateId;
  } catch (error) {
    console.error('Error generating certificate:', error);
    throw error;
  }
};