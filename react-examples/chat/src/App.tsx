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
  const [isCustomStyleEnabled, setIsCustomStyleEnabled] = useState(false);

  // Basic style sliders
  const [height, setHeight] = useState<number>(600);
  const [width, setWidth] = useState<number>(800);
  const [borderRadius, setBorderRadius] = useState<number>(8);
  const [spacing, setSpacing] = useState<number>(16);
  const [fontSize, setFontSize] = useState<number>(14);

  // Color states
  const [selectedColors, setSelectedColors] = useState<ColorState>({
    background: '#ffffff',
    containerBg: '#ffffff',
    userBubbleBg: '#007AFF',
    userBubbleText: '#ffffff',
    botBubbleBg: '#f0f0f0',
    botBubbleText: '#000000',
    inputBg: '#ffffff',
    inputText: '#000000',
    inputBorder: '#e0e0e0',
    buttonBg: '#007AFF',
    buttonText: '#ffffff'
  });

  const handleChatResponse = (response: any) => {
    console.log('Chat response:', response);
  };

  // Create our single style object for WaiiChat
  const computedChatStyles = isCustomStyleEnabled ? {
    container: {
      backgroundColor: selectedColors.containerBg,
      borderRadius: `${borderRadius}px`,
      padding: `${spacing}px`,
      height: `${height}px`,
      width: `${width}px`
    },
    messageList: {
      backgroundColor: selectedColors.containerBg,
      padding: `${spacing}px`
    },
    userMessage: {
      bubble: {
        backgroundColor: selectedColors.userBubbleBg,
        color: selectedColors.userBubbleText,
        padding: '12px 16px',
        fontSize: `${fontSize}px`,
      }
    },
    botMessage: {
      bubble: {
        backgroundColor: selectedColors.botBubbleBg,
        color: selectedColors.botBubbleText,
        padding: '12px 16px',
        fontSize: `${fontSize}px`,
      }
    },
    input: {
      container: {
        padding: `${spacing}px`,
        borderTop: `1px solid ${selectedColors.inputBorder}`
      },
      textArea: {
        backgroundColor: selectedColors.inputBg,
        color: selectedColors.inputText,
        borderRadius: `${borderRadius}px`,
        fontSize: `${fontSize}px`,
        border: `1px solid ${selectedColors.inputBorder}`
      },
      sendButton: {
        backgroundColor: selectedColors.buttonBg,
        color: selectedColors.buttonText
      }
    }
  } : {};

  const StyleControls = () => (
    <div>
      <Space align="center" style={{ marginBottom: '20px' }}>
        <h4 style={{ margin: 0 }}>Custom Styles</h4>
        <Switch
          checked={isCustomStyleEnabled}
          onChange={setIsCustomStyleEnabled}
        />
      </Space>
      
      {isCustomStyleEnabled && (
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
      )}
    </div>
  );

  const ColorControls = () => (
    isCustomStyleEnabled && (
      <div>
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
    )
  );

  return (
    <div style={{ padding: '20px', maxWidth: 1400, margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="WaiiChat Style Customization">
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <StyleControls />
            <ColorControls />
          </Space>
        </Card>

        <Card title="Preview">
          <div
            style={{
              border: isCustomStyleEnabled ? `1px solid ${selectedColors.inputBorder}` : '1px solid #e0e0e0',
              padding: '20px',
              borderRadius: isCustomStyleEnabled ? `${borderRadius}px` : '8px',
              backgroundColor: isCustomStyleEnabled ? selectedColors.background : '#ffffff'
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
        </Card>
      </Space>
    </div>
  );
};

export default WaiiChatShowcase;