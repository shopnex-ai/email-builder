import React, { useMemo } from 'react';

import { MonitorOutlined, PhoneIphoneOutlined, Save } from '@mui/icons-material';
import {
  Box,
  Stack,
  SxProps,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  IconButton,
  useTheme,
  Input,
} from '@mui/material';
import { Reader, renderToStaticMarkup } from '@emailstudio/email-builder';

import EditorBlock from '../../documents/editor/EditorBlock';
import {
  setSelectedScreenSize,
  setTemplateName,
  useDocument,
  useSelectedMainTab,
  useSelectedScreenSize,
  useTemplateName,
} from '../../documents/editor/EditorContext';
import { TEditorConfiguration } from '../../documents/editor/core';
import ToggleInspectorPanelButton from '../InspectorDrawer/ToggleInspectorPanelButton';

import DownloadJson from './DownloadJson';
import HtmlPanel from './HtmlPanel';
import ImportJson from './ImportJson';
import JsonPanel from './JsonPanel';
import MainTabsGroup from './MainTabsGroup';
import ShareButton from './ShareButton';
import UndoRedo from './UndoRedo';

export default function TemplatePanel({
  onSave,
  templateName,
}: {
  onSave?: (output: { html: string; json: TEditorConfiguration; name: string }) => void;
  templateName: string;
}) {
  const theme = useTheme();
  const document = useDocument();
  const selectedMainTab = useSelectedMainTab();
  const selectedScreenSize = useSelectedScreenSize();
  const currentTemplateName = useTemplateName();

  const htmlOutput = useMemo(() => {
    return renderToStaticMarkup(document, { rootBlockId: 'root' });
  }, [document]);

  const handleSave = () => {
    if (onSave) {
      onSave({
        html: htmlOutput,
        json: document,
        name: currentTemplateName,
      });
    }
  };

  let mainBoxSx: SxProps = {
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  };
  if (selectedScreenSize === 'mobile') {
    mainBoxSx = {
      ...mainBoxSx,
      margin: '32px auto',
      width: 370,
      height: 800,
      boxShadow: theme.shadows[2],
      borderRadius: 1,
    };
  }

  const handleScreenSizeChange = (_: unknown, value: unknown) => {
    switch (value) {
      case 'mobile':
      case 'desktop':
        setSelectedScreenSize(value);
        return;
      default:
        setSelectedScreenSize('desktop');
    }
  };

  const renderMainPanel = () => {
    switch (selectedMainTab) {
      case 'editor':
        return (
          <Box sx={mainBoxSx}>
            <EditorBlock id="root" />
          </Box>
        );
      case 'preview':
        return (
          <Box sx={mainBoxSx}>
            <Reader document={document} rootBlockId="root" />
          </Box>
        );
      case 'html':
        return <HtmlPanel />;
      case 'json':
        return <JsonPanel />;
    }
  };

  return (
    <>
      <Stack
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: theme.palette.background.paper,
          position: 'sticky',
          top: 0,
          zIndex: 'appBar',
          px: 1,
        }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box />
        <Stack px={2} direction="row" gap={2} width="100%" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2}>
            <MainTabsGroup />
            <Input
              placeholder="Email template..."
              value={currentTemplateName}
              onChange={(e) => {
                setTemplateName(e.target.value);
              }}
              disableUnderline
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <UndoRedo />
            {onSave && (
              <Tooltip title="Save">
                <IconButton size="small" onClick={handleSave}>
                  <Save fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <DownloadJson />
            <ImportJson />
            <ToggleButtonGroup value={selectedScreenSize} exclusive size="small" onChange={handleScreenSizeChange}>
              <ToggleButton value="desktop">
                <Tooltip title="Desktop view">
                  <MonitorOutlined fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="mobile">
                <Tooltip title="Mobile view">
                  <PhoneIphoneOutlined fontSize="small" />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
            <ShareButton />
          </Stack>
        </Stack>
        <ToggleInspectorPanelButton />
      </Stack>
      <Box
        sx={{
          height: 'calc(100vh - 49px)',
          overflow: 'auto',
          minWidth: 370,
          backgroundColor: theme.palette.background.default,
        }}
      >
        {renderMainPanel()}
      </Box>
    </>
  );
}
