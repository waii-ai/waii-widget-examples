import React, { useState, useRef, useCallback } from 'react';
import { WaiiSQLView } from '@waii-ai/widgets';
import { 
  Card, 
  Tabs, 
  Slider, 
  Space, 
  ColorPicker, 
  Switch, 
  Select, 
  Row, 
  Col, 
  Typography, 
  Divider,
  Button,
  InputNumber,
  Alert
} from 'antd';
import '../../../config.js';

// @ts-ignore
const { configs } = window;

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const mockAutocomplete = (pos: number, aiSuggestionsEnabled: boolean): string | null => {

  if(!aiSuggestionsEnabled) {
    return null;
  }

  const suggestions = [
    'SELECT * FROM users'
  ];

  return suggestions[Math.floor(Math.random() * suggestions.length)];
};

const WaiiSQLViewShowcase: React.FC = () => {
  // Basic state
  const [manualQuery, setManualQuery] = useState('');
  const [generatedQuery, setGeneratedQuery] = useState('');
  const [isQueryRunning, setIsQueryRunning] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Enhanced dimensions
  const [height, setHeight] = useState(300);
  const [width, setWidth] = useState(100);
  const [fontSize, setFontSize] = useState(14);
  const [minHeight, setMinHeight] = useState('');
  const [maxHeight, setMaxHeight] = useState('');

  // Theme and styling
  const [themePreset, setThemePreset] = useState<string>('default');
  const [customColors, setCustomColors] = useState({
    editorBackground: '#ffffff',
    textColor: '#000000',
    keywordColor: '#0066cc',
    stringColor: '#009900',
    numberColor: '#cc6600',
    commentColor: '#999999',
    cursorColor: '#000000',
    selectionBackground: '#b3d4fc'
  });

  // Editor configuration
  const [lineNumbers, setLineNumbers] = useState(true);
  const [lineWrapping, setLineWrapping] = useState(true);
  const [highlightActiveLine, setHighlightActiveLine] = useState(false);
  const [bracketMatching, setBracketMatching] = useState(true);
  const [foldingEnabled, setFoldingEnabled] = useState(false);
  const [searchEnabled, setSearchEnabled] = useState(false);

  // AI suggestions
  const [aiSuggestionsEnabled, setAiSuggestionsEnabled] = useState(false);
  const [ghostTextColor, setGhostTextColor] = useState('#666666');
  const [ghostTextOpacity, setGhostTextOpacity] = useState(0.6);
  const [suggestionDelay, setSuggestionDelay] = useState(500);

  // Autocomplete configuration
  const [maxRenderedOptions, setMaxRenderedOptions] = useState(20);
  const [activateOnTyping, setActivateOnTyping] = useState(true);

  // Accessibility
  const [ariaLabel, setAriaLabel] = useState('SQL Query Editor');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Loading configuration
  const [showGeneratingSpinner, setShowGeneratingSpinner] = useState(true);
  const [customLoadingText, setCustomLoadingText] = useState('');

  const [editorReady, setEditorReady] = useState(false);
  const [editorInfo, setEditorInfo] = useState<{
    totalLines: number;
    totalChars: number;
    cursorLine: number;
    currentSelection: string;
  }>({
    totalLines: 0,
    totalChars: 0,
    cursorLine: 0,
    currentSelection: ''
  });
  const editorViewRef = useRef<any>(null);

  // Compute enhanced props
  const dimensions = {
    height: `${height}px`,
    width: `${width}%`,
    fontSize: fontSize,
    ...(minHeight && { minHeight }),
    ...(maxHeight && { maxHeight })
  };

  const colorOverrides = isDarkMode ? {
    editorBackground: '#1e1e1e',
    textColor: '#d4d4d4',
    keywordColor: customColors.keywordColor,
    stringColor: customColors.stringColor,
    numberColor: customColors.numberColor,
    commentColor: customColors.commentColor,
    cursorColor: '#ffffff',
    selectionBackground: '#264f78'
  } : customColors;

  const editorConfig = {
    lineNumbers,
    lineWrapping,
    highlightActiveLine,
    bracketMatching,
    foldingEnabled,
    searchEnabled,
    autocompleteConfig: {
      maxRenderedOptions,
      activateOnTyping,
      closeOnBlur: true
    }
  };

  const aiSuggestionsConfig = aiSuggestionsEnabled ? {
    enabled: true,
    ghostTextColor,
    ghostTextOpacity,
    suggestionDelay,
    showLoadingIndicator: true
  } : undefined;

  const accessibilityConfig = {
    ariaLabel,
    highContrast,
    reducedMotion,
    announceChanges: true
  };

  const loadingConfig = {
    showGeneratingSpinner,
    showRunningSpinner: true,
    ...(customLoadingText && { customLoadingText })
  };

  // Event handlers
  const handleUpdateQuery = useCallback((query: string) => {
    setManualQuery(query);
  }, []);

  const handleCursorChange = useCallback((pos: number) => {
    console.log('Cursor position:', pos);
  }, []);

  const handleSelectionChange = useCallback((selection: { from: number; to: number; text: string }) => {
    console.log('Selection changed:', selection);
  }, []);

  const handleEditorReady = useCallback((view: any, state: any) => {
    
    if (!view) {
      console.warn('View is undefined in onCreateEditor - this might be a CodeMirror parameter order issue');
      return;
    }
    
    editorViewRef.current = view;
    setEditorReady(true);
    
    const updateEditorInfo = () => {
      if (view && state) {
        try {
          const doc = state.doc;
          const selection = state.selection.main;
          const cursorLine = doc.lineAt(selection.head);
          
          setEditorInfo({
            totalLines: doc.lines,
            totalChars: doc.length,
            cursorLine: cursorLine.number,
            currentSelection: doc.sliceString(selection.from, selection.to)
          });
        } catch (error) {
          console.warn('Error updating editor info:', error);
        }
      }
    };
    
    updateEditorInfo();
    
    if (view && typeof view.update?.addListener === 'function') {
      view.update.addListener((update: any) => {
        if (update.docChanged || update.selectionSet) {
          updateEditorInfo();
        }
      });
    }
    
    if (view && typeof view.focus === 'function') {
      setTimeout(() => {
        view.focus();
      }, 100);
    }
    
  }, []);

  console.log('aiSuggestionsEnabled', aiSuggestionsEnabled);

  const simulateQuery = () => {
    setIsQueryRunning(true);
    setTimeout(() => setIsQueryRunning(false), 2000);
  };

  const simulateGeneration = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGeneratedQuery('SELECT u.name, u.email, COUNT(o.id) as order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id ORDER BY order_count DESC;');
    }, 3000);
  };

  const simulateError = () => {
    setSearchError('Sample error: Invalid syntax near WHERE clause');
    setTimeout(() => setSearchError(''), 3000);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card>
          <Title level={2}>WaiiSQLView Demo</Title>
        </Card>

        <Row gutter={24}>
          <Col span={16}>
            <Card style={{ height: '100%' }}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Space wrap>
                  <Button onClick={simulateGeneration} loading={generating}>
                    Simulate Generation
                  </Button>
                  <Button onClick={simulateError}>
                    Simulate Error
                  </Button>
                  <Switch 
                    checked={isDarkMode} 
                    onChange={setIsDarkMode}
                    checkedChildren="🌙" 
                    unCheckedChildren="☀️"
                  />
                </Space>

                {editorReady && (
                  <Alert
                    type="info"
                    message="Editor Ready!"
                    description={
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <Text>
                          <strong>Lines:</strong> {editorInfo.totalLines} | 
                          <strong> Characters:</strong> {editorInfo.totalChars} | 
                          <strong> Current Line:</strong> {editorInfo.cursorLine}
                        </Text>
                        {editorInfo.currentSelection && (
                          <Text>
                            <strong>Selected:</strong> "{editorInfo.currentSelection}"
                          </Text>
                        )}
                        <Space wrap>
                          <Button 
                            size="small" 
                            onClick={() => {
                              if (editorViewRef.current) {
                                editorViewRef.current.focus();
                              }
                            }}
                          >
                            Focus Editor
                          </Button>
                          <Button 
                            size="small" 
                            onClick={() => {
                              if (editorViewRef.current) {
                                const doc = editorViewRef.current.state.doc;
                                editorViewRef.current.dispatch({
                                  selection: { anchor: 0, head: doc.length }
                                });
                              }
                            }}
                          >
                            Select All
                          </Button>
                          <Button 
                            size="small" 
                            onClick={() => {
                              if (editorViewRef.current) {
                                editorViewRef.current.dispatch({
                                  changes: {
                                    from: 0,
                                    to: editorViewRef.current.state.doc.length,
                                    insert: 'SELECT * FROM users WHERE active = true;'
                                  }
                                });
                              }
                            }}
                          >
                            Insert Sample Query
                          </Button>
                          <Button 
                            size="small" 
                            onClick={() => {
                              if (editorViewRef.current) {
                                const cursor = editorViewRef.current.state.selection.main.head;
                                editorViewRef.current.dispatch({
                                  changes: {
                                    from: cursor,
                                    insert: '\n-- Added via onCreateEditor reference'
                                  }
                                });
                              }
                            }}
                          >
                            Add Comment
                          </Button>
                        </Space>
                      </Space>
                    }
                    style={{ marginBottom: 16 }}
                  />
                )}
                

                <div style={{ 
                  border: '1px solid #d9d9d9', 
                  borderRadius: '6px',
                  padding: '16px',
                  backgroundColor: isDarkMode ? '#001529' : '#fafafa'
                }}>
                  <WaiiSQLView
                    aisuggestion={aiSuggestionsEnabled}
                    manualQuery={manualQuery}
                    sampleQuery="Type your SQL query here or use AI suggestions..."
                    autocomplete={(pos: number) => mockAutocomplete(pos, aiSuggestionsEnabled)}
                    updateGeneratedQuery={handleUpdateQuery}
                    generatedQuery={generatedQuery}
                    isDarkMode={isDarkMode}
                    dbType="snowflake"
                    timer={0}
                    searchError={searchError}
                    generating={generating}
                    readOnly={false}
                    isQueryRunning={isQueryRunning}
                    onCursorChange={handleCursorChange}
                    isExpandedVisible={false}
                    customKeymap={
                      [
                      {
                        key: "Ctrl-s",
                        run: (view) => {
                          console.log('Save shortcut pressed (Ctrl+S)');
                          const content = view.state.doc.toString();
                          console.log('Saving SQL:', content);
                          return true;
                        }
                      },
                      {
                        key: "F5",
                        run: (view) => {
                          console.log('Refresh shortcut pressed (F5)');
                          return true;
                        }
                      },
                      {
                        key: "Ctrl-Alt-f",
                        run: (view) => {
                          console.log('Format shortcut pressed (Ctrl+Alt+F)');
                          const content = view.state.doc.toString();
                          const formatted = content
                            .replace(/\s+/g, ' ')
                            .replace(/\s*,\s*/g, ',\n  ')
                            .replace(/\s*FROM\s*/gi, '\nFROM ')
                            .replace(/\s*WHERE\s*/gi, '\nWHERE ')
                            .replace(/\s*ORDER\s+BY\s*/gi, '\nORDER BY ');
                          
                          view.dispatch({
                            changes: {
                              from: 0,
                              to: view.state.doc.length,
                              insert: formatted
                            }
                          });
                          return true;
                        }
                      },
                      {
                        key: "Ctrl-d",
                        run: (view) => {
                          console.log('Duplicate line shortcut pressed (Ctrl+D)');
                          const cursor = view.state.selection.main.head;
                          const line = view.state.doc.lineAt(cursor);
                          view.dispatch({
                            changes: {
                              from: line.to,
                              insert: '\n' + line.text
                            },
                            selection: { anchor: line.to + 1 + line.text.length }
                          });
                          return true;
                        }
                      },
                      {
                        key: "Ctrl-/",
                        run: (view) => {
                          console.log('Toggle comment shortcut pressed (Ctrl+/)');
                          const cursor = view.state.selection.main.head;
                          const line = view.state.doc.lineAt(cursor);
                          const lineText = line.text;
                          
                          let newText: string;
                          if (lineText.trim().startsWith('--')) {
                            newText = lineText.replace(/^\s*--\s?/, '');
                          } else {
                            newText = '-- ' + lineText;
                          }
                          
                          view.dispatch({
                            changes: {
                              from: line.from,
                              to: line.to,
                              insert: newText
                            }
                          });
                          return true;
                        }
                      },
                      {
                        key: "Shift-Enter",
                        run: (view) => {
                          console.log('Execute query shortcut triggered! (Shift+Enter)');
                          const content = view.state.doc.toString();
                          if (content.trim()) {
                            console.log('Executing SQL:', content);
                            simulateQuery(); // Trigger the query execution
                          } else {
                            console.log('No SQL content to execute');
                          }
                          return true;
                        }
                      }
                    ]}
                    dimensions={dimensions}
                    themePreset={themePreset as any}
                    colorOverrides={colorOverrides}
                    editorConfig={editorConfig}
                    aiSuggestionsConfig={aiSuggestionsConfig}
                    accessibilityConfig={accessibilityConfig}
                    loadingConfig={loadingConfig}
                    onSelectionChange={handleSelectionChange}
                    onCreateEditor={handleEditorReady}
                    catalog={{
                      "catalogs": [
                          {
                              "name": "MOVIE_DB",
                              "schemas": [
                                  {
                                      "entity_type": "schema",
                                      "name": {
                                          "schema_name": "MOVIES_AND_TV",
                                          "database_name": "MOVIE_DB"
                                      },
                                      "tables": [
                                          {
                                              "entity_type": "table",
                                              "name": {
                                                  "table_name": "TV_SERIES_TO_NETWORKS_BRIDGE",
                                                  "schema_name": "MOVIES_AND_TV",
                                                  "database_name": "MOVIE_DB"
                                              },
                                              "columns": [
                                                  {
                                                      "entity_type": "column",
                                                      "name": "TV_SERIES_ID",
                                                      "type": "TEXT"
                                                  },
                                                  {
                                                      "entity_type": "column",
                                                      "name": "NETWORK_ID",
                                                      "type": "TEXT"
                                                  }
                                              ]
                                          },
                                          {
                                              "entity_type": "table",
                                              "name": {
                                                  "table_name": "TV_SERIES_PRODUCTION_COMPANIES_BRIDGE",
                                                  "schema_name": "MOVIES_AND_TV",
                                                  "database_name": "MOVIE_DB"
                                              },
                                              "columns": [
                                                  {
                                                      "entity_type": "column",
                                                      "name": "TV_SERIES_ID",
                                                      "type": "TEXT"
                                                  },
                                                  {
                                                      "entity_type": "column",
                                                      "name": "PROD_COMP_ID",
                                                      "type": "TEXT"
                                                  }
                                              ]
                                          }
                                      ]
                                  }
                              ]
                          }
                      ]
                  }}
                    classNames={{
                      container: 'enhanced-sql-container'
                    }}
                    styles={{
                      container: {
                        boxShadow: isDarkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)'
                      }
                    }}
                  />
                </div>
              </Space>
            </Card>
          </Col>

          <Col span={8}>
            {/* Configuration Panel */}
            <Card title="Configuration Panel" style={{ height: '100%' }}>
              <Tabs defaultActiveKey="dimensions" size="small">
                <TabPane tab="Dimensions" key="dimensions">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <Text strong>Height (px)</Text>
                      <Slider
                        min={200}
                        max={800}
                        value={height}
                        onChange={setHeight}
                        tooltip={{ formatter: (value) => `${value}px` }}
                      />
                    </div>
                    <div>
                      <Text strong>Width (%)</Text>
                      <Slider
                        min={50}
                        max={100}
                        value={width}
                        onChange={setWidth}
                        tooltip={{ formatter: (value) => `${value}%` }}
                      />
                    </div>
                    <div>
                      <Text strong>Font Size</Text>
                      <Slider
                        min={10}
                        max={20}
                        value={fontSize}
                        onChange={setFontSize}
                        tooltip={{ formatter: (value) => `${value}px` }}
                      />
                    </div>
                  </Space>
                </TabPane>

                <TabPane tab="Themes" key="themes">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <Text strong>Theme Preset</Text>
                      <Select
                        value={themePreset}
                        onChange={setThemePreset}
                        style={{ width: '100%' }}
                      >
                        <Select.Option value="light">Light</Select.Option>
                        <Select.Option value="dark">Dark</Select.Option>
                      </Select>
                    </div>
                    
                    <Divider />
                  </Space>
                </TabPane>

                <TabPane tab="Editor" key="editor">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <Switch checked={lineNumbers} onChange={setLineNumbers} />
                      <Text style={{ marginLeft: 8 }}>Line Numbers</Text>
                    </div>
                    <div>
                      <Switch checked={lineWrapping} onChange={setLineWrapping} />
                      <Text style={{ marginLeft: 8 }}>Line Wrapping</Text>
                    </div>
                    <div>
                      <Switch checked={highlightActiveLine} onChange={setHighlightActiveLine} />
                      <Text style={{ marginLeft: 8 }}>Highlight Active Line</Text>
                    </div>
                    <div>
                      <Switch checked={bracketMatching} onChange={setBracketMatching} />
                      <Text style={{ marginLeft: 8 }}>Bracket Matching</Text>
                    </div>
                    <div>
                      <Switch checked={foldingEnabled} onChange={setFoldingEnabled} />
                      <Text style={{ marginLeft: 8 }}>Code Folding</Text>
                    </div>
                    <div>
                      <Switch checked={searchEnabled} onChange={setSearchEnabled} />
                      <Text style={{ marginLeft: 8 }}>Search</Text>
                    </div>
                    
                    <Divider />
                  </Space>
                </TabPane>

                <TabPane tab="AI" key="ai">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <Switch checked={aiSuggestionsEnabled} onChange={setAiSuggestionsEnabled} />
                      <Text style={{ marginLeft: 8 }}>AI Suggestions</Text>
                    </div>
                    
                    {aiSuggestionsEnabled && (
                      <>
                        <div>
                          <Text strong>Ghost Text Color</Text>
                          <ColorPicker
                            value={ghostTextColor}
                            onChange={(color) => setGhostTextColor(color.toHexString())}
                          />
                        </div>
                        <div>
                          <Text strong>Ghost Text Opacity</Text>
                          <Slider
                            min={0.1}
                            max={1}
                            step={0.1}
                            value={ghostTextOpacity}
                            onChange={setGhostTextOpacity}
                            tooltip={{ formatter: (value) => `${(value! * 100).toFixed(0)}%` }}
                          />
                        </div>
                        <div>
                          <Text strong>Suggestion Delay (ms)</Text>
                          <InputNumber
                            min={100}
                            max={2000}
                            step={100}
                            value={suggestionDelay}
                            onChange={(value) => setSuggestionDelay(value || 500)}
                            style={{ width: '100%' }}
                          />
                        </div>
                      </>
                    )}
                  </Space>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default WaiiSQLViewShowcase; 