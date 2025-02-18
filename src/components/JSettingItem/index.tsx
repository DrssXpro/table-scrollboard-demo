import { Typography } from "antd";

interface IJSettingItemProps {
  text?: string;
  gap?: number;
  children: React.ReactNode | React.ReactNode[];
}
const JSettingItem = (props: IJSettingItemProps) => {
  const { text, gap = 2, children } = props;
  return (
    <div className="w-full">
      {children}
      <div style={{ marginTop: `${gap}px` }}>
        {text && (
          <Typography.Text className="text-[13px]" type="secondary">
            {text}
          </Typography.Text>
        )}
      </div>
    </div>
  );
};

export default JSettingItem;
