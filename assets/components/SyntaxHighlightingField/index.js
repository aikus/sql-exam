import React, { useState } from 'react';
import styled, { css } from 'styled-components'
import '../../styles/app.css';
import * as DOMPurify from "dompurify";
import {highlight} from "sql-highlight";

export const SyntaxHighlightingField = ({ elementRef, value, getValue, getRawValue }) => {
  const [code, setCode] = useState(value || '');

  const highlightText = (text) => {
    const { highlight } = require('sql-highlight');

    if (text[text.length - 1] === "\n") {
      text += " ";
    }

    let highlighted = highlight(text, {html: true});

    if (highlighted === '') {
      highlighted = text;
    }

    setCode(highlighted);
    getValue && getValue(highlighted);
    getRawValue && getRawValue(text);
  }

  const syncScroll = (element) => {
    elementRef.current.scrollTop = element.scrollTop;
    elementRef.current.scrollLeft = element.scrollLeft;
  }

  const checkTab = (element, event) => {
    const text = element.value;
    if (event.key === "Tab") {
      event.preventDefault();

      const before_tab = text.slice(0, element.selectionStart);
      const after_tab = text.slice(element.selectionEnd, element.value.length);
      const cursor_pos = element.selectionEnd + 1;

      element.value = before_tab + "\t" + after_tab;
      element.selectionStart = cursor_pos;
      element.selectionEnd = cursor_pos;

      highlightText(element.value);
    }
  }

  const sanitizer = DOMPurify.sanitize;

  return (
    <Wrapper>
      <TextArea
        spellCheck="false"
        onInput={(e) => {
          highlightText(e.target.value);
          syncScroll(e.target);
        }}
        onScroll={(e) => {
          syncScroll(e.target);
        }}
        onKeyDown={(e) => {
          checkTab(e.target, e);
        }}
      ></TextArea>
      <CodeFieldWrapper
        ref={elementRef}
        aria-hidden="true"
      >
        <code dangerouslySetInnerHTML={{__html: sanitizer(code)}} />
      </CodeFieldWrapper>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  position: relative;
  height: 150px;
`;

const sharedStyles = css`
  margin: 0;
  padding: 10px;
  border: 1px solid black;
  width: 100%;
  height: 100%;
  font-size: 15pt;
  font-family: monospace;
  line-height: 20pt;
  position: absolute;
  top: 0;
  left: 0;
  tab-size: 2;
  overflow: auto;
  box-sizing: border-box;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  ${sharedStyles};

  z-index: 1;
  white-space: nowrap;
  color: transparent;
  background: transparent;
  caret-color: black; 
  resize: none;
`;

const CodeFieldWrapper = styled.pre`
  ${sharedStyles};

  z-index: 0;
  
  & * {
    font-size: 15pt;
    font-family: monospace;
    line-height: 20pt;
    tab-size: 2;
  }
`;