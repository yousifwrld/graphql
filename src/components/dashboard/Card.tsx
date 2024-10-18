// Props for the card component
interface CardProps {
  title: string;
  content: JSX.Element;
  icon?: JSX.Element;
}

function Card({ title, content, icon }: CardProps) {
  return (
    <div className="bg-[#1c2533] rounded-md p-4 m-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
      <div className="flex items-center">
        <p className="flex-shrink-0 text-[#ff6601] text-xl">{icon}</p>
        <div className="ml-3">
          <p className="text-xl font-bold text-white">{title}</p>
        </div>
      </div>
      <hr className="my-2 border-white" />
      {content}
    </div>
  );
}

export default Card;
