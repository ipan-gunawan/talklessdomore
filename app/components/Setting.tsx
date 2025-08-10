import { MdOutlineSettingsSuggest } from "react-icons/md";

const Setting = () => {
  return (
    <div>
      <button className="btn w-fit">
        {" "}
        <MdOutlineSettingsSuggest className="text-xl"></MdOutlineSettingsSuggest>{" "}
        Setting
      </button>
    </div>
  );
};

export default Setting;
