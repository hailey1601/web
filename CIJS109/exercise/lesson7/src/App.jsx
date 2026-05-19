import React from "react";
import { Form, Input, Button, Select, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const { Option } = Select;

const App = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success: ", values);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-[400px]">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Let's get you started
        </h1>

        {/* Full name */}
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          scrollToFirstError
          className="w-full"
          size="large"
        >
          <Form.Item
            name="fullname"
            label={<span className="font-medium text-gray-700">Full name</span>}
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
            className="mb-4"
          >
            <Input placeholder="Ade Tiger" className="rounded-md" />
          </Form.Item>

          {/* Email address */}
          <Form.Item
            name="email"
            label={
              <span className="font-medium text-gray-700">Email address</span>
            }
            rules={[
              { type: "email", message: "The input is not valid E-mail!" },
              { required: true, message: "Please input your E-mail!" },
            ]}
            className="mb-4"
          >
            <Input
              placeholder="yourname@gmail.com"
              className="rounded-md"
              autoComplete="email"
            />
          </Form.Item>

          {/* Phone number */}
          <Form.Item
            label={
              <span className="font-medium text-gray-700">Phone number</span>
            }
            className="mb-4"
            required
          >
            <Space.Compact style={{ width: "100%" }}>
              <Form.Item name="prefix" noStyle initialValue="234">
                <Select
                  style={{ width: 100 }}
                  variant="borderless"
                  className="border border-r-0 border-gray-300 rounded-l-md bg-white z-10"
                >
                  <Option value="234">🇳🇬 +234</Option>
                  <Option value="84">🇻🇳 +84</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="phone"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  placeholder="800 2738 9700"
                  className="rounded-r-md border-l-0"
                  style={{ width: "100%" }}
                  autoComplete="tel"
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>

          {/* 4. Password */}
          {/* 4. Password */}
          <Form.Item
            name="password"
            label={
              <span className="font-medium text-gray-700">Create password</span>
            }
            rules={[{ required: true, message: "Please input your password!" }]}
            className="mb-1"
          >
            <Input.Password
              placeholder="● ● ● ● ● ● ● ●"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              className="rounded-md"
              autoComplete="new-password"
            />
          </Form.Item>
          {/* Password Helper Text */}
          <div className="text-xs text-gray-400 mb-4 pl-1">
            <p>Password must contain a minimum of 8 characters</p>
            <p>Password must contain at least one symbol e.g. @, !</p>
          </div>

          {/* 5. Location (Optional) */}
          <Form.Item
            name="location"
            label={
              <span className="font-medium text-gray-700">
                Location{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
              </span>
            }
            className="mb-8"
          >
            <Select placeholder="Select Location" className="rounded-md h-10">
              <Option value="lagos">Lagos</Option>
              <Option value="hanoi">Hanoi</Option>
              <Option value="hcm">Ho Chi Minh City</Option>
            </Select>
          </Form.Item>

          {/* 6. Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-[#2C3E50] hover:!bg-[#34495e] border-none h-12 text-lg font-semibold rounded-lg shadow-md"
            >
              Sign Up
            </Button>
          </Form.Item>

          {/* Footer Link */}
          <div className="text-center text-gray-500 mt-4">
            Already a user?{" "}
            <a
              href="/login"
              className="text-[#2C3E50] font-bold hover:underline"
            >
              Login
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default App;
