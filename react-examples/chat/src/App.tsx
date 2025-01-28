import React, { useState, useRef, FC } from 'react';
import { WaiiChat } from '@waii-ai/widgets';
import { Card, Slider, Space, ColorPicker, Switch } from 'antd';
import '../../../config.js';

// @ts-ignore
const { configs } = window;

interface ColorState {
  background: string;
  containerBg: string;
  userBubbleBg: string;
  userBubbleText: string;
  botBubbleBg: string;
  botBubbleText: string;
  inputBg: string;
  inputText: string;
  inputBorder: string;
  buttonBg: string;
  buttonText: string;
}

const WaiiChatShowcase: FC = () => {
  const chatRef = useRef(null);

  // Basic style sliders
  const [height, setHeight] = useState<number>(500);
  const [width, setWidth] = useState<number>(600);
  const [borderRadius, setBorderRadius] = useState<number>(6);
  const [spacing, setSpacing] = useState<number>(10);
  const [fontSize, setFontSize] = useState<number>(14);

  // Color states
  const [selectedColors, setSelectedColors] = useState<ColorState>({
    background: '#ffffff',
    containerBg: '#ffffff',
    userBubbleBg: '#49A7FB',
    userBubbleText: '#ffffff',
    botBubbleBg: '#f0f0f0',
    botBubbleText: '#000000',
    inputBg: '#ffffff',
    inputText: '#000000',
    inputBorder: '#d9d9d9',
    buttonBg: '#1890ff',
    buttonText: '#ffffff'
  });

  const handleChatResponse = (response: any) => {
    console.log('Chat response:', response);
  };

  // Create our single style object for WaiiChat
  const computedChatStyles = {
    container: {
      backgroundColor: selectedColors.containerBg,
      borderRadius: `${borderRadius}px`,
      height: `${height}px`,
      width: `${width}px`
    },
    messageList: {
      backgroundColor: selectedColors.containerBg,
      padding: `${spacing}px`,
    },
    userMessage: {
      bubble: {
        backgroundColor: selectedColors.userBubbleBg,
        color: selectedColors.userBubbleText,
        fontSize: `${fontSize}px`,
      }
    },
    botMessage: {
      bubble: {
        backgroundColor: selectedColors.botBubbleBg,
        color: selectedColors.botBubbleText,
        fontSize: `${fontSize}px`,
      }
    },
    input: {
      container: {
        padding: `${spacing}px`,
      },
      textArea: {
        backgroundColor: selectedColors.inputBg,
        color: selectedColors.inputText,
        borderRadius: `${borderRadius}px`,
        fontSize: `${fontSize}px`,
      },
      sendButton: {
        backgroundColor: selectedColors.buttonBg,
        color: selectedColors.buttonText
      }
    }
  };

  const StyleControls = () => (
    <div>
      <>
        <h4>Style Controls</h4>
        <Space wrap>
          <div>
            <div>Height (px)</div>
            <Slider
              min={300}
              max={900}
              value={height}
              onChange={setHeight}
              style={{ width: 150 }}
            />
          </div>
          <div>
            <div>Width (px)</div>
            <Slider
              min={300}
              max={1200}
              value={width}
              onChange={setWidth}
              style={{ width: 150 }}
            />
          </div>
          <div>
            <div>Border Radius (px)</div>
            <Slider
              min={0}
              max={24}
              value={borderRadius}
              onChange={setBorderRadius}
              style={{ width: 150 }}
            />
          </div>
          <div>
            <div>Chat Padding (px)</div>
            <Slider
              min={0}
              max={32}
              value={spacing}
              onChange={setSpacing}
              style={{ width: 150 }}
            />
          </div>
          <div>
            <div>Font Size (px)</div>
            <Slider
              min={12}
              max={20}
              value={fontSize}
              onChange={setFontSize}
              style={{ width: 150 }}
            />
          </div>
        </Space>
      </>
    </div>
  );

  const ColorControls = () => (
    <div style={{ maxWidth: '800px' }}>
      <h4>Color Controls</h4>
      <Space wrap>
        {Object.entries(selectedColors).map(([key, value]) => (
          <div key={key} style={{ marginBottom: '10px' }}>
            <div style={{ textTransform: 'capitalize' }}>
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
            <ColorPicker
              value={value}
              onChange={(color) =>
                setSelectedColors((prev) => ({
                  ...prev,
                  [key]: color.toHexString()
                }))
              }
            />
          </div>
        ))}
      </Space>
    </div>
  );

  return (
    <div style={{ padding: '10px', maxWidth: '1200px', margin: '0 auto' }}>
      <Space direction="vertical" size="small">
        <Card title="Chat Widget Customization Example">
          <Space direction="vertical" size="small">
            <StyleControls />
            <ColorControls />
            <h4>Preview</h4>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              border: '1px solid #e0e0e0',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: '#f5f5f5'
            }}>
              <div
                style={{
                  border: `1px solid ${selectedColors.inputBorder}`,
                  padding: '20px',
                  borderRadius: `${borderRadius}px`,
                  backgroundColor: selectedColors.background
                }}
              >
                <WaiiChat
                  ref={chatRef}
                  apiUrl={configs.apiUrl}
                  apiKey={configs.apiKey}
                  databaseKey={configs.databaseKey}
                  chatStyles={computedChatStyles}
                  handleChatResponse={handleChatResponse}
                />
              </div>
            </div>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default WaiiChatShowcase;