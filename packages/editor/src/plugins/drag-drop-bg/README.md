# DragDropBgEditor Components Documentation

### Note: Incomplete and perhaps not 100% accurate

## Overview

The `DragDropBgEditor` and its related components provide a flexible and interactive way to manage and edit answer zones in a drag-and-drop interface. These components allow users to set backgrounds, create answer zones, and handle possible answers within an editor canvas.

## Components

### DragDropBgEditor

The `DragDropBgEditor` component is the main component that provides the interface for selecting a background type (text or image), choosing a canvas shape, and adding answer zones.

#### Props

- `state`: The state object containing the background image, background type, canvas shape, and answer zones.
- `id`: A unique identifier for the editor instance.

### EditorCanvas

The `EditorCanvas` component represents the canvas area where answer zones and possible answers are managed and displayed. It supports adding, editing, and deleting answer zones as well as managing possible answers.

#### Props

- `state`: The state object containing the answer zones, background image, and extra draggable answers.

### AnswerZone

The `AnswerZone` component represents an individual answer zone that can display images or text answers. It also includes buttons for settings and adding new answers.

#### Props

- `answerZone`: The answer zone object containing its properties.
- `onClickSettingsButton`: Function to handle the click event on the settings button.
- `onClickPlusButton`: Function to handle the click event on the plus button.
- `getAnswerZoneImageSrc`: Function to get the image source URL for an answer zone.
- `getAnswerZoneText`: Function to get the text content for an answer zone.
- `onChangeDimensions`: Function to handle dimension changes.

### AnswerZoneSettingsForm

The `AnswerZoneSettingsForm` component provides a form interface for editing the settings of an answer zone.

#### Props

- `answerZone`: The current answer zone being edited.
- `onDuplicate`: Function to handle the duplication of an answer zone.
- `onDelete`: Function to handle the deletion of an answer zone.

### NewAnswerZoneFlow

The `NewAnswerZoneFlow` component provides the interface for creating a new answer zone.

#### Props

- `zoneId`: The ID of the new answer zone.

### PossibleAnswers

The `PossibleAnswers` component displays a list of possible answers that can be edited.

#### Props

- `onClickEdit`: Function to handle the click event for editing a possible answer.
- `canEdit`: Boolean indicating whether the answers can be edited.
- `possibleAnswers`: Array of possible answers to display.

### WrongAnswerFlow

The `WrongAnswerFlow` component provides the interface for creating or editing wrong answers.

#### Props

- `newWrongAnswer`: The current wrong answer being edited.

### ModalWithCloseButton

The `ModalWithCloseButton` component is a modal dialog with a close button.

#### Props

- `isOpen`: Boolean indicating whether the modal is open.
- `onCloseClick`: Function to handle the click event for closing the modal.
- `className`: Additional CSS classes for styling the modal.

## Context

### AnswerZonesContext

The `AnswerZonesContext` provides the context for managing the answer zones within the `DragDropBgEditor`.

## Hooks

### useAnswerZones

The `useAnswerZones` hook provides functions and state management for handling answer zones within the `DragDropBgEditor`.
