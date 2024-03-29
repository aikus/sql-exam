import React, {useEffect, useState} from 'react';
import styled, { css } from 'styled-components'
import '../../styles/app.css';
import * as DOMPurify from "dompurify";
import {highlight} from "sql-highlight";
import { syntaxFieldHeight } from '../../config'

export const SyntaxHighlightingField = ({ elementRef, value, getValue }) => {
  const [highlightedCode, setHighlightedCode] = useState(' ');
  const [rawCode, setRawCode] = useState(value || ' ');
  const [fieldHeight, setFieldHeight] = useState(syntaxFieldHeight);

  useEffect(() => {
    value && highlightText(value);
  }, [value])

  const resizeHeight = (text) => {
    const numOfNewLines = text.split("\n").length;

    if (numOfNewLines > 4) {
      setFieldHeight(numOfNewLines * 24 + 30);
    }

    if (numOfNewLines <= 4 && fieldHeight > syntaxFieldHeight) {
      setFieldHeight(syntaxFieldHeight);
    }
  }

  const highlightText = (text) => {
    const { highlight } = require('sql-highlight');

    resizeHeight(text);

    if (text === '') {
      text = ' ';
    }

    if (text[text.length - 1] === "\n" && text.length > rawCode.length) {
      text += ' ';
    }

    let highlighted = highlight(text.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<"), { html: true });

    if (highlighted === '') {
      highlighted = text;
    }

    setHighlightedCode(highlighted);
    setRawCode(text);
    getValue && getValue(text);
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
    <Wrapper heightVal={fieldHeight}>
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
          if (e.key === 'Backspace') {
            setTimeout(() => {
              if (rawCode[rawCode.length - 1] === ' ' && rawCode[rawCode.length - 2] === '\n') {
                setRawCode((prevState) => {
                  const result = prevState.slice(0, -1);
                  resizeHeight(result);

                  return result;
                })
              }
            }, 0)
          }
        }}
        value={rawCode}
      ></TextArea>
      <CodeFieldWrapper
        ref={elementRef}
        aria-hidden="true"
      >
        <code dangerouslySetInnerHTML={{__html: sanitizer(highlightedCode)}} />
      </CodeFieldWrapper>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  position: relative;
  height: ${(props) => props.heightVal + 'px'};
`;

const sharedStyles = css`
  margin: 0;
  padding: 10px 10px 10px 0;
  border: 1px solid black;
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-family: monospace;
  line-height: 24px;
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
  white-space: pre;
  color: transparent;
  background: transparent;
  caret-color: black; 
  resize: none;
`;

const CodeFieldWrapper = styled.pre`
  ${sharedStyles};

  z-index: 0;
  
  & * {
    font-size: 18px;
    font-family: monospace;
    line-height: 24px;
    tab-size: 2;
  }
`;