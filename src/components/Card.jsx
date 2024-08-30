import Button from "../utils/Button";

const Card = ({ name, img, price, symbol, handleInfoClick }) => {
  return (
    <div className="flex bg-white w-80 h-28 gap-4 p-5">
      <img src={img} alt={name} width={64} height={72} />
      <div className="flex flex-col flex-grow">
        <h4 className="font-bold">{name}</h4>
        <p>
          ${price.toFixed(2)} {symbol}
        </p>
        <Button onClick={handleInfoClick} />
      </div>
    </div>
  );
};

export default Card;
