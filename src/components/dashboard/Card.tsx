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
        <p className="flex-shrink-0 text-[#5ed9d1] text-xl">{icon}</p>
        <div className="ml-3">
          <p className="text-xl font-bold text-white">{title}</p>
        </div>
      </div>
      <hr className="my-2 border-gray-600" />
      {content}
    </div>
  );
}

export default Card;
