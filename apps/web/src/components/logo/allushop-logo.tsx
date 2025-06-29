interface AlluShopLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
};

export function AlluShopLogo({ size = 'xl' }: AlluShopLogoProps) {
  const fontSize = sizeClasses[size] || sizeClasses.xl;

  return (
    <div className={`font-bold ${fontSize}`}>
      <span className="text-green-500">allu</span>
      <span>shop</span>
    </div>
  );
}
