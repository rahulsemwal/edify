# edify
Edify is a light weighted web based online editor plugin for web apps, can be useful for developers, code content creators and educational purpose. Currently it supports HTML, JavaScript and CSS only. This editor is build on top of prismjs (https://prismjs.com/).  

# Demo
https://rahulsemwal.github.io/edify/examples/index.html

# Uses
- Step 1: Include all files from lib folder like prism.css, edify.css, prism.js and edify.js into your website.
- Step 2: Add below syntax into your website and enjoy writing HTML online with live preview.
  ``` 
  <edify language="html" preview="true"><h1>Hello edify!</h1></edify> 
  ```
- Step 3: Try other examples from examples/index.html and examples/sample/

# Documentation
## Syntax and Parameters
- Abbreviation
  * (D) = Default
  * [*] = Mandatory
- Syntax ``` <edify language="" preview="" execution="" target="" style=""></edify> ```
- Parameters
  * language  =  `"html" | "js" | "css"` [*]
  * preview   =  `"false" (D) | "true"` [*]
  * execution =  `"file-markup" | "markup" | "script-markup" | ""` [*]  
  * target    =  `"Filename with path"` [*] mandatory in case of execution == file-markup
  * target    =  `"Id of an element"` [*] mandatory in case of execution == markup | script-markup
  * target    =  `"Empty or target not defined"` not needed in case of execution == "" or exclude execution attribute from `<edify>`     
  * style     =  `"Any valid css"` which will be applied to the root element of the editor
  
## Features
- 

# Tasks
- [x] Task: Let's make it as generic plugin which can be used multiple times in any website and later on fix bugs - [FIXED]
- [x] BUG: changing #highlighting to .highlighting is changes format of editor, weird bug, need for generic - [FIXED]
- [x] BUG: when using multiple .live-boards all overrides previous one on browser due to absolute positioning. - [FIXED]
- [x] BUG: Written css under Edify is not scoped to preview block other wise it is applying to outside HTML - [FIXED iframe introduced]
- [x] BUG: External resorces line script, link, img etc are not loading inside iframe - [FiXED with Iframe after giving correct target according to the server root]  
- [x] BUG: optimize added css and think to use css as plugin, should be flexible for users, font family of Edify - [Done]
- [x] TASK: Let's create Editor's language as HTML/javacript/css in live board to make Editor available for all type of format - [DONE] 
- [x] TASK: Let's write generic and extensible (from outside) css for .live-board - [PENDING, take it in last]
- [x] TASK: let's create <Edify><Edify> custom tag which can further replaced by .live-board element. - [DONE]
- [x] TASK: Error handling of <edify> element with different attribute combinations - [Done] 
- [x] TASK: Manage height issue while preview is not available of top edify element [Done] 
- []  TASK: Code and file optimization [In progress]
