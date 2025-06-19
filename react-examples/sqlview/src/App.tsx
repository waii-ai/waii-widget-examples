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

  const handleEditorReady = useCallback((editor: any) => {
    console.log('Editor ready:', editor);
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
                <Space>
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

                    
                    dimensions={dimensions}
                    themePreset={themePreset as any}
                    colorOverrides={colorOverrides}
                    editorConfig={editorConfig}
                    aiSuggestionsConfig={aiSuggestionsConfig}
                    accessibilityConfig={accessibilityConfig}
                    loadingConfig={loadingConfig}
                    onSelectionChange={handleSelectionChange}
                    onReady={handleEditorReady}
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
                                                      "type": "TEXT",
                                                      "comment": null,
                                                      "sample_values": {
                                                          "values": {
                                                              "9d527926-adc1-4acf-92bc-a5e93127ea01": 1,
                                                              "a6b3cc77-f0d3-400a-a8dd-6a74c0b8754b": 1,
                                                              "b3ba6f12-0b70-4c53-85ca-739722faff7b": 1,
                                                              "ba1f860e-6626-465f-9dfd-24d84d71e213": 1,
                                                              "a5ae5d8f-768b-4ef5-a70f-9fed7b586cae": 1,
                                                              "04c7a65b-bdd1-4b68-a44b-912726741786": 1,
                                                              "057d2e72-5b59-4ed6-90f1-7dc66e59584d": 1,
                                                              "0a411a0c-cd3a-4104-af5b-29f7a935efc7": 1,
                                                              "624f96bf-0d8a-43cc-b0af-c12516bc2a45": 1,
                                                              "fd90a649-6647-408d-a248-a67dce0f6547": 1,
                                                              "36606937-9ece-4494-a321-51e7bfa1cc66": 1,
                                                              "ca316a81-b73e-4c7c-a0e4-938834eaa7e2": 1,
                                                              "d663586c-d889-4382-88cd-e4ded5f1248d": 1,
                                                              "a656cfac-46a0-42d7-9d58-3d6403a2dd50": 1,
                                                              "11957e62-2c0b-4c25-9c6c-a142833216ed": 1,
                                                              "1fe6f1e0-901d-4ecf-bd1e-23f6ca75e8bb": 1,
                                                              "f08247c8-615c-423c-ab69-f8fc0fbaa0eb": 1,
                                                              "6e02a0cb-c63d-4148-9ddb-22e5b17941af": 1,
                                                              "2585437d-b090-4fc1-8bc6-f6aedd9dae92": 1,
                                                              "30ebe308-3b54-412f-bf77-9be200b3a134": 1,
                                                              "551d049c-5738-4722-b129-7c05795e155d": 1,
                                                              "8149fbc4-3634-4b50-b914-41cb892c11b9": 1,
                                                              "8614d1ac-a8c7-4b9a-b588-e44e0152ffb5": 1,
                                                              "8a2b5a57-9b6f-4154-b2c2-25f92d91dbc1": 1,
                                                              "5582ece4-a374-4b61-acde-27669b1ecf12": 1,
                                                              "5c742167-bcc3-485a-bc84-18501fcb47b0": 1,
                                                              "09cdddaa-27ac-484c-b495-f428f462f9db": 1,
                                                              "f202810c-29c5-4603-9797-60dbd6a52546": 1,
                                                              "3b74dba4-e51f-40b5-8f8d-aa3884b2d1a8": 1,
                                                              "8d5c7213-1b7a-46df-b152-283ba3f61b2a": 1,
                                                              "998cb0d8-e9d2-4776-aeba-c6a08b6da780": 1,
                                                              "9e9b708d-a15d-458b-a2cc-c23c3d534570": 1,
                                                              "c3a38f41-6b09-4372-b5a1-95c47c300063": 1,
                                                              "f0d20179-5f03-49b1-ab2c-9a7bd4891e5e": 1,
                                                              "2194f8f8-9559-4ba6-9d94-9e43e46d4551": 1,
                                                              "07d1e8e1-7807-411e-ac2c-2cba30d674cd": 1,
                                                              "bd24e68f-8619-49c7-aa11-99654d653c45": 1,
                                                              "48f2034d-f397-486c-826d-ffd4775cd397": 1,
                                                              "7150b57d-dfc3-4a4e-9e14-793936b13860": 1,
                                                              "3ea6f00b-44de-4433-83f5-0766ce4d682b": 1,
                                                              "e9c826a7-b2be-43d0-9273-1ba5f13240f3": 1,
                                                              "f53a8e1c-4586-4e79-98aa-84844b0a780f": 1,
                                                              "dd70a4bc-6cad-4b12-b508-bc9b5da19595": 1,
                                                              "14085112-da9f-4533-bd00-b96c72a90598": 1,
                                                              "9ba48180-17e6-415e-930b-b4daed9d249e": 1,
                                                              "2c9f0254-9d30-416c-8db5-da7aaaa9320b": 1,
                                                              "2d3c762c-bba3-463f-a1cb-1b870dcc4e8b": 1,
                                                              "9891e89f-e7eb-47e8-b790-a6809414019e": 1,
                                                              "24ea2cea-220f-4e07-87d8-df9287c39841": 1,
                                                              "86a21136-0bac-4c71-b23f-94d64e291306": 1,
                                                              "92501454-64b7-4a55-a73e-2af251f1480b": 1,
                                                              "cded7110-6114-41da-943e-015b57798204": 1,
                                                              "af25ca20-834b-460b-af8a-0e1db3e8756b": 1,
                                                              "72181eed-99ab-457a-96c9-560ac544d874": 1,
                                                              "7666d108-44f6-45e6-867e-ceeb4c6cdb40": 1,
                                                              "93826fa9-256c-4c19-a4ba-f9918043b719": 1,
                                                              "04a7569b-ae53-4024-a720-c2c074c1d49f": 1,
                                                              "57e31ebb-805e-4b6a-a883-a0060dde00c4": 1,
                                                              "210eedb7-7aa6-48eb-aac6-8a3c1805149f": 1,
                                                              "57a62c4d-954d-4dcc-aafb-fc871a0aa5d9": 1,
                                                              "c245bd7b-0cc2-49de-bbde-1315899f0d11": 1,
                                                              "6431810a-5fda-41aa-99e8-e5b842e5efd5": 1,
                                                              "6219b06f-5e12-4039-a558-1d89e551a8ae": 1,
                                                              "97835d73-5509-47c6-9642-5671069af849": 1,
                                                              "59ab5fa2-d303-4527-8b4e-90e8e23466b7": 1,
                                                              "a0c92953-6d0f-457f-9f30-bea3534b2976": 1,
                                                              "7fd133c2-8dfa-48ac-a568-c0372ad73d86": 1,
                                                              "6756daa9-01b6-4f54-96db-a57b3854ec0d": 1,
                                                              "128e2d58-d403-4852-b6d0-f22578fa7cd8": 1,
                                                              "3300027d-c18c-4fe5-872e-3acd49a75cb4": 1,
                                                              "f7d56ac1-ead8-495d-8c82-a4d3a96f6044": 1,
                                                              "35805483-ec33-4833-ae2c-13c592645ab7": 1,
                                                              "4aeba5f9-af25-468f-9b28-eb2b2c2dda20": 1,
                                                              "6ebd0bed-b261-4cec-9d67-43bceb62f080": 1,
                                                              "df83ada7-bbc7-43a2-8148-ef4cc300753d": 1,
                                                              "455fbf68-2688-4548-a3b5-3472b4a0c3b5": 1,
                                                              "5d21309f-1f05-4cff-be91-94d65494cd12": 1,
                                                              "39b889d1-8fbd-40cd-a2ae-3a6f31b81772": 1,
                                                              "91081927-4cb1-4c48-989e-2864e572bba8": 1,
                                                              "cb972936-b318-4427-a67f-686649f6b9f4": 1,
                                                              "bda5b75b-7a24-41b8-a35a-4a94a4f00206": 1,
                                                              "f397c9eb-2f5c-461c-ad59-7085526a338c": 1,
                                                              "090b0b4b-0b74-492a-9f78-4c83de7c8728": 1,
                                                              "1d0c364a-e374-43a6-bfe7-97d2182de5ab": 1,
                                                              "458e786e-aa99-4e9f-b673-26ecbad6b08a": 1,
                                                              "c7d8b799-24bc-488b-8890-4a8758752871": 1,
                                                              "6eeed0a7-1412-40f9-8d7a-5acfa3aca713": 1,
                                                              "64bba784-dfd8-4b93-946d-0163732bfc70": 1,
                                                              "e05da4f1-c5b9-4f88-aa85-7fe4cc0a869c": 1,
                                                              "e0bcc8ef-aa09-4a88-a599-37711ee394f0": 1,
                                                              "ef6b429a-0416-4591-bda9-280ae84ae23b": 1,
                                                              "50959201-6bd7-412a-bdf3-7fc65ed5542a": 1,
                                                              "851e6765-fa4c-4b12-a8d4-dfbcd127b4fa": 1,
                                                              "2a8fc214-7692-4ab6-9b86-1b75b4a2311d": 1,
                                                              "cc62dd49-d3cf-4fbf-b82b-a7a76fc44fc3": 1,
                                                              "a56f0d6a-2775-41d1-9080-5a790275ce4d": 1,
                                                              "0deec70f-d0cd-4601-be0d-cdcfb3a739d4": 1,
                                                              "1bd6898f-c90e-4773-8a9c-2f5c4357d01c": 1,
                                                              "50bce107-7112-48c5-abc3-81de23788097": 1,
                                                              "8eb4f2cf-2ec0-4294-b730-39ce1eb578ff": 1
                                                          },
                                                          "ndv": 166,
                                                          "unified_json_schema": null,
                                                          "col_type": "string"
                                                      },
                                                      "description": "The TV_SERIES_ID column serves as a unique identifier for each television series in the database. This identifier is essential for distinguishing between different series and for establishing relationships with other data entities, such as episodes or seasons.",
                                                      "description_update_source": "generated",
                                                      "similarity_search_index_id": null,
                                                      "semantic_information": {
                                                          "semantic_type": "other",
                                                          "semantic_usage": "This column is primarily used as a key to link TV series data with other related tables, facilitating data integrity and relational queries."
                                                      },
                                                      "collation_name": null
                                                  },
                                                  {
                                                      "entity_type": "column",
                                                      "name": "NETWORK_ID",
                                                      "type": "TEXT",
                                                      "comment": null,
                                                      "sample_values": {
                                                          "values": {
                                                              "ba2be744-51be-4382-a34e-6462b710c191": 1,
                                                              "98d45a44-6e41-404d-ab7d-ff45f4d6d6d1": 1,
                                                              "ce7e3ad2-55e2-4f78-bbb7-3c388bbc5342": 1,
                                                              "fbcff670-15a2-4e56-8061-f6adcbe8a472": 1,
                                                              "2a157258-7d0c-4f80-9ecd-ec424f67ab98": 1,
                                                              "add84d95-6c79-4c1f-b39f-c0224aa49621": 1,
                                                              "8b41f9a0-8f76-43dd-9126-ac5685f8502e": 1,
                                                              "d9e5d50a-8534-4f94-95a4-b3f03b84c799": 1,
                                                              "0a8abb30-39d2-45f0-a1ca-51ca4d0f0a73": 1,
                                                              "dfc882b9-3f47-4dbb-8e1c-69259de5b6c0": 1,
                                                              "d78e295d-e847-47e8-ad3e-f958cac5e034": 1,
                                                              "b6b35f02-0639-44cd-8d82-7dc32970711e": 1,
                                                              "79fe155e-87c1-43b6-a233-106a34874a95": 1,
                                                              "d9caee8c-17f1-49c9-9f87-c97e49ed743a": 1,
                                                              "e5bb90a7-faaa-48d4-b52d-040db88dd685": 1,
                                                              "99e3673e-aef3-4cbe-a8f0-210dc61cead6": 1,
                                                              "0a55617b-1760-47ce-b105-800236ba1f5f": 1,
                                                              "0e25cf97-a79a-4f27-b72e-efe072ea8d5d": 1,
                                                              "62b1ec3b-8a4b-4c6b-b301-ef60cf7f1cfd": 1,
                                                              "cf695025-735b-4776-9689-487bdd8fb9ce": 1,
                                                              "d47b221c-537d-436c-94af-2f9da14f4303": 1,
                                                              "8fc7c660-2602-4afc-bff8-373ca4fb05d8": 1,
                                                              "711f1447-fd26-4241-aa9b-5fef49b5cbc0": 1,
                                                              "fc4f18f6-abca-4437-ba94-fa8fbe2623f2": 1,
                                                              "62b86f06-c162-4b02-bda3-6b89f21e0146": 1,
                                                              "30848cf9-6920-4881-9c23-45312ba3a121": 1,
                                                              "dd4fc041-aa51-4dde-9cbb-b877f4db6735": 1,
                                                              "1910125c-4e00-41c1-b1c6-889ad8ab7d5f": 1,
                                                              "4844d345-659f-48b6-9727-7529395680e5": 1,
                                                              "4d06dd0b-a3a6-4cb7-a8f1-0ff6988c1725": 1,
                                                              "14759507-738d-4fd1-a152-97fe88de39c7": 1,
                                                              "739ccf90-6331-40fe-a253-eb0f0d35adc0": 1,
                                                              "cff38b9f-c6e2-43f4-8bfa-1b384d225cb3": 1,
                                                              "0adb05de-eaf8-431e-9226-542a4e3bbe56": 1,
                                                              "d602fb3e-167a-44f4-b133-4d9a0a7e1dce": 1,
                                                              "f37cfb03-5d01-4bf8-a56c-2e0bf4e2eacb": 1,
                                                              "cb5d0dd7-ad71-4389-8dcc-6a3aa54be397": 1,
                                                              "64bc08ae-5774-40ad-ab15-ba2c9d4cb6ad": 1,
                                                              "b2d4a825-6724-4d04-ac00-45cb6fd91b6f": 1,
                                                              "8756c774-2e96-4c75-a27e-364a66bf0d0c": 1,
                                                              "85c93233-9809-4c70-90e5-ca388a01b59b": 1,
                                                              "8cf81a5b-77b0-4a32-908e-ad3294eb4430": 1,
                                                              "af4998dc-2cd9-4a55-8653-95c1990c29dd": 1,
                                                              "207fafec-98f5-47d1-a8bb-cbf4a78fabbe": 1,
                                                              "30235eea-5620-4760-91ad-9424eb1e3ec9": 1,
                                                              "daa1bfbd-2663-4ac3-9cfc-00bba3ce8573": 1,
                                                              "a9b7ae6b-6105-447d-a1be-b4786d0a4d7e": 1,
                                                              "f2bcff24-4653-4ad7-bce0-923d3c18f69e": 1,
                                                              "7aedc4d8-8236-4170-bbf0-bd26523328a3": 1,
                                                              "54423568-ce1c-42d3-81f1-279719b67d7c": 1,
                                                              "01daf855-15ae-470e-9f08-329b808b5333": 1,
                                                              "537d00af-1721-44ea-9585-fa8b42f50beb": 1,
                                                              "c3294149-5237-4c90-bf0e-1145163dc163": 1,
                                                              "f64be626-2503-48a4-ab2b-b0f6fb3ed3a6": 1,
                                                              "8588c173-a1c1-4bc3-aea4-15a27ed11d72": 1,
                                                              "61a0900d-a6dd-4439-8690-43fa07475d83": 1,
                                                              "53c1d045-403f-4284-85d4-ea49e1d123ac": 1,
                                                              "d54d22fd-51a6-4899-bdbd-a24623c899fa": 1,
                                                              "ba531e03-cab0-4cd7-931a-2e20f497b4b6": 1,
                                                              "4dc4201b-ede0-45ab-9828-3b8f0fa7d1a9": 1,
                                                              "2a95c790-17fc-471b-85cf-5198dcb411a8": 1,
                                                              "56fec9fe-3474-4902-ad08-dc39d04985b9": 1,
                                                              "4737da04-d2aa-448b-9be4-8c0151ae7e42": 1,
                                                              "31eff7b2-16c6-469b-bcd7-75fdb7d15a3a": 1,
                                                              "ea77582e-2ff0-428d-9c50-65170f1abcd9": 1,
                                                              "a3a9076d-46f8-4b59-bd3f-1778d191a7ce": 1,
                                                              "6e89ff9a-d448-480d-88ce-76e9205bdf87": 1,
                                                              "a852ade9-629d-446a-9093-fbc5c10730f8": 1,
                                                              "9170521d-0b1a-4397-abbe-f69158c94e91": 1,
                                                              "2e389e5a-a96b-40a0-b7c0-8e65248815f6": 1,
                                                              "1e1c5581-0fae-44bd-ad50-97fe0eeccf98": 1,
                                                              "6a104501-e360-42b7-bdec-dbd0dc98347d": 1,
                                                              "47789573-27d3-4cd1-8029-1bca5a2583c2": 1,
                                                              "ac80311c-550b-430e-bcad-1222f5741ae0": 1,
                                                              "59716a18-8d2b-4626-949e-24a3339e30bb": 1,
                                                              "e89f3a08-81fe-41de-9f90-4a5003635a11": 1,
                                                              "7e258cd6-2a91-4a87-af05-9b62aee1d885": 1,
                                                              "17c2b263-2f94-4ff5-b8c5-18cc975f9bd0": 1,
                                                              "cac8ce60-aef5-409e-bad6-f8471050753f": 1,
                                                              "fabcf09d-521e-42ea-99f2-294bfbfab64f": 1,
                                                              "54d29839-de0d-4e05-b2fc-49f7b4fb0a4d": 1,
                                                              "d09d4a17-d86e-481b-8bab-89a82dcbc927": 1,
                                                              "525777d6-dea7-4016-a64a-d4fd688ea436": 1,
                                                              "849e1188-7520-4747-ad9d-75810d4895b0": 1,
                                                              "6daf8ba2-70ef-47c8-b923-424ea62776e6": 1,
                                                              "f41cc3ae-7ff0-4c7c-b66a-a0b48e5572c2": 1,
                                                              "5cd35ff5-1335-4dc4-a843-6faa129e9503": 1,
                                                              "26ba71f7-1db1-4442-b6d9-5632cb034ec5": 1,
                                                              "554afeab-c2b8-457d-bf60-9138dde58219": 1,
                                                              "4400844b-02d8-4013-a98a-b9e2023874f7": 1,
                                                              "feca291b-9dc7-4aa9-97f4-11272c27addd": 1,
                                                              "27d7674f-22df-44ff-86cb-8d2213592912": 1,
                                                              "6316ebea-5713-4094-a12a-3c12f26127cb": 1,
                                                              "5910ecae-a9e2-44f6-a30b-c7bcc30588b5": 1,
                                                              "9c3493ca-78a1-440a-bbad-187b5b74a75e": 1,
                                                              "0ee8ec6c-95ca-4c31-b656-a15931c1ec37": 1,
                                                              "1f6a09e3-6b42-4caf-ba06-567ddf7ac6f9": 1
                                                          },
                                                          "ndv": 97,
                                                          "unified_json_schema": null,
                                                          "col_type": "string"
                                                      },
                                                      "description": "The NETWORK_ID column represents a unique identifier for the television network associated with a specific TV series. This identifier is crucial for linking TV series to their respective broadcasting networks, allowing for the organization and retrieval of data related to network affiliations.",
                                                      "description_update_source": "generated",
                                                      "similarity_search_index_id": null,
                                                      "semantic_information": {
                                                          "semantic_type": "dimension",
                                                          "semantic_usage": "This column can be used for filtering and grouping TV series by their associated networks, enabling analysis of viewership trends and network performance."
                                                      },
                                                      "collation_name": null
                                                  }
                                              ],
                                              "comment": null,
                                              "last_altered_time": 1747843321.7520328,
                                              "refs": [],
                                              "constraints": [
                                                  {
                                                      "entity_type": "constraint",
                                                      "source": "inferred_llm",
                                                      "table": {
                                                          "table_name": "TV_SERIES_TO_NETWORKS_BRIDGE",
                                                          "schema_name": "MOVIES_AND_TV",
                                                          "database_name": "MOVIE_DB"
                                                      },
                                                      "cols": [
                                                          "TV_SERIES_ID",
                                                          "NETWORK_ID"
                                                      ],
                                                      "constraint_type": "primary",
                                                      "relationship_type": null,
                                                      "description": null,
                                                      "frequency": -1,
                                                      "check_search_condition": null,
                                                      "src_table": null,
                                                      "src_cols": null,
                                                      "comment": null
                                                  },
                                                  {
                                                      "entity_type": "constraint",
                                                      "source": "database",
                                                      "table": {
                                                          "table_name": "TV_SERIES_NETWORKS",
                                                          "schema_name": "MOVIES_AND_TV",
                                                          "database_name": "MOVIE_DB"
                                                      },
                                                      "cols": [
                                                          "NETWORK_ID"
                                                      ],
                                                      "constraint_type": "foreign",
                                                      "relationship_type": null,
                                                      "description": null,
                                                      "frequency": 0,
                                                      "check_search_condition": null,
                                                      "src_table": {
                                                          "table_name": "TV_SERIES_TO_NETWORKS_BRIDGE",
                                                          "schema_name": "MOVIES_AND_TV",
                                                          "database_name": "MOVIE_DB"
                                                      },
                                                      "src_cols": [
                                                          "NETWORK_ID"
                                                      ],
                                                      "comment": null
                                                  },
                                                  {
                                                      "entity_type": "constraint",
                                                      "source": "database",
                                                      "table": {
                                                          "table_name": "TV_SERIES",
                                                          "schema_name": "MOVIES_AND_TV",
                                                          "database_name": "MOVIE_DB"
                                                      },
                                                      "cols": [
                                                          "TV_SERIES_ID"
                                                      ],
                                                      "constraint_type": "foreign",
                                                      "relationship_type": null,
                                                      "description": null,
                                                      "frequency": 0,
                                                      "check_search_condition": null,
                                                      "src_table": {
                                                          "table_name": "TV_SERIES_TO_NETWORKS_BRIDGE",
                                                          "schema_name": "MOVIES_AND_TV",
                                                          "database_name": "MOVIE_DB"
                                                      },
                                                      "src_cols": [
                                                          "TV_SERIES_ID"
                                                      ],
                                                      "comment": null
                                                  }
                                              ],
                                              "inferred_refs": [],
                                              "inferred_constraints": [],
                                              "description": "This table serves as a bridge between TV series and their respective networks, allowing users to easily identify which networks broadcast specific TV series, facilitating better insights into programming and network partnerships.",
                                              "description_update_source": null,
                                              "virtual_view": false,
                                              "ddl": null
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
                                                      "type": "TEXT",
                                                      "comment": null,
                                                      "sample_values": {
                                                          "values": {
                                                              "5d21309f-1f05-4cff-be91-94d65494cd12": 1,
                                                              "60f8d9de-8271-4bcb-963b-d70afc6f798b": 1,
                                                              "e05da4f1-c5b9-4f88-aa85-7fe4cc0a869c": 1,
                                                              "114e46b2-90bc-4f8f-a222-e520735564a6": 1,
                                                              "3ffbcd90-6ea4-4b71-bcd3-1b35f0f21d71": 1,
                                                              "8614d1ac-a8c7-4b9a-b588-e44e0152ffb5": 1,
                                                              "43a4aad5-af72-45df-9cff-79c3cb0903d7": 1,
                                                              "551d049c-5738-4722-b129-7c05795e155d": 1,
                                                              "36606937-9ece-4494-a321-51e7bfa1cc66": 1,
                                                              "6455872b-1c32-491a-bf30-210b415ee5b0": 1,
                                                              "3b74dba4-e51f-40b5-8f8d-aa3884b2d1a8": 1,
                                                              "11957e62-2c0b-4c25-9c6c-a142833216ed": 1,
                                                              "fce28abb-6cf9-4b3d-bdf4-6f7166b06499": 1,
                                                              "d5e38a25-0fa2-48d8-b89b-2f74d1b67569": 1,
                                                              "9891e89f-e7eb-47e8-b790-a6809414019e": 1,
                                                              "b6f9cc1d-a427-413b-a856-41862f25ae24": 1,
                                                              "9d4dbf8a-7be0-48bf-9e2e-9215c9f70bff": 1,
                                                              "d663586c-d889-4382-88cd-e4ded5f1248d": 1,
                                                              "2585437d-b090-4fc1-8bc6-f6aedd9dae92": 1,
                                                              "50bce107-7112-48c5-abc3-81de23788097": 1,
                                                              "2474f4f8-45c7-432b-8bd8-12e2b233c2b2": 1,
                                                              "df214e72-7523-496d-a51d-bc2ba988687c": 1,
                                                              "a5ae5d8f-768b-4ef5-a70f-9fed7b586cae": 1,
                                                              "6ff69b90-a575-4a0a-8956-629c5453b9da": 1,
                                                              "624f96bf-0d8a-43cc-b0af-c12516bc2a45": 1,
                                                              "f53a8e1c-4586-4e79-98aa-84844b0a780f": 1,
                                                              "99324e87-17fc-4671-8047-33d231c5f81e": 1,
                                                              "6756daa9-01b6-4f54-96db-a57b3854ec0d": 1,
                                                              "1fe6f1e0-901d-4ecf-bd1e-23f6ca75e8bb": 1,
                                                              "af25ca20-834b-460b-af8a-0e1db3e8756b": 1,
                                                              "4aeba5f9-af25-468f-9b28-eb2b2c2dda20": 1,
                                                              "bda5b75b-7a24-41b8-a35a-4a94a4f00206": 1,
                                                              "b07c6a71-fb14-4f7d-a3cf-d31ff2550072": 1,
                                                              "26a6d250-8e40-4a99-8b55-3120f219df12": 1,
                                                              "48f2034d-f397-486c-826d-ffd4775cd397": 1,
                                                              "28bd47e8-384c-4b9f-ab17-c0907bb35067": 1,
                                                              "3300027d-c18c-4fe5-872e-3acd49a75cb4": 1,
                                                              "4ad70620-89b7-44a1-b13f-9cdf818fe8a8": 1,
                                                              "10a4bdd9-0945-448f-9b8b-c63759c04fd5": 1,
                                                              "7666d108-44f6-45e6-867e-ceeb4c6cdb40": 1,
                                                              "2d3c762c-bba3-463f-a1cb-1b870dcc4e8b": 1,
                                                              "7cf99785-c040-4863-8429-8916b3006e11": 1,
                                                              "a56f0d6a-2775-41d1-9080-5a790275ce4d": 1,
                                                              "c7d8b799-24bc-488b-8890-4a8758752871": 1,
                                                              "04c7a65b-bdd1-4b68-a44b-912726741786": 1,
                                                              "64bba784-dfd8-4b93-946d-0163732bfc70": 1,
                                                              "d9d47192-7e2f-481d-9d73-c2d4ebc68ba9": 1,
                                                              "430b0eaa-cede-4be7-9c17-1a6b554bc195": 1,
                                                              "35baaac1-664c-4da6-96eb-2ed19fbff09c": 1,
                                                              "cf77c04b-4f4f-4761-a8e9-273379859326": 1,
                                                              "24ea2cea-220f-4e07-87d8-df9287c39841": 1,
                                                              "f08247c8-615c-423c-ab69-f8fc0fbaa0eb": 1,
                                                              "1bd6898f-c90e-4773-8a9c-2f5c4357d01c": 1,
                                                              "72181eed-99ab-457a-96c9-560ac544d874": 1,
                                                              "2a8fc214-7692-4ab6-9b86-1b75b4a2311d": 1,
                                                              "8d5c7213-1b7a-46df-b152-283ba3f61b2a": 1,
                                                              "3ea6f00b-44de-4433-83f5-0766ce4d682b": 1,
                                                              "07d1e8e1-7807-411e-ac2c-2cba30d674cd": 1,
                                                              "6219b06f-5e12-4039-a558-1d89e551a8ae": 1,
                                                              "458e786e-aa99-4e9f-b673-26ecbad6b08a": 1,
                                                              "57a62c4d-954d-4dcc-aafb-fc871a0aa5d9": 1,
                                                              "21075cdd-4cc0-4971-b960-8373b1fe33c7": 1,
                                                              "f397c9eb-2f5c-461c-ad59-7085526a338c": 1,
                                                              "ed38ce74-39e7-4e19-816f-97503df50ce1": 1,
                                                              "57448e05-2c0f-443c-9c78-2387e911733b": 1,
                                                              "c245bd7b-0cc2-49de-bbde-1315899f0d11": 1,
                                                              "8a2b5a57-9b6f-4154-b2c2-25f92d91dbc1": 1,
                                                              "ba27eb96-b3af-436d-a5b8-c2e67e25b773": 1,
                                                              "475f86b5-20e0-4896-b260-de3a03d6ed77": 1,
                                                              "dd70a4bc-6cad-4b12-b508-bc9b5da19595": 1,
                                                              "35805483-ec33-4833-ae2c-13c592645ab7": 1,
                                                              "ba1f860e-6626-465f-9dfd-24d84d71e213": 1,
                                                              "df83ada7-bbc7-43a2-8148-ef4cc300753d": 1,
                                                              "210eedb7-7aa6-48eb-aac6-8a3c1805149f": 1,
                                                              "fabf0330-9bd5-4cb1-9906-3b4a450ed795": 1,
                                                              "8066cc91-153f-497e-a32c-4fec4c384268": 1,
                                                              "a0c92953-6d0f-457f-9f30-bea3534b2976": 1,
                                                              "f202810c-29c5-4603-9797-60dbd6a52546": 1,
                                                              "f41570be-4260-4966-ba1b-37bce68be360": 1,
                                                              "8149fbc4-3634-4b50-b914-41cb892c11b9": 1,
                                                              "851e6765-fa4c-4b12-a8d4-dfbcd127b4fa": 1,
                                                              "aa3cc232-a9d5-4d2c-9770-445cf0db7fad": 1,
                                                              "5c742167-bcc3-485a-bc84-18501fcb47b0": 1,
                                                              "c0d6a107-5f2b-4277-8b22-6420478b357a": 1,
                                                              "0a411a0c-cd3a-4104-af5b-29f7a935efc7": 1,
                                                              "b6ecc8f0-77e2-40b7-be4d-7360c4beaa3c": 1,
                                                              "e9c826a7-b2be-43d0-9273-1ba5f13240f3": 1,
                                                              "076a1cca-058a-46fe-8da3-a725de710409": 1,
                                                              "893adac6-ab3c-4c05-a738-3b61bea804ae": 1,
                                                              "bd24e68f-8619-49c7-aa11-99654d653c45": 1,
                                                              "057d2e72-5b59-4ed6-90f1-7dc66e59584d": 1,
                                                              "be306148-bba7-4ec1-8e2d-5241745675c2": 1,
                                                              "f7d56ac1-ead8-495d-8c82-a4d3a96f6044": 1,
                                                              "328180f6-824b-4c11-b9cd-0d6d70ffbd08": 1,
                                                              "2194f8f8-9559-4ba6-9d94-9e43e46d4551": 1,
                                                              "ca316a81-b73e-4c7c-a0e4-938834eaa7e2": 1,
                                                              "9ba48180-17e6-415e-930b-b4daed9d249e": 1,
                                                              "5582ece4-a374-4b61-acde-27669b1ecf12": 1,
                                                              "04a7569b-ae53-4024-a720-c2c074c1d49f": 1,
                                                              "4d8ede94-3cf7-49d4-8707-f81eb47b63a2": 1
                                                          },
                                                          "ndv": 131,
                                                          "unified_json_schema": null,
                                                          "col_type": "string"
                                                      },
                                                      "description": "The TV_SERIES_ID column serves as the unique identifier for each TV series in the database. This ID is essential for distinguishing between different series and is used to establish relationships with other related data, such as production companies, episodes, and seasons.",
                                                      "description_update_source": "generated",
                                                      "similarity_search_index_id": null,
                                                      "semantic_information": {
                                                          "semantic_type": "other",
                                                          "semantic_usage": "Used as a key to link TV series with their respective production companies and other related entities in the database."
                                                      },
                                                      "collation_name": null
                                                  },
                                                  {
                                                      "entity_type": "column",
                                                      "name": "PROD_COMP_ID",
                                                      "type": "TEXT",
                                                      "comment": null,
                                                      "sample_values": {
                                                          "values": {
                                                              "5f14fdb6-18d1-4c97-b4d1-881fab918aeb": 1,
                                                              "a94d748d-84f1-48eb-9e60-bcb801fc7d8d": 1,
                                                              "4c115a87-78b1-4311-b0e8-100268760c63": 1,
                                                              "19943234-50e9-4f34-a6ea-91f078317921": 1,
                                                              "3bc7d12e-5776-4c2c-947a-7bb77fc64d82": 1,
                                                              "7cd7609d-f265-4af5-a022-28ed67fb337d": 1,
                                                              "e0be95b4-ee4e-442e-a05a-f213693d737e": 1,
                                                              "deae797c-9eec-425e-81e5-7f8a3790c70e": 1,
                                                              "b934f2a4-7b0e-4176-80bb-aaa87bc75fec": 1,
                                                              "d5c4ee7f-9c37-4f12-9819-c72e202c9896": 1,
                                                              "0e7240ce-3549-48e2-82a1-48ddf15bc147": 1,
                                                              "268a7128-8048-491b-af14-95128b030700": 1,
                                                              "2c87409e-ea11-473b-8470-fc934cbd8466": 1,
                                                              "d36642d6-6574-4966-aa7b-87a59f81e359": 1,
                                                              "c9810698-12ab-4826-9ae8-6cf2effbf0df": 1,
                                                              "884a97e4-c1c0-420f-a0a5-27133f21bdfe": 1,
                                                              "e441f93b-a3af-43d0-87fc-31abdee2c9dd": 1,
                                                              "c4c3cb2f-b489-4af1-a6ef-de5f2261d9e7": 1,
                                                              "6c49e5ad-6c0b-4db1-b846-9dc75c791258": 1,
                                                              "b09366df-32b3-4c3e-a70a-ab903e8a2c82": 1,
                                                              "faa0b7fd-54ea-4ab6-bd1b-2d716179b788": 1,
                                                              "4e085dde-9715-4a69-ba18-e099f57837f6": 1,
                                                              "3bcf97fb-5c17-40f6-aca9-7d763312aafe": 1,
                                                              "3bc3a2d0-4cc7-4181-9793-88b14faea0f0": 1,
                                                              "31a9e822-58a0-46e0-90d3-990e3307256d": 1,
                                                              "478a2cf8-4bce-43b8-8439-caa888f6e1cd": 1,
                                                              "3276e773-cad7-41ba-a6fa-e77385a63043": 1,
                                                              "75c96a9c-beb4-4409-a1b6-7f9acfb2736d": 1,
                                                              "eb9ea62c-bdcb-4c21-94d8-aef188e12e49": 1,
                                                              "9c3d8bae-9b53-4376-9c6e-8024385bc77c": 1,
                                                              "af385424-20c1-49da-a411-3886003fa0dc": 1,
                                                              "9862ed80-73fc-40a5-8710-4865506abd2a": 1,
                                                              "4f0cb13a-0497-464f-9a3d-846b9886a0d5": 1,
                                                              "6747b93b-49b5-41c5-b0a5-6487297e433d": 1,
                                                              "b5022016-2cb3-43c2-a948-6d4dc1a468c1": 1,
                                                              "0ff440dd-033a-4af1-853d-f0ae464144f8": 1,
                                                              "50ddf845-31c8-4502-813a-fc5ba8424072": 1,
                                                              "61781bc1-8ef4-4504-b463-e6a70fdc7425": 1,
                                                              "9f8b51b8-4016-4181-8887-92af37f6722c": 1,
                                                              "63ae0b6c-e03b-4f4c-bb0b-08e99d5d6108": 1,
                                                              "b541b48d-1333-42a6-a150-e381f39d8177": 1,
                                                              "31a79a29-82f8-4bcf-835d-dc95db7167ad": 1,
                                                              "f046fe84-b3dd-4e58-ae50-b6f008318737": 1,
                                                              "5f943be9-f7c9-4414-b913-1fca10bac43d": 1,
                                                              "55e2228a-3ed9-4e3c-838b-24ea01d3184f": 1,
                                                              "8d176dc5-c6d2-481f-9b0b-67145cbb3280": 1,
                                                              "fbede218-bd66-4445-b322-8c49e02bccc8": 1,
                                                              "49068f0a-0718-4669-b691-81d3bf55a3e0": 1,
                                                              "7d3bc707-2a2b-4a94-b334-3a321cc46e5b": 1,
                                                              "50c26374-07a4-46e1-a000-e546860daf2b": 1,
                                                              "2dffa4ab-cfc8-42e4-b5f7-202925f53a98": 1,
                                                              "07a61f57-8b95-42b9-9987-2a0e35458517": 1,
                                                              "e96583a5-8be5-40b3-a046-8f92b21ed9c4": 1,
                                                              "218328c3-1e89-4ca8-b764-996834a47ba1": 1,
                                                              "5fe985fe-eac9-40ed-a445-2924b0ab3f73": 1,
                                                              "4a66d4e1-c8aa-4047-b190-9c9d9e947ae3": 1,
                                                              "d1275132-ca03-4b52-8e32-b3a6fb0f1019": 1,
                                                              "1a377287-fccd-4a0c-a7fb-08b47515ea6c": 1,
                                                              "61757008-9b19-442a-a42a-094b9557f7f6": 1,
                                                              "7f6565cf-dc4b-4475-9395-7dc6b12bdc00": 1,
                                                              "18214cd8-fa77-447e-b11e-578c32bcea21": 1,
                                                              "66ea4ccd-5198-4493-baee-bd47d78946f2": 1,
                                                              "8233eec3-5bdf-41a2-be85-494c315be2c2": 1,
                                                              "4f826ea8-6a06-4cc9-ba97-9b944ab81326": 1,
                                                              "4eb738ac-e2c2-4742-bbce-29965e2ee942": 1,
                                                              "697bebb5-66d8-4967-b32f-c320b8732eb2": 1,
                                                              "c7a339a8-38b1-4db3-acd4-27054a4ef970": 1,
                                                              "5689eca6-5adf-4da9-826a-9ae20353ed40": 1,
                                                              "5071175d-b415-4e57-94eb-942a1e39d249": 1,
                                                              "a7215b90-03ec-4e0d-a1ee-cd60c555fdab": 1,
                                                              "0240afc1-0557-43da-af07-806d63000341": 1,
                                                              "25d6ca81-6c05-4a1d-91d2-80cf29be9264": 1,
                                                              "c9e6383a-ebc2-4cc3-9f5b-32debb3ae697": 1,
                                                              "d93c5df9-aa66-4f81-8b6e-c8c50e506175": 1,
                                                              "3626bea3-c513-4468-bfdd-3cb2532d3695": 1,
                                                              "810ffbae-9e19-49c4-829b-3aa2ea28e2e5": 1,
                                                              "70f16b93-3aba-464a-86ed-5589f11e7c84": 1,
                                                              "1f000b1b-39e0-4852-8b8a-a209c7848da9": 1,
                                                              "5b533f69-f9ca-465a-82a2-dd49cc63cc50": 1,
                                                              "7f129ec6-6cf9-4b39-b491-7760f4820d60": 1,
                                                              "84328934-5cb0-4457-8089-317178e9dae9": 1,
                                                              "030d694c-48d6-49ed-b95c-79aa3569c30e": 1,
                                                              "0a211aa3-6cec-4375-a825-22adb3039b1f": 1,
                                                              "16656053-6eaa-4217-a3f3-a8d7b57b9910": 1,
                                                              "b8bfe9b3-5bef-4fc2-874a-7f44c438f523": 1,
                                                              "b414c174-4fa7-4584-ab5a-56ccc4c5f20d": 1,
                                                              "fdf43ef6-6080-428d-b7a9-c7ba4999890f": 1,
                                                              "cfa3cf7a-a4c1-49fb-ab9f-8f5c00e73826": 1,
                                                              "d118ef2a-0144-49bb-95a1-dca1258b9664": 1,
                                                              "ab72f968-9c67-46f8-8dcb-ed509af57322": 1,
                                                              "75106780-fd05-4c3b-821d-64e0256f5cd7": 1,
                                                              "4337cdc4-c676-4b4a-bdd7-2d2023482bfc": 1,
                                                              "46c09394-b117-4cff-802b-1ad480af747d": 1,
                                                              "bc29885c-06e5-4f4c-b5e7-cdf5b96e4409": 1,
                                                              "46d4eb7f-4871-43aa-a621-7322382476cc": 1,
                                                              "377888cd-8186-4340-b761-e4ed8683c4c9": 1,
                                                              "aa8c3cb1-9a15-456c-b1d6-1bbb54559e2a": 1,
                                                              "06644521-0a93-4d42-b411-8e52d792faeb": 1,
                                                              "5d85b79c-a092-4b50-a92c-5acb1f21b967": 1,
                                                              "327475eb-c514-450c-81c3-7731a7a0f914": 1
                                                          },
                                                          "ndv": 362,
                                                          "unified_json_schema": null,
                                                          "col_type": "string"
                                                      },
                                                      "description": "The PROD_COMP_ID column represents the unique identifier for each production company involved in the creation of a TV series. This identifier is crucial for linking production companies to their respective TV series, allowing for the tracking of contributions and collaborations in the television industry.",
                                                      "description_update_source": "generated",
                                                      "similarity_search_index_id": null,
                                                      "semantic_information": {
                                                          "semantic_type": "other",
                                                          "semantic_usage": "Used as a key to associate production companies with TV series, facilitating joins and lookups in queries."
                                                      },
                                                      "collation_name": null
                                                  }
                                              ],
                                              "comment": null,
                                              "last_altered_time": 1747843321.7521386,
                                              "refs": [],
                                              "constraints": [
                                                  {
                                                      "entity_type": "constraint",
                                                      "source": "inferred_llm",
                                                      "table": {
                                                          "table_name": "TV_SERIES_PRODUCTION_COMPANIES_BRIDGE",
                                                          "schema_name": "MOVIES_AND_TV",
                                                          "database_name": "MOVIE_DB"
                                                      },
                                                      "cols": [
                                                          "TV_SERIES_ID",
                                                          "PROD_COMP_ID"
                                                      ],
                                                      "constraint_type": "primary",
                                                      "relationship_type": null,
                                                      "description": null,
                                                      "frequency": -1,
                                                      "check_search_condition": null,
                                                      "src_table": null,
                                                      "src_cols": null,
                                                      "comment": null
                                                  },
                                                  {
                                                      "entity_type": "constraint",
                                                      "source": "database",
                                                      "table": {
                                                          "table_name": "PRODUCTION_COMPANIES",
                                                          "schema_name": "MOVIES_AND_TV",
                                                          "database_name": "MOVIE_DB"
                                                      },
                                                      "cols": [
                                                          "PROD_COMP_ID"
                                                      ],
                                                      "constraint_type": "foreign",
                                                      "relationship_type": null,
                                                      "description": null,
                                                      "frequency": 0,
                                                      "check_search_condition": null,
                                                      "src_table": {
                                                          "table_name": "TV_SERIES_PRODUCTION_COMPANIES_BRIDGE",
                                                          "schema_name": "MOVIES_AND_TV",
                                                          "database_name": "MOVIE_DB"
                                                      },
                                                      "src_cols": [
                                                          "PROD_COMP_ID"
                                                      ],
                                                      "comment": null
                                                  },
                                                  {
                                                      "entity_type": "constraint",
                                                      "source": "database",
                                                      "table": {
                                                          "table_name": "TV_SERIES",
                                                          "schema_name": "MOVIES_AND_TV",
                                                          "database_name": "MOVIE_DB"
                                                      },
                                                      "cols": [
                                                          "TV_SERIES_ID"
                                                      ],
                                                      "constraint_type": "foreign",
                                                      "relationship_type": null,
                                                      "description": null,
                                                      "frequency": 0,
                                                      "check_search_condition": null,
                                                      "src_table": {
                                                          "table_name": "TV_SERIES_PRODUCTION_COMPANIES_BRIDGE",
                                                          "schema_name": "MOVIES_AND_TV",
                                                          "database_name": "MOVIE_DB"
                                                      },
                                                      "src_cols": [
                                                          "TV_SERIES_ID"
                                                      ],
                                                      "comment": null
                                                  }
                                              ],
                                              "inferred_refs": [],
                                              "inferred_constraints": [],
                                              "description": "This table links production companies to TV series, allowing users to identify which companies are involved in the creation of specific shows, facilitating insights into production partnerships and industry collaborations.",
                                              "description_update_source": null,
                                              "virtual_view": false,
                                              "ddl": null
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