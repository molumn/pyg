# FEATURE

## IN-PROCESSING ALWAYS

 - HTML base tag to BASE UI Component (ex: [Button](./src/view/src/ui/Button.tsx), [Icon](./src/view/src/ui/Icon.tsx), [Text](./src/view/src/ui/Text.tsx)...)
 - Custom Theme (Hooks + Context vs ~~Dynamic Callback~~)

## TODO
> check is in-processing

 - [x] Better Workspace Manager
   - [ ] ~~Folder Structure~~ -> Category-Specific Structure
     - [ ] Characters Hierarchy
     - [ ] Plot Hierarchy
     - [ ] Scene Hierarchy
     - [ ] Timeline Hierarchy
     - [ ] Script Hierarchy
       - [ ] (Alternative) Algorithm Hierarchy
   - [x] Explicit Workspace Manager Flow (Including IPC and Renderer Flow)
   - [ ] Re-design [Workspace](./src/app/structure/workspace.ts)
 - [ ] Hooks
   - [x] DRY Hooks
   - [x] Separate Target-Specific Hooks and General Hooks
     - ~~general hooks  : useXXX~~
     - ~~specific hooks : occupyXXX~~
     - DELETED
 - [ ] Workspace
   - [ ] Create Workspace
   - [ ] Import Workspace
   - [ ] Plot System
     - [ ] Plot Editor

## FEATURED

 - [x] webkit title bar
 - [x] ipc abstraction : socket
 - [ ] Workspace
   - [x] File Selection
   - [x] File Editing
   - [x] File Saving
 - [x] Better Markdown Editor
