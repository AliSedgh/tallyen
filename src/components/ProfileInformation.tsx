import { Link, useLocation } from "react-router-dom";
import formatNumberWithCommas from "@/lib/formatPriceWithCommas";
import { useMemo } from "react";
import { useUserAccountContext } from "@/hooks/useUserAccountContext";

const ProfileInformation = () => {
  const { gold, totalPrice, unitGoldPrice } = useUserAccountContext();
  const pathname = useLocation().pathname;

  const papers = useMemo(
    () => [
      {
        icon: "/images/money.png",
        title: "موجودی",
        value: `${formatNumberWithCommas(+totalPrice)} ریال`,
      },
      {
        icon: "/images/gold.png",
        title: "طلای شما",
        value: `${Number(gold).toFixed(3).toString()} گرم`,
      },
      {
        icon: "/images/unit.png",
        title: "قیمت واحد",
        value: `${formatNumberWithCommas(+unitGoldPrice)} ریال`,
      },
    ],
    [gold, totalPrice, unitGoldPrice]
  );

  return (
    <div className="flex flex-col md:flex-row items-center mb-3 justify-between w-full gap-2">
      <div className="flex gap-2 w-full md:w-fit flex-col md:flex-row">
        {papers.map((paper, index) => (
          <Paper key={index} {...paper} />
        ))}
      </div>
      {pathname === "/" && (
        <Link
          className="bg-violet-500 w-full text-center md:w-fit font-semibold px-14 py-2 rounded-md text-white"
          to="/buy"
        >
          خرید جدید
        </Link>
      )}
    </div>
  );
};

type PaperProps = {
  icon: string;
  title: string;
  value: string;
};

const Paper = ({ icon, title, value }: PaperProps) => (
  <div className="shadow-md w-full px-3 py-2 items-center rounded-md flex gap-3">
    <div className="flex items-center">
      <img src={icon} alt={title} />
    </div>
    <div className="flex items-center justify-center flex-col gap-2">
      <span className="font-semibold text-green-400">{title}</span>
      <span className="font-semibold text-center">{value}</span>
    </div>
  </div>
);

export default ProfileInformation;
