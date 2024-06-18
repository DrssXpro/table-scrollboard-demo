import {
  Button,
  ColorPicker,
  Input,
  InputNumber,
  Radio,
  Segmented,
  Select,
  Switch,
  Tabs,
  TabsProps,
  Tooltip,
} from "antd";
import { AlignType, AnimationType, ColumnType, ComponentConfigType, initColumn } from "./config";
import { MdAlignHorizontalLeft, MdAlignHorizontalRight, MdAlignHorizontalCenter } from "react-icons/md";
import { AiOutlineLine, AiOutlinePlus } from "react-icons/ai";
import JCollapseBox from "../JCollapseBox";
import JSettingBox from "../JSettingBox";
import JSettingItem from "../JSettingItem";
import { produce } from "immer";
import { useState } from "react";

interface ConfigComponentProps {
  config: ComponentConfigType;
  updateConfig: React.Dispatch<React.SetStateAction<ComponentConfigType>>;
  data: Record<string, string>[];
}

const animationOptions: { label: string; value: AnimationType }[] = [
  { label: "无", value: "none" },
  {
    label: "整行轮播",
    value: "row",
  },
  {
    label: "整页轮播",
    value: "page",
  },
];

const configOptions = [
  {
    label: "行设置",
    value: "row",
  },
  {
    label: "列设置",
    value: "column",
  },
];

const WeightOptions = [
  { label: "正常", value: "normal" },
  {
    label: "加粗",
    value: "bold",
  },
];

const SkewOptions = [
  { label: "正常", value: "normal" },
  {
    label: "斜体",
    value: "italic",
  },
];

const AlignOptions = [
  {
    value: "left",
    icon: <MdAlignHorizontalLeft />,
  },
  {
    value: "center",
    icon: <MdAlignHorizontalCenter />,
  },
  {
    value: "right",
    icon: <MdAlignHorizontalRight />,
  },
];

// 整体设置（动画、行配色）
const PublicConfigComponent = (props: ConfigComponentProps) => {
  const { config, updateConfig } = props;
  return (
    <>
      <JSettingBox name="动画">
        <div className="config-items-layout">
          <JSettingItem text="轮播方式">
            <Select
              className="w-full"
              options={animationOptions}
              value={config.publicConfig.animationStyle}
              onChange={(val) => {
                updateConfig(
                  produce((state) => {
                    state.publicConfig.animationStyle = val;
                  })
                );
              }}
            />
          </JSettingItem>
          <JSettingItem text="轮播时间(s)">
            <InputNumber
              className="w-full"
              placeholder="请输入"
              min={0}
              value={config.publicConfig.animationTime}
              onChange={(val) => {
                updateConfig(
                  produce((state) => {
                    state.publicConfig.animationTime = val!;
                  })
                );
              }}
            />
          </JSettingItem>
        </div>
      </JSettingBox>

      <JSettingBox name="控制">
        <JSettingItem text="鼠标悬停暂停">
          <Switch
            value={config.publicConfig.hoverStop}
            onChange={(val) => {
              updateConfig(
                produce((state) => {
                  state.publicConfig.hoverStop = val!;
                })
              );
            }}
          />
        </JSettingItem>
      </JSettingBox>
      <JSettingBox name="行配色">
        <div className="config-items-layout">
          <JSettingItem text="奇数行">
            <ColorPicker
              className="w-full"
              showText
              value={config.publicConfig.oddBg}
              onChange={(val) => {
                const color = val.toHexString();
                updateConfig(
                  produce((state) => {
                    state.publicConfig.oddBg = color;
                  })
                );
              }}
            />
          </JSettingItem>
          <JSettingItem text="偶数行">
            <ColorPicker
              className="w-full"
              showText
              value={config.publicConfig.evenBg}
              onChange={(val) => {
                const color = val.toHexString();
                updateConfig(
                  produce((state) => {
                    state.publicConfig.evenBg = color;
                  })
                );
              }}
            />
          </JSettingItem>
        </div>
        <div className="w-full h-2 mt-3 flex border-1 border-dark-200 border-solid">
          <div className="flex-1" style={{ background: config.publicConfig.oddBg }}></div>
          <div className="flex-1" style={{ background: config.publicConfig.evenBg }}></div>
        </div>
      </JSettingBox>
    </>
  );
};

// 行设置
const RowConifgComponent = (props: ConfigComponentProps) => {
  const { config, updateConfig } = props;
  return (
    <>
      <JCollapseBox name="基础" unfold>
        <JSettingBox name="样式">
          <div className="config-items-layout">
            <JSettingItem text="固定行高">
              <Switch
                value={config.rowConfig.body.isFixedHeight}
                onChange={(val) => {
                  updateConfig(
                    produce((state) => {
                      state.rowConfig.body.isFixedHeight = val;
                    })
                  );
                }}
              />
            </JSettingItem>
            <JSettingItem text="行高">
              <InputNumber
                className="w-full"
                placeholder="请输入"
                disabled={!config.rowConfig.body.isFixedHeight}
                value={config.rowConfig.body.rowHeight}
                onChange={(val) => {
                  updateConfig(
                    produce((state) => {
                      state.rowConfig.body.rowHeight = val!;
                    })
                  );
                }}
              />
            </JSettingItem>
            <JSettingItem text="行数">
              <InputNumber
                className="w-full"
                placeholder="请输入"
                disabled={config.rowConfig.body.isFixedHeight}
                value={config.rowConfig.body.rowCount}
                onChange={(val) => {
                  updateConfig(
                    produce((state) => {
                      state.rowConfig.body.rowCount = val!;
                    })
                  );
                }}
              />
            </JSettingItem>
          </div>
        </JSettingBox>
        <JSettingBox name="文字">
          <div className="config-items-layout">
            <JSettingItem text="字体大小">
              <InputNumber
                className="w-full"
                placeholder="请输入"
                min={5}
                value={config.rowConfig.body.fontStyle.size}
                onChange={(val) => {
                  updateConfig(
                    produce((state) => {
                      state.rowConfig.body.fontStyle.size = val!;
                    })
                  );
                }}
              />
            </JSettingItem>
            <JSettingItem text="字体颜色">
              <ColorPicker
                className="w-full"
                showText
                value={config.rowConfig.body.fontStyle.color}
                onChange={(val) => {
                  const color = val.toHexString();
                  updateConfig(
                    produce((state) => {
                      state.rowConfig.body.fontStyle.color = color;
                    })
                  );
                }}
              />
            </JSettingItem>
            <JSettingItem text="字体粗细">
              <Select
                className="w-full"
                placeholder="请输入"
                options={WeightOptions}
                value={config.rowConfig.body.fontStyle.weight}
                onChange={(val) => {
                  updateConfig(
                    produce((state) => {
                      state.rowConfig.body.fontStyle.weight = val;
                    })
                  );
                }}
              />
            </JSettingItem>
            <JSettingItem text="字体倾斜">
              <Select
                className="w-full"
                placeholder="请输入"
                options={SkewOptions}
                value={config.rowConfig.body.fontStyle.skew}
                onChange={(val) => {
                  updateConfig(
                    produce((state) => {
                      state.rowConfig.body.fontStyle.skew = val;
                    })
                  );
                }}
              />
            </JSettingItem>
          </div>
        </JSettingBox>
      </JCollapseBox>
      <JCollapseBox
        name="表头"
        unfold
        operator={
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            value={config.rowConfig.header.show}
            onChange={(val) => {
              updateConfig(
                produce((state) => {
                  state.rowConfig.header.show = val;
                })
              );
            }}
          />
        }
      >
        <JSettingBox name="样式">
          <div className="config-items-layout">
            <JSettingItem text="背景">
              <ColorPicker
                className="w-full"
                showText
                value={config.rowConfig.header.headerBg}
                onChange={(val) => {
                  const color = val.toHexString();
                  updateConfig(
                    produce((state) => {
                      state.rowConfig.header.headerBg = color;
                    })
                  );
                }}
              />
            </JSettingItem>
            <JSettingItem text="行高">
              <InputNumber
                className="w-full"
                placeholder="请输入"
                min={10}
                value={config.rowConfig.header.headerHeight}
                onChange={(val) => {
                  updateConfig(
                    produce((state) => {
                      state.rowConfig.header.headerHeight = val!;
                    })
                  );
                }}
              />
            </JSettingItem>
          </div>
        </JSettingBox>
        <JSettingBox name="文字">
          <div className="config-items-layout">
            <JSettingItem text="字体大小">
              <InputNumber
                className="w-full"
                placeholder="请输入"
                min={5}
                value={config.rowConfig.header.fontStyle.size}
                onChange={(val) => {
                  updateConfig(
                    produce((state) => {
                      state.rowConfig.header.fontStyle.size = val!;
                    })
                  );
                }}
              />
            </JSettingItem>
            <JSettingItem text="字体颜色">
              <ColorPicker
                className="w-full"
                showText
                value={config.rowConfig.header.fontStyle.color}
                onChange={(val) => {
                  const color = val.toHexString();
                  updateConfig(
                    produce((state) => {
                      state.rowConfig.header.fontStyle.color = color;
                    })
                  );
                }}
              />
            </JSettingItem>
            <JSettingItem text="字体粗细">
              <Select
                className="w-full"
                placeholder="请输入"
                options={WeightOptions}
                value={config.rowConfig.header.fontStyle.weight}
                onChange={(val) => {
                  updateConfig(
                    produce((state) => {
                      state.rowConfig.header.fontStyle.weight = val;
                    })
                  );
                }}
              />
            </JSettingItem>
            <JSettingItem text="字体倾斜">
              <Select
                className="w-full"
                placeholder="请输入"
                options={SkewOptions}
                value={config.rowConfig.header.fontStyle.skew}
                onChange={(val) => {
                  updateConfig(
                    produce((state) => {
                      state.rowConfig.header.fontStyle.skew = val;
                    })
                  );
                }}
              />
            </JSettingItem>
          </div>
        </JSettingBox>
      </JCollapseBox>
    </>
  );
};

// 列设置
const ColumnConfigComponent = (props: ConfigComponentProps) => {
  const { config, updateConfig } = props;
  const [currentColumn, setCurrentColumn] = useState("1");
  const columns = config.columnConfig.columns;

  const ColumnTabs: TabsProps["items"] = columns.map((col, index) => ({
    key: `${index + 1}`,
    label: `列-${index + 1}`,
    children: <SingleColumnConfig index={index} column={col} updateConfig={updateConfig} />,
  }));
  return (
    <>
      <JSettingBox name="列宽">
        <div className="mt-0.5">
          <Radio.Group
            value={config.columnConfig.fixedWidth}
            onChange={(e) => {
              updateConfig(
                produce((state) => {
                  state.columnConfig.fixedWidth = e.target.value;
                })
              );
            }}
          >
            <Radio value={false}>自适应列宽</Radio>
            <Radio value={true}>固定列宽</Radio>
          </Radio.Group>
        </div>
      </JSettingBox>
      <JSettingBox name="对齐方式">
        <Segmented<string>
          size="small"
          block
          options={AlignOptions}
          value={config.columnConfig.align}
          onChange={(value) => {
            updateConfig(
              produce((state) => {
                state.columnConfig.align = value as AlignType;
              })
            );
          }}
        />
      </JSettingBox>
      <JCollapseBox
        name="序号列"
        operator={
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            value={config.columnConfig.showIndex}
            onChange={(val) => {
              updateConfig(
                produce((state) => {
                  state.columnConfig.showIndex = val;
                })
              );
            }}
          />
        }
      >
        <JSettingBox name="基础">
          <div className="config-items-layout">
            <JSettingItem text="标题">
              <Input
                className="w-full"
                placeholder="请输入"
                value={config.columnConfig.indexColumn.title}
                onChange={(e) => {
                  updateConfig(
                    produce((state) => {
                      state.columnConfig.indexColumn.title = e.target.value;
                    })
                  );
                }}
              />
            </JSettingItem>
            <JSettingItem text="起始值">
              <InputNumber
                className="w-full"
                placeholder="请输入"
                value={config.columnConfig.indexColumn.startIndex}
                onChange={(val) => {
                  updateConfig(
                    produce((state) => {
                      state.columnConfig.indexColumn.startIndex = val!;
                    })
                  );
                }}
              />
            </JSettingItem>
            <JSettingItem text="列宽">
              <InputNumber
                className="w-full"
                placeholder="请输入"
                value={config.columnConfig.indexColumn.columnWidth}
                onChange={(val) => {
                  updateConfig(
                    produce((state) => {
                      state.columnConfig.indexColumn.columnWidth = val!;
                    })
                  );
                }}
              />
            </JSettingItem>
          </div>
        </JSettingBox>
      </JCollapseBox>
      <JCollapseBox
        name="内容列"
        operator={
          <div className="flex gap-1">
            <Tooltip title="添加列">
              <Button
                size="small"
                icon={<AiOutlinePlus />}
                onClick={() => {
                  updateConfig(
                    produce((state) => {
                      state.columnConfig.columns.push(initColumn("", ""));
                    })
                  );
                }}
              ></Button>
            </Tooltip>
            <Tooltip title="删除当前列">
              <Button
                size="small"
                icon={<AiOutlineLine />}
                onClick={() => {
                  updateConfig(
                    produce((state) => {
                      const index = parseInt(currentColumn) - 1;
                      state.columnConfig.columns.splice(index, 1);
                    })
                  );
                }}
              ></Button>
            </Tooltip>
          </div>
        }
      >
        <Tabs
          defaultActiveKey="1"
          items={ColumnTabs}
          onChange={(val) => {
            setCurrentColumn(val);
          }}
        />
      </JCollapseBox>
    </>
  );
};

// 单独内容列设置
const SingleColumnConfig = (props: {
  index: number;
  column: ColumnType;
  updateConfig: React.Dispatch<React.SetStateAction<ComponentConfigType>>;
}) => {
  const { column, index, updateConfig } = props;
  return (
    <>
      <JSettingBox name="整体">
        <div className="config-items-layout">
          <JSettingItem text="列名">
            <Input
              className="w-full"
              placeholder="请输入"
              value={column.title}
              onChange={(e) => {
                updateConfig(
                  produce((state) => {
                    state.columnConfig.columns[index].title = e.target.value;
                  })
                );
              }}
            />
          </JSettingItem>
          <JSettingItem text="列宽">
            <InputNumber
              className="w-full"
              placeholder="请输入"
              min={0}
              value={column.columnWidth}
              onChange={(val) => {
                updateConfig(
                  produce((state) => {
                    state.columnConfig.columns[index].columnWidth = val!;
                  })
                );
              }}
            />
          </JSettingItem>
        </div>
      </JSettingBox>
      <JSettingBox name="数据">
        <div className="config-items-layout">
          <JSettingItem text="映射字段">
            <Input
              className="w-full"
              placeholder="请输入"
              value={column.mapField}
              onChange={(e) => {
                updateConfig(
                  produce((state) => {
                    state.columnConfig.columns[index].mapField = e.target.value;
                  })
                );
              }}
            />
          </JSettingItem>
          <JSettingItem text="默认数据">
            <Input
              className="w-full"
              placeholder="请输入"
              value={column.defaultValue}
              onChange={(e) => {
                updateConfig(
                  produce((state) => {
                    state.columnConfig.columns[index].defaultValue = e.target.value;
                  })
                );
              }}
            />
          </JSettingItem>
        </div>
      </JSettingBox>
    </>
  );
};

const TableScrollBoradConfigComponent = (props: ConfigComponentProps) => {
  const [config, setConfig] = useState("row");
  return (
    <div className="w-full h-full">
      <PublicConfigComponent {...props} />
      <Segmented<string>
        block
        options={configOptions}
        value={config}
        onChange={(value) => {
          setConfig(value);
        }}
      />
      <div className="mt-4">
        {config === "row" ? <RowConifgComponent {...props} /> : <ColumnConfigComponent {...props} />}
      </div>
    </div>
  );
};

export default TableScrollBoradConfigComponent;
