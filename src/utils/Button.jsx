const Button = ({ onClick, children }) => {
  return (
    <button
      className="bg-black text-white rounded-lg text-xs py-1 px-3 cursor-pointer w-max self-end hover:bg-gray-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
