'use client';

import React, { useEffect, useMemo } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { renderToStaticMarkup } from '@emailstudio/email-builder';

import App from './App';
import { TEditorConfiguration } from './documents/editor/core';
import { resetDocument, setTemplateName, useDocument } from './documents/editor/EditorContext';
import { getTheme } from './theme';

export interface EmailEditorProps {
  configuration: TEditorConfiguration;
  onChange: (output: { html: string; json: TEditorConfiguration }) => void;
  onSave?: (output: { html: string; json: TEditorConfiguration; name: string }) => void;
  theme?: 'light' | 'dark';
  templateName?: string;
}

function EmailEditorInner({ configuration, onChange, onSave, theme: themeMode, templateName }: EmailEditorProps) {
  const document = useDocument();

  const htmlOutput = useMemo(() => {
    return renderToStaticMarkup(document, { rootBlockId: 'root' });
  }, [document]);

  const jsonOutput = useMemo(() => {
    return document;
  }, [document]);

  useEffect(() => {
    if (configuration) {
      resetDocument(configuration);
    }
  }, [configuration]);

  useEffect(() => {
    if (templateName) {
      setTemplateName(templateName);
    }
  }, [templateName]);

  useEffect(() => {
    onChange({ html: htmlOutput, json: jsonOutput });
  }, [htmlOutput, jsonOutput, onChange]);

  return <App onSave={onSave} templateName={templateName!} />;
}

export default function EmailEditor({
  configuration,
  onChange,
  onSave,
  theme: themeMode = 'light',
  templateName,
}: EmailEditorProps) {
  const currentTheme = useMemo(() => getTheme(themeMode), [themeMode]);

  return (
    <ThemeProvider theme={currentTheme}>
      <EmailEditorInner
        configuration={configuration}
        onChange={onChange}
        onSave={onSave}
        theme={themeMode}
        templateName={templateName}
      />
    </ThemeProvider>
  );
}
