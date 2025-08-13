import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import { CssBaseline, Switch, FormControlLabel, Box, Typography } from '@mui/material';

import { TEditorConfiguration } from './documents/editor/core';
import EmailEditor from './EmailEditor';
import getConfiguration from './getConfiguration';

function Demo() {
  const configuration = getConfiguration('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleChange = ({ html, json }: { html: string; json: TEditorConfiguration }) => {
    console.log('HTML updated:', html);
    console.log('JSON updated:', json);
  };

  const handleSave = ({ html, json, name }: { html: string; json: TEditorConfiguration; name: string }) => {
    console.log('Save triggered!');
    console.log('HTML to save:', html);
    console.log('JSON to save:', json);
    console.log('Name to save:', name);
    alert('Email saved successfully! Check console for details.');
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Email Editor Demo - Enhanced with Save & Theme Support
        </Typography>
        <FormControlLabel
          control={<Switch checked={theme === 'dark'} onChange={handleThemeToggle} color="primary" />}
          label="Dark Theme"
          sx={{ mb: 1 }}
        />
      </Box>
      <EmailEditor configuration={configuration} onChange={handleChange} onSave={handleSave} theme={theme} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>
);
