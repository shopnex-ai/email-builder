# EmailEditor Module

A modular, reusable email editor component built with React and MUI.

## Installation

```bash
npm install @shopnex/editor-sample
```

## Usage

```tsx
import React, { useState } from 'react';
import { EmailEditor, TEditorConfiguration } from '@shopnex/editor-sample';

function MyApp() {
  const [htmlOutput, setHtmlOutput] = useState('');
  const [jsonOutput, setJsonOutput] = useState<TEditorConfiguration>({});
  
  const configuration: TEditorConfiguration = {
    root: {
      type: 'EmailLayout',
      data: {
        backdropColor: '#F8F8F8',
        canvasColor: '#FFFFFF',
        textColor: '#242424',
        fontFamily: 'MODERN_SANS',
        childrenIds: []
      }
    }
  };

  const handleChange = ({ html, json }: { html: string; json: TEditorConfiguration }) => {
    console.log('Updated HTML:', html);
    console.log('Updated JSON:', json);
    setHtmlOutput(html);
    setJsonOutput(json);
  };

  return (
    <EmailEditor 
      configuration={configuration}
      onChange={handleChange}
    />
  );
}
```

## Props

### EmailEditor

| Prop | Type | Description |
|------|------|-------------|
| `configuration` | `TEditorConfiguration` | Initial email template configuration |
| `onChange` | `(output: { html: string; json: TEditorConfiguration }) => void` | Callback fired when HTML or JSON output changes |

## Features

- Visual email editor with drag-and-drop interface
- Real-time HTML and JSON output
- Undo/Redo functionality
- Mobile and desktop preview modes
- Configurable blocks: Text, Image, Button, Container, etc.
- Import/Export JSON templates

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Type Definitions

The module exports the following types:
- `EmailEditorProps`: Props interface for the EmailEditor component
- `TEditorConfiguration`: Configuration object structure
- `TEditorBlock`: Individual block configuration structure
