# DragDropBgEditor Components Documentation

### Note: Incomplete and perhaps not 100% accurate

## Overview

The `DragDropBgEditor` and its related components provide a flexible and interactive way to manage and edit answer zones in a drag-and-drop interface. These components allow users to set backgrounds, create answer zones, and handle possible answers within an editor canvas.

## Components

### DragDropBgEditor

The `DragDropBgEditor` component is the main component that provides the interface for selecting a background type (text or image), choosing a canvas shape, and adding answer zones.

### EditorCanvas

The `EditorCanvas` component represents the canvas area where answer zones and possible answers are managed and displayed. It supports adding, editing, and deleting answer zones as well as managing possible answers.


### AnswerZone

The `AnswerZone` component represents an individual answer zone that can display images or text answers. It also includes buttons for settings and adding new answers.

### AnswerZoneSettingsForm

The `AnswerZoneSettingsForm` component provides a form interface for editing the settings of an answer zone.


### NewAnswerZoneFlow

The `NewAnswerZoneFlow` component provides the interface for creating a new answer zone.

### PossibleAnswers

The `PossibleAnswers` component displays a list of possible answers that can be edited.


## Context

### AnswerZonesContext

The `AnswerZonesContext` provides the context for managing the answer zones within the `DragDropBgEditor`.

## Hooks

### useAnswerZones

The `useAnswerZones` hook provides functions and state management for handling answer zones within the `DragDropBgEditor`.
