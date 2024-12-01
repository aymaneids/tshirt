import React from 'react';
import { Heart } from 'lucide-react';
import { useLikes } from '../context/LikesContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LikeButtonProps {
  productId: string;
  className?: string;
}

export function LikeButton({ productId, className = '' }: LikeButtonProps) {
  const { isLiked, toggleLike } = useLikes();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate('/auth');
      return;
    }

    await toggleLike(productId);
  };

  const liked = isLiked(productId);

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-colors ${
        liked
          ? 'bg-red-50 text-red-500 hover:bg-red-100'
          : 'bg-white/80 text-neutral-500 hover:bg-white'
      } ${className}`}
    >
      <Heart
        className={`w-5 h-5 ${liked ? 'fill-current' : ''}`}
      />
    </button>
  );
}