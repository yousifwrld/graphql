// Props for the card component
interface CardProps {
  title: string;
  content: JSX.Element;
  icon?: JSX.Element;
}

function Card({ title, content, icon }: CardProps) {
  return (
    <div className="bg-gray-800 rounded-md p-4 m-2">
      <div className="flex items-center">
        <div className="flex-shrink-1 text-[#5ed9d1] ">{icon}</div>
        <div className="ml-3">
          <p className="text-lg font-bold text-white">{title}</p>
        </div>
      </div>
      {content}
    </div>
  );
}

export default Card;
