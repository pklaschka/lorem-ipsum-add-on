import React, { useEffect, useState } from "react";
import { getRuntime } from "./utils/utils";
import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Item,
  Picker,
  Provider,
  Text,
  View,
} from "@adobe/react-spectrum";
import { theme as expressTheme } from "@react-spectrum/theme-express";
import { ToastContainer, ToastQueue } from "@react-spectrum/toast";
import {
  DEFAULT_PLACEHOLDER_TEXT,
  PlaceholderTextPicker,
} from "./components/placeholder-text-picker";

import * as feedback from "./feedback";
import type { FeedbackKey } from "../src-code/code";
import { LoremIpsumOptions } from "../src-code/placeholder-text/get-placeholder-text";

let closeFunction = () => {};

export const App = () => {
  const [textType, setTextType] = useState("TBD");
  async function getTextType() {
    const runtime = await getRuntime();
    setTextType(await runtime.determineTextNodeType());
    // setTextType("Hello World");
  }

  const [text, setText] = useState(DEFAULT_PLACEHOLDER_TEXT);
  const [punctuation, setPunctuation] = useState("");
  const [includeLineBreaks, setIncludeLineBreaks] = useState(false);

  async function onInsertPlaceholderText() {
    const runtime = await getRuntime();
    const result = await runtime.insertPlaceholderText(
      {
        text,
        punctuation,
        includeLineBreaks,
      } satisfies LoremIpsumOptions,
    );
    feedback[result]();
  }

  return (
    <>
      <Provider theme={expressTheme} colorScheme="light" scale="medium">
        <View paddingX={"size-200"} backgroundColor={"gray-50"}>
          <Heading level={1}>Lorem Ipsum</Heading>
          <Text>
            Fills selected text element(s) with placeholder text.
          </Text>
          <Flex direction="column" gap="size-200">
            <PlaceholderTextPicker text={text} setText={setText} />
            <Picker
              label="End with punctuation mark"
              width={"100%"}
              selectedKey={punctuation}
              onSelectionChange={(value) => {
                setPunctuation("" + value);
              }}
            >
              <Item key="">None</Item>
              <Item key=".">Period ('.')</Item>
              <Item key="?">Question mark ('?')</Item>
              <Item key="!">Exclamation mark ('!')</Item>
            </Picker>
            <Checkbox
              isSelected={includeLineBreaks}
              onChange={setIncludeLineBreaks}
            >
              Include line breaks
            </Checkbox>
          </Flex>
          <Flex
            direction="row"
            gap="size-100"
            justifyContent={"end"}
            marginY={"size-200"}
          >
            <Button variant="cta" onPress={onInsertPlaceholderText}>
              Insert Placeholder Text
            </Button>
          </Flex>
        </View>
        <ToastContainer />
      </Provider>
    </>
  );
};
