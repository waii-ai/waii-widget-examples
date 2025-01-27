import React, { useState } from 'react';
import { WaiiChatHistory, WaiiChatHistoryProps, WaiiHistoryListItemStyles } from '@waii-ai/widgets';
import { Card, Select, Switch, Slider, Space } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import '../../../config.js';
import { WaiiHistoryTheme } from '@waii-ai/widgets/dist/types/components/ChatHistory/types.js';

// @ts-ignore
const { configs } = window;
const { Option } = Select;

const StyleShowcase = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [styleVariant, setStyleVariant] = useState('default');
  const [height, setHeight] = useState(600);
  const [borderRadius, setBorderRadius] = useState(8);
  const [spacing, setSpacing] = useState(16);
  const [fontSize, setFontSize] = useState(14);
  const [iconSize, setIconSize] = useState(14);
  const [summaryLines, setSummaryLines] = useState(2);
  
  const [selectedColors, setSelectedColors] = useState<WaiiHistoryTheme['colors']>({
    primary: '#1890ff',
    background: '#ffffff',
    text: '#000000',
    secondaryText: '#666666',
    border: '#f0f0f0',
    hover: '#f5f5f5',
    selected: '#e6f7ff'
  });

  const styleVariants: Record<string, WaiiHistoryListItemStyles> = {
    default: {
      container: {},
      summary: {},
      messageCount: {},
      contentRow: {},
      metadataRow: {},
      title: {},
      searchInput: {},
      loadMoreButton: {},
      countDisplay: {}
    },
    modern: {
      container: {
        margin: `${spacing/2}px 0`,
        padding: `${spacing}px`,
        borderRadius: `${borderRadius}px`,
        backgroundColor: isDarkMode ? '#1f1f1f' : '#ffffff',
        boxShadow: isDarkMode ? 
          '0 4px 6px rgba(0, 0, 0, 0.3)' : 
          '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        border: `1px solid ${isDarkMode ? '#333' : '#eee'}`
      },
      summary: {
        fontSize: `${fontSize}px`,
        fontWeight: 500,
        WebkitLineClamp: summaryLines
      },
      messageCount: {
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: `${fontSize - 2}px`
      },
      contentRow: {
        marginBottom: `${spacing/2}px`
      },
      metadataRow: {
        opacity: 0.8
      }
    },
    glass: {
      container: {
        margin: `${spacing/2}px 0`,
        padding: `${spacing}px`,
        borderRadius: `${borderRadius}px`,
        backgroundColor: isDarkMode ? 
          'rgba(31, 31, 31, 0.7)' : 
          'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        transition: 'all 0.3s ease'
      },
      summary: {
        fontSize: `${fontSize}px`,
        fontWeight: 500,
        WebkitLineClamp: summaryLines
      },
      messageCount: {
        padding: '2px 12px',
        borderRadius: '16px',
        fontSize: `${fontSize - 2}px`
      },
      searchInput: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: `${borderRadius}px`
      }
    },
    minimal: {
      container: {
        padding: `${spacing}px`,
        borderLeft: `3px solid ${selectedColors.border}`,
        transition: 'all 0.2s ease'
      },
      hover: {
        borderLeftColor: selectedColors.primary
      },
      summary: {
        fontSize: `${fontSize}px`,
        WebkitLineClamp: summaryLines
      },
      date: {
        fontSize: `${fontSize - 2}px`,
        opacity: 0.7
      },
      loadMoreButton: {
        border: 'none',
        background: 'none',
        color: selectedColors.primary
      }
    },
    flat: {
      container: {
        padding: `${spacing}px`,
        margin: `${spacing/2}px 0`,
        backgroundColor: isDarkMode ? '#1a1a1a' : '#f9f9f9',
        borderRadius: `${borderRadius}px`,
        transition: 'transform 0.2s ease'
      },
      hover: {
        transform: 'translateX(5px)'
      },
      summary: {
        fontSize: `${fontSize}px`,
        WebkitLineClamp: summaryLines
      },
      messageCount: {
        fontSize: `${iconSize}px`,
        color: selectedColors.primary
      }
    },
    gradient: {
      container: {
        padding: `${spacing}px`,
        margin: `${spacing/2}px 0`,
        background: isDarkMode ?
          'linear-gradient(145deg, #1f1f1f, #2d2d2d)' :
          'linear-gradient(145deg, #ffffff, #f5f5f5)',
        borderRadius: `${borderRadius}px`,
        boxShadow: isDarkMode ?
          '5px 5px 10px #1a1a1a, -5px -5px 10px #242424' :
          '5px 5px 10px #e6e6e6, -5px -5px 10px #ffffff',
        transition: 'all 0.3s ease'
      },
      summary: {
        fontSize: `${fontSize}px`,
        fontWeight: 500,
        WebkitLineClamp: summaryLines
      },
      messageCount: {
        color: '#fff',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: `${fontSize - 2}px`
      },
      loadMoreButton: {
        background: 'linear-gradient(145deg, #1890ff, #096dd9)',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: `${borderRadius}px`
      }
    }
  };

  const theme: WaiiHistoryTheme = {
    colors: selectedColors,
    spacing: {
      padding: `${spacing}px`,
      margin: `${spacing}px`,
      borderRadius: `${borderRadius}px`
    },
    typography: {
      titleSize: `${fontSize + 2}px`,
      textSize: `${fontSize}px`,
      metadataSize: `${fontSize - 2}px`,
      summarySize: `${fontSize}px`,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial',
      lineHeight: '1.5'
    }
  };

  const chatHistoryProps: Partial<WaiiChatHistoryProps> = {
    apiUrl: configs.apiUrl,
    apiKey: configs.apiKey,
    databaseKey: configs.databaseKey,
    style: {
      width: 'auto',
      height: `${height}px`,
      maxWidth: '100%',
      flex: '1'
    },
    isDarkMode,
    theme,
    historyListItemStyles: styleVariants[styleVariant],
    showSearch: true,
    searchPlaceholder: "Search chat history...",
    showLoadMore: true,
    loadMoreText: "Load More",
    loadMoreIncrement: 10,
    showNewChat: true,
    newChatText: "Start New Chat",
    initialDisplayCount: 10,
    minWidth: "300px",
    formatDate: (date: string) => new Date(date).toLocaleDateString()
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <Card title="WaiiChatHistory Style Customization">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Basic Settings */}
          <div>
            <h4>Theme & Style</h4>
            <Space wrap>
              <div>
                <div>Style Variant</div>
                <Select
                  value={styleVariant}
                  onChange={setStyleVariant}
                  style={{ width: 140 }}
                >
                  <Option value="default">Default</Option>
                  <Option value="modern">Modern</Option>
                  <Option value="glass">Glass</Option>
                  <Option value="minimal">Minimal</Option>
                  <Option value="flat">Flat</Option>
                  <Option value="gradient">Gradient</Option>
                </Select>
              </div>
            </Space>
          </div>

          {/* Typography Settings */}
          <div>
            <h4>Typography</h4>
            <Space wrap>
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
              <div>
                <div>Icon Size (px)</div>
                <Slider
                  min={12}
                  max={24}
                  value={iconSize}
                  onChange={setIconSize}
                  style={{ width: 150 }}
                />
              </div>
              <div>
                <div>Summary Lines</div>
                <Slider
                  min={1}
                  max={4}
                  value={summaryLines}
                  onChange={setSummaryLines}
                  style={{ width: 150 }}
                />
              </div>
            </Space>
          </div>

          {/* Layout Settings */}
          <div>
            <h4>Layout</h4>
            <Space wrap>
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
                <div>Spacing (px)</div>
                <Slider
                  min={8}
                  max={24}
                  value={spacing}
                  onChange={setSpacing}
                  style={{ width: 150 }}
                />
              </div>
            </Space>
          </div>

          {/* Preview */}
          <Card title="Preview">
            <div style={{
              border: `1px dashed ${selectedColors.border}`,
              borderRadius: `${borderRadius}px`,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: isDarkMode ? '#141414' : '#ffffff'
            }}>
              <WaiiChatHistory {...chatHistoryProps} />
            </div>
          </Card>
        </Space>
      </Card>
    </div>
  );
};

export default StyleShowcase;