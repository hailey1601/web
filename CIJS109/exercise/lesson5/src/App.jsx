import { Form, Input, Checkbox, Switch, Radio, Select, Button } from "antd";
import { InputLabel } from "./components/InpuLabel.jsx";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useState } from "react";

const App = () => {
  const [switchValue, setSwitchValue] = useState(false);
  const [radioValue, setRadioValue] = useState(1);

  const handleSubmit = (values) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
  };

  return (
    <div className="p-4 flex flex-col gap-4 bg-gray-200 h-screen items-center">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-lg font text-center"> Form Demo </h1>
        <Form
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label={<InputLabel label="Username" required />}
            name="username"
          >
            <Input
              size="large"
              style={{ borderRadius: "5px", padding: "10px" }}
            />
          </Form.Item>

          <Form.Item
            label={<InputLabel label="Password" />}
            name="password"
            help={
              <InputLabel
                label="Password must be between 4 and 12 characters"
                customClassName="italic"
              />
            }
          >
            <Input.Password
              size="large"
              style={{ borderRadius: "5px", padding: "10px" }}
            />
          </Form.Item>

          <Form.Item
            label={<InputLabel label="Input Text Label" />}
            name="errorInput"
            validateStatus="error"
            help={
              <InputLabel
                label="Error message informing me of a problem"
                customClassName="text-red-500 italic"
              />
            }
          >
            <Input
              size="large"
              style={{ borderRadius: "5px", padding: "10px" }}
              suffix={<ExclamationCircleFilled />}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item name="switch">
            <div className="flex items-center gap-3">
              <Switch onChange={setSwitchValue} checked={switchValue} />
              <span className="text-gray-700">
                {switchValue ? "On" : "Off"}
              </span>
            </div>
          </Form.Item>

          <Form.Item name="radio">
            <Radio.Group
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
              onChange={(e) => setRadioValue(e.target.value)}
            >
              <Radio value={1}>Radio selection 1</Radio>
              <Radio value={2}>Radio selection 2</Radio>
              <Radio value={3}>Radio selection 3</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="dropdown"
            label={<InputLabel label="Dropdown Title" />}
          >
            <Select
              size="large"
              style={{ borderRadius: "5px" }}
              placeholder="Select an option"
              optionRender={(option) => (
                <div className="py-2 px-3 hover:bg-indigo-50 rounded-md transition-colors">
                  <span className="text-gray-700 font-medium">
                    {option.label}
                  </span>
                </div>
              )}
              options={[
                { label: "Dropdown option", value: "Dropdown option" },
                { label: "Dropdown option 1", value: "Dropdown option 1" },
                { label: "Dropdown option 2", value: "Dropdown option 2" },
              ]}
            />
          </Form.Item>

          <Form.Item className="mb-0 pt-6">
            <div className="flex gap-4 justify-between">
              <Button
                color="primary"
                variant="outlined"
                size="large"
                onClick={() => {
                  console.log("Cancel");
                }}
              >
                Cancel
              </Button>
              <Button color="primary" size="large" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default App;
