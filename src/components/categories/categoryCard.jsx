import { Folder, FileText, MessageSquareText } from 'lucide-react';

const CategoryCard = ({ imageUrl, title, description, blogsCount, queriesCount }) => {
  return (
    <div className="group relative max-w-sm bg-[var(--color-light)] rounded-xl  p-4 transition-all duration-300 cursor-pointer mx-auto">
      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/40 to-transparent" />
        
        <div className="absolute top-3 right-3 p-2 bg-[var(--color-light)] rounded-lg shadow-sm">
          <Folder className="w-5 h-5 text-[var(--color-primary)]" />
        </div>
      </div>

      <div className="space-y-4">

        <div>
          <h3 className="text-xl font-bold text-[var(--color-primary)] mb-1">{title}</h3>
          <p className="text-sm text-[var(--color-secondary)] line-clamp-2">{description}</p>
        </div>

        {/* Stats Container */}
        <div className="flex gap-3">
          <div className="flex items-center bg-[var(--color-primary-lightest)] px-3 py-1.5 rounded-full">
            <FileText className="w-4 h-4 mr-2 text-[var(--color-primary)]" />
            <span className="text-sm font-medium text-[var(--color-primary)]">{blogsCount} Blogs</span>
          </div>
          <div className="flex items-center bg-[var(--color-primary-lightest)] px-3 py-1.5 rounded-full">
            <MessageSquareText className="w-4 h-4 mr-2 text-[var(--color-primary)]" />
            <span className="text-sm font-medium text-[var(--color-primary)]">{queriesCount} Queries</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="pt-2">
          <div className="h-2 bg-[var(--color-primary-lightest)] rounded-full">
            <div 
              className="h-full bg-[var(--color-primary-light)] rounded-full transition-all duration-500" 
              style={{ width: `${Math.min((blogsCount / 50) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="text-xs text-[var(--color-secondary-lightest)] mt-1">
            Category Activity: {Math.min(blogsCount, 50)}/50 blogs
          </div>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-[var(--color-primary-light)] opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
    </div>
  );
};

export default CategoryCard;