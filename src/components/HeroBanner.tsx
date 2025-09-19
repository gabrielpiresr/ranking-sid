import heroImage from '@/assets/trading-hero.jpg';

interface HeroBannerProps {
  title: string;
  description: string;
}

export const HeroBanner = ({ title, description }: HeroBannerProps) => {
  return (
    <div className="relative w-full h-48 md:h-64 lg:h-80 overflow-hidden rounded-lg bg-gradient-hero">
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent z-10" />
      
      <img
        src={heroImage}
        alt="Trading Platform"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      
      <div className="relative z-20 h-full flex flex-col justify-center px-4 md:px-8">
        <div className="max-w-2xl">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 md:mb-4">
            {title}
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-lg">
            {description}
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary" />
    </div>
  );
};