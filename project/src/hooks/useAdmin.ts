import { useEffect, useState } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const user = useUser();
  const supabase = useSupabaseClient();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      // Check if user email is admin
      if (user.email === 'neurobotsystems.ai@gmail.com') {
        setIsAdmin(true);
        return;
      }

      // Additional check in database if needed
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_email', user.email)
        .single();

      if (!error && data?.role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user, supabase]);

  return { isAdmin };
};