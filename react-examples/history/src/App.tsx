import React, { useState, useEffect } from 'react';
import { WaiiChatHistory } from '@waii-ai/widgets';
import { Layout, Card, Select, Switch, Slider, Radio, Space, Divider, Input, ColorPicker } from 'antd';
import { MessageOutlined, AppstoreOutlined, UnorderedListOutlined, BarsOutlined } from '@ant-design/icons';

const { Option } = Select;

const StyleShowcase = () => {
  // Core states
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [styleVariant, setStyleVariant] = useState('default');
  const [widthMode, setWidthMode] = useState('fixed');
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(600);
  const [borderRadius, setBorderRadius] = useState(8);
  const [spacing, setSpacing] = useState(16);
  const [fontSize, setFontSize] = useState(14);
  const [selectedColors, setSelectedColors] = useState({
    primary: '#1890ff',
    background: '#ffffff',
    text: '#000000',
    secondaryText: '#666666',
    border: '#f0f0f0',
    hover: '#f5f5f5',
    selected: '#e6f7ff'
  });

  // Extended style variants
  const styleVariants = {
    default: {
      container: {},
      summary: {},
      messageCount: {}
    },
    cards: {
      container: {
        margin: `${spacing/2}px 0`,
        padding: `${spacing}px`,
        borderRadius: `${borderRadius}px`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        backgroundColor: isDarkMode ? '#1f2937' : selectedColors.background,
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }
      },
      summary: {
        fontWeight: 500,
        fontSize: `${fontSize}px`
      },
      messageCount: {
        padding: '2px 8px',
        borderRadius: `${borderRadius/2}px`,
        backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
      }
    },
    minimal: {
      container: {
        borderLeft: `3px solid ${selectedColors.border}`,
        paddingLeft: `${spacing}px`,
        marginBottom: `${spacing/2}px`,
        transition: 'all 0.2s ease',
        '&:hover': {
          borderLeftColor: selectedColors.primary
        }
      },
      summary: {
        fontSize: `${fontSize}px`
      },
      messageCount: {
        fontSize: `${fontSize-2}px`
      }
    },
    bordered: {
      container: {
        border: `1px solid ${isDarkMode ? '#374151' : selectedColors.border}`,
        margin: `${spacing/2}px 0`,
        borderRadius: `${borderRadius}px`,
        padding: `${spacing}px`,
        transition: 'all 0.2s ease'
      },
      summary: {
        fontWeight: 500,
        fontSize: `${fontSize}px`
      },
      messageCount: {
        border: `1px solid ${isDarkMode ? '#374151' : selectedColors.border}`,
        padding: '2px 8px',
        borderRadius: `${borderRadius/2}px`
      }
    },
    modern: {
      container: {
        margin: `${spacing/2}px 0`,
        padding: `${spacing}px`,
        borderRadius: `${borderRadius}px`,
        background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
        boxShadow: '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff',
        transition: 'all 0.3s ease'
      },
      summary: {
        fontSize: `${fontSize}px`,
        fontWeight: 500
      },
      messageCount: {
        background: selectedColors.primary,
        color: '#fff',
        padding: '2px 8px',
        borderRadius: '20px'
      }
    },
    compact: {
      container: {
        padding: `${spacing/2}px`,
        borderBottom: `1px solid ${selectedColors.border}`,
        transition: 'background-color 0.2s ease',
        '&:hover': {
          backgroundColor: selectedColors.hover
        }
      },
      summary: {
        fontSize: `${fontSize-1}px`,
        lineHeight: 1.4
      },
      messageCount: {
        fontSize: `${fontSize-2}px`,
        opacity: 0.7
      }
    }
  };

  // Custom empty state with current theme colors
  const CustomEmptyState = () => (
    <div style={{ 
      textAlign: 'center', 
      padding: `${spacing*2}px ${spacing}px`,
      color: selectedColors.secondaryText
    }}>
      <MessageOutlined style={{ 
        fontSize: `${fontSize*2}px`, 
        marginBottom: `${spacing/2}px`,
        color: selectedColors.primary 
      }} />
      <div style={{ fontSize: `${fontSize+2}px`, fontWeight: 500 }}>
        No conversations yet
      </div>
      <div style={{ fontSize: `${fontSize-1}px`, marginTop: `${spacing/2}px` }}>
        Start chatting to see your history
      </div>
    </div>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <Card title="WaiiChatHistory Style Customization" style={{ marginBottom: '20px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Basic Settings */}
          <div>
            <h4>Basic Settings</h4>
            <Space wrap>
              <div>
                <div>Style Variant</div>
                <Select 
                  value={styleVariant} 
                  onChange={setStyleVariant}
                  style={{ width: 140 }}
                >
                  <Option value="default">Default</Option>
                  <Option value="cards">Cards</Option>
                  <Option value="minimal">Minimal</Option>
                  <Option value="bordered">Bordered</Option>
                  <Option value="modern">Modern</Option>
                  <Option value="compact">Compact</Option>
                </Select>
              </div>
            </Space>
          </div>

          {/* Size Controls */}
          <div>
            <h4>Size & Layout</h4>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Radio.Group value={widthMode} onChange={(e : any) => setWidthMode(e.target.value)}>
                <Radio.Button value="fixed">Fixed Width</Radio.Button>
                <Radio.Button value="fluid">Fluid Width</Radio.Button>
                <Radio.Button value="custom">Custom Width</Radio.Button>
              </Radio.Group>
              
              {widthMode === 'custom' && (
                <div>
                  <div>Width (px)</div>
                  <Slider
                    min={200}
                    max={800}
                    value={width}
                    onChange={setWidth}
                    style={{ width: 200 }}
                  />
                </div>
              )}
              
              <div>
                <div>Height (px)</div>
                <Slider
                  min={300}
                  max={800}
                  value={height}
                  onChange={setHeight}
                  style={{ width: 200 }}
                />
              </div>
            </Space>
          </div>

          {/* Style Controls */}
          <div>
            <h4>Style Details</h4>
            <Space wrap>
              <div>
                <div>Border Radius (px)</div>
                <Slider
                  min={0}
                  max={20}
                  value={borderRadius}
                  onChange={setBorderRadius}
                  style={{ width: 150 }}
                />
              </div>
              <div>
                <div>Spacing (px)</div>
                <Slider
                  min={8}
                  max={24}
                  value={spacing}
                  onChange={setSpacing}
                  style={{ width: 150 }}
                />
              </div>
              <div>
                <div>Font Size (px)</div>
                <Slider
                  min={12}
                  max={18}
                  value={fontSize}
                  onChange={setFontSize}
                  style={{ width: 150 }}
                />
              </div>
            </Space>
          </div>

          {/* Color Controls */}
          <div>
            <h4>Colors</h4>
            <Space wrap>
              {Object.entries(selectedColors).map(([key, value]) => (
                <div key={key}>
                  <div style={{ textTransform: 'capitalize' }}>{key}</div>
                  <ColorPicker
                    value={value}
                    onChange={(color: any) => setSelectedColors(prev => ({
                      ...prev,
                      [key]: color.toHexString()
                    }))}
                  />
                </div>
              ))}
            </Space>
          </div>
        </Space>
      </Card>

      {/* Preview */}
      <Card title="Preview">
        <div style={{ 
          border: `1px dashed ${selectedColors.border}`,
          padding: '20px',
          borderRadius: `${borderRadius}px`,
          width: widthMode === 'fluid' ? '100%' : widthMode === 'custom' ? `${width}px` : '300px'
        }}>
          <WaiiChatHistory
          apiUrl="<api url>"
          apiKey="<api key>"
          databaseKey="<db key>"
            style={{ 
              width: '100%',
              height: `${height}px`
            }}
            isDarkMode={isDarkMode}
            theme={{
              colors: selectedColors,
              spacing: {
                padding: `${spacing}px`,
                margin: `${spacing}px`,
                borderRadius: `${borderRadius}px`
              },
              typography: {
                titleSize: `${fontSize + 2}px`,
                textSize: `${fontSize}px`,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial'
              }
            }}
            historyListItemStyles={styleVariants[styleVariant as keyof typeof styleVariants]}
            emptyComponent={<CustomEmptyState />}
          />
        </div>
      </Card>

      {/* Documentation */}
      <Card title="Style Properties Reference" style={{ marginTop: '20px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <h4>Available Style Variants</h4>
            <ul>
              <li><strong>Default:</strong> Clean, minimal styling</li>
              <li><strong>Cards:</strong> Elevated, shadow-based design</li>
              <li><strong>Minimal:</strong> Slim, efficient layout</li>
              <li><strong>Bordered:</strong> Clear visual separation</li>
              <li><strong>Modern:</strong> Neumorphic design style</li>
              <li><strong>Compact:</strong> Space-efficient list view</li>
            </ul>
          </div>

          <div>
            <h4>Customizable Properties</h4>
            <ul>
              <li><strong>Dimensions:</strong> Width, height, responsiveness</li>
              <li><strong>Spacing:</strong> Padding, margins, gaps</li>
              <li><strong>Typography:</strong> Font sizes, weights, families</li>
              <li><strong>Colors:</strong> Theme colors, text colors, backgrounds</li>
              <li><strong>Borders:</strong> Radius, styles, colors</li>
              <li><strong>Shadows:</strong> Elevation, depth effects</li>
              <li><strong>States:</strong> Hover, selected, active states</li>
            </ul>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default StyleShowcase;