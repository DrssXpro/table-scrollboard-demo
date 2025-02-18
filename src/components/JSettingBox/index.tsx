import { Typography } from "antd";

interface IJSettingBoxProps {
  name: string;
  children: React.ReactNode | React.ReactNode[];
}

const JSettingBox = (props: IJSettingBoxProps) => {
  const { name, children } = props;
  return (
    <div className="w-full flex mb-4 gap-4 px-2">
      <div className="w-12 my-0.5">
        <Typography.Text className="text-[12px]">{name}</Typography.Text>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default JSettingBox;
