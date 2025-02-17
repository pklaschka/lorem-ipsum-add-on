import addOnSandboxSdk from "add-on-sdk-document-sandbox";

import { constants, editor, Node, TextNode } from "express-document-sdk";

const { runtime } = addOnSandboxSdk.instance;

import * as feedback from "../src/feedback";
import {
  generatePlaceholderText,
  LoremIpsumOptions,
} from "./placeholder-text/get-placeholder-text";
import { insertPlaceholderTextToAutoHeightTextNode } from "./placeholder-text/auto-height-text";

export type FeedbackKey = keyof typeof feedback;

// console.log("Sandbox code is running nowww");

const sandboxApi = {
  insertPlaceholderText(
    loremIpsumOptions: LoremIpsumOptions,
  ): FeedbackKey {
    const { pointTextNodes, autoHeightTextNodes } = getTextNodesByType();

    if (pointTextNodes.length + autoHeightTextNodes.length === 0) {
      return "noTextNodes";
    }

    for (const pointTextNode of pointTextNodes) {
      pointTextNode.fullContent.text = generatePlaceholderText(
        2,
        loremIpsumOptions,
      );
    }

    for (const autoHeightNode of autoHeightTextNodes) {
      insertPlaceholderTextToAutoHeightTextNode(
        autoHeightNode,
        loremIpsumOptions,
      );
    }

    if (pointTextNodes.length > 0) {
      return "containsPointText";
    }

    return "success";
  },
  determineTextNodeType() {
    const selection = editor.context.selection.filter(isTextNode);
    if (selection.length === 0) {
      return "No text node selected";
    }
    return `Text node type: ${
      isLikePointText(selection[0]) ? "Point Text" : "Auto Height Text"
    }`;
  },
};

export type SandboxRemoteType = typeof sandboxApi;

/**
 * Categorizes the selection and returns arrays of point text nodes and
 * auto height text nodes
 * @returns an object with two arrays of text nodes, one for point text
 * nodes and one for auto height text nodes.
 */
function getTextNodesByType() {
  const selection = editor.context.selection.filter(isTextNode);
  let pointTextNodes: TextNode[] = [];
  let autoHeightTextNodes: TextNode[] = [];

  for (const node of selection) {
    if (isLikePointText(node)) {
      pointTextNodes.push(node);
    } else {
      autoHeightTextNodes.push(node);
    }
  }
  return { pointTextNodes, autoHeightTextNodes };
}

/**
 * Determines if the passed node is a `TextNode`
 * @param node
 * @returns `true` if the node is a `TextNode`, `false` otherwise
 */
function isTextNode(node: Node): node is TextNode {
  return node.type === constants.SceneNodeType.text;
}

/**
 * Checks if a given text node is like a point text.
 * This is the case if the height of the text node does not increase with text.
 * In this case, the amount of placeholder text cannot be determined by the height of the text node.
 * @param textNode a text node to check
 * @returns `true` if the text node is like a point text, `false` otherwise
 */
function isLikePointText(textNode: TextNode) {
  const prevHeight = textNode.boundsLocal.height;
  const prevText = textNode.fullContent.text;

  textNode.fullContent.text = "fjo23qj9o23jro23jfo23jfo23jfo23f".repeat(10);

  const newHeight = textNode.boundsLocal.height;

  let changedWidthAtSomePoint = doesWidthChangeWithText(textNode);

  textNode.fullContent.text = prevText;

  return (changedWidthAtSomePoint || prevHeight === newHeight);
}

/**
 * Checks if the width of a text node changes with text. This is the case for:
 * - Point Text
 * - Dynamic Text (but only sometimes / for specific combinations of text)
 * - "Text Layouts" (circle, arch, bow)
 *
 * In these cases, we cannot rely on the height of the text node to monotonically increase with text.
 *
 * @param textNode text node to check
 * @param maxIterations iterations to check with (needed for dynamic layouts that only change sometimes)
 * @returns `true` if the width changes with text, `false` otherwise
 */
function doesWidthChangeWithText(textNode: TextNode, maxIterations = 10) {
  const prevWidth = textNode.boundsLocal.width;

  for (let i = 0; i < maxIterations; i++) {
    textNode.fullContent.text += " fjo23qj9o23jro23jfo23 jfo23jfo23f";
    if (textNode.boundsLocal.width !== prevWidth) {
      return true;
    }
  }
  return false;
}

async function start() {
  runtime.exposeApi(sandboxApi);
}

start();
