import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";

const MainActivity = () => {
  return (
    <div className="flex justify-center flex-col border-b p-1.5 border-b-primary-content mb-4 pt-15 w-full">
      <h2 className="text-4xl text-primary-content font-bold mb-5 text-wrap">
        Deswidut bawu, can mandi
      </h2>
      <div className="your-task flex justify-between">
        <h3 className="text-xl">Here are your task!</h3>
        <button className="btn">
          <PiDotsThreeOutlineVerticalBold></PiDotsThreeOutlineVerticalBold>
        </button>
      </div>
    </div>
  );
};

export default MainActivity;
