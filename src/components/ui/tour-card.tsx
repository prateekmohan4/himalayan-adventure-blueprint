import { Badge } from "@/components/ui/badge";

interface TourCardProps {
  image: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
}

export const TourCard = ({ image, title, description, duration, difficulty }: TourCardProps) => {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevation-2 transition-all duration-300 hover:-translate-y-2">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-display font-semibold text-foreground mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground font-body mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-primary-muted text-primary font-body font-medium">
            {duration}
          </Badge>
          <Badge variant="outline" className="border-muted text-muted-foreground font-body font-medium">
            {difficulty}
          </Badge>
        </div>
      </div>
    </div>
  );
};