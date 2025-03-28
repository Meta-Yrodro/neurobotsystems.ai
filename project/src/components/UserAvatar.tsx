import React from 'react';
import { motion } from 'framer-motion';

interface UserAvatarProps {
  email: string;
  name?: string;
  avatarUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  isTopThree?: boolean;
}

export default function UserAvatar({ email, name, avatarUrl, size = 'md', isTopThree }: UserAvatarProps) {
  const getInitials = () => {
    if (name) {
      const parts = name.split(' ');
      if (parts.length > 1) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    }
    return email.slice(0, 2).toUpperCase();
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative ${sizeClasses[size]} rounded-full overflow-hidden`}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name || email}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className={`
          w-full h-full bg-purple-500/20 
          flex items-center justify-center font-bold
          ${isTopThree ? 'animate-glow' : ''}
        `}>
          {getInitials()}
        </div>
      )}
      
      {isTopThree && (
        <div className="absolute inset-0 border-2 border-yellow-500 rounded-full animate-pulse" />
      )}
    </motion.div>
  );
}