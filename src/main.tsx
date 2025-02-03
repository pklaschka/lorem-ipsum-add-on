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

let closeFunction = () => {};

export const App = () => {
  const [textType, setTextType] = useState("TBD");
  async function getTextType() {
    const runtime = await getRuntime();
    setTextType(await runtime.determineTextNodeType());
    // setTextType("Hello World");
  }

  useEffect(() => {}, []);
  return (
    <>
      <Provider theme={expressTheme} colorScheme="light" scale="medium">
        <View paddingX={"size-200"} backgroundColor={"gray-50"}>
          <Heading level={1}>Lorem Ipsum</Heading>
          <Text>
            Fills selected text element(s) with placeholder text.
          </Text>
          <Flex direction="column" gap="size-200">
            <Picker label="Placeholder Text" width={"100%"} selectedKey={"1"}>
              <Item key="1">Words</Item>
              <Item key="2">Sentences</Item>
            </Picker>
            <Picker
              label="End with punctuation mark"
              width={"100%"}
              selectedKey={"1"}
            >
              <Item key="1">None</Item>
              <Item key="2">Period ('.')</Item>
              <Item key="3">Question mark ('?')</Item>
              <Item key="4">Exclamation mark ('!')</Item>
            </Picker>
            <Checkbox>Include line breaks</Checkbox>
          </Flex>
          <Flex
            direction="row"
            gap="size-100"
            justifyContent={"end"}
            marginY={"size-200"}
          >
            <Button
              variant="cta"
              onPress={() => {
                ToastQueue.positive("Placeholder text inserted.", {
                  timeout: 2600,
                });
                // ToastQueue.negative("No text nodes were selected.", {
                //   timeout: 3200,
                // });
                // closeFunction();
                // closeFunction = ToastQueue.neutral(
                //   "Point text selected If your selected layer is a point text layer, the plugin cannot ascertain its height. Therefore, we will produce two words appropriate for links or buttons. To obtain additional words, please choose a text layer with a defined height.",
                // );
              }}
            >
              Insert Placeholder Text
            </Button>
          </Flex>
        </View>
        <ToastContainer />
      </Provider>
    </>
  );
};
