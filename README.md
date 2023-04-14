# `<edify>`
Edify is a basic, light weighted web based online editor plugin for web apps, can be useful for developers, code content creators and educational purpose. Currently it supports HTML, JavaScript and CSS languages only. This editor is build on top of prismjs (https://prismjs.com/) code highlighting library.  

# Demo
https://rahulsemwal.github.io/edify/examples/index.html

# Uses [It's so easy to use! atleast give it a try]
- Step 1: Include all files from lib folder like prism.css, edify.css, prism.js and edify.js into your website.
- Step 2: Add below syntax into your website and enjoy writing HTML online with live preview.
  ``` 
  <edify language="html" preview="true"><h1>Hello edify!</h1></edify> 
  ```
- Step 3: Try out [Demo](#demo) above and explore code in examples/index.html and examples/sample/

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
- Exposed CSS classes
  * .live-board : Edify build upon strong principle of customization, below are some exposed classes where we can modify it's dimentions and look n feel.
  * Width of edify: .live-board  { width : <custom width parameter> }
  * Height of edify: .live-board { height : <custom height parameter> }
  * Font family edify: .live-board { font-family: <custom font family> } 
  * Width of edify's editor panel: .live-board .left { flex : <custom width parameter or percentage> }
  * Width of edify's result panel: .live-board .right { flex : <custom width parameter or percentage> }
  * Font family edify's editor: .editing, pre[class*=language-].highlighting, pre[class*=language-].highlighting * { font-family: <custom font family> }   
  
## Features
- Language : It supports `HTML`, `JavaScript` and `CSS`.
- Preview: It has result panel which simultaneously load latest edited data in edify editor. if preview attribute becomes false or "" (empty) then edify editor loads independently and takes result space as well.
-  Theme: Currently Edify supports `Tomorrow Night` prismjs theme, @ref: https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript&plugins=normalize-whitespace

# Tasks
- [x] Task: Let's make it as generic plugin which can be used multiple times in any website and later on fix bugs - [FIXED]
- [x] BUG: changing #highlighting to .highlighting is changes format of editor, weird bug, need for generic - [FIXED]
- [x] BUG: when using multiple .live-boards all overrides previous one on browser due to absolute positioning. - [FIXED]
- [x] BUG: Written css under Edify is not scoped to preview block other wise it is applying to outside HTML - [FIXED iframe introduced]
- [x] BUG: External resorces line script, link, img etc are not loading inside iframe - [FiXED with Iframe after giving correct target according to the server root]  
- [x] BUG: optimize added css and think to use css as plugin, should be flexible for users, font family of Edify - [Fixed]
- [x] TASK: Let's create Editor's language as HTML/JavaScript/CSS in live board to make Editor available for all type of format - [DONE] 
- [x] TASK: Let's write generic and extensible (from outside) css for .live-board - [Done]
- [x] TASK: let's create `<Edify><Edify>` custom tag which can further replaced by .live-board element. - [DONE]
- [x] TASK: `<edify language="html" preview="true" execution="file-markup" target="../../index.html" style="height:200px"></edify>` will be replaced by `<div class="live-board"></div>` [DONE]   
- [x] TASK: Error handling of <edify> element with different attribute combinations - [Done] 
- [x] TASK: Manage height issue while preview is not available of top edify element [Done] 
- [ ] TASK: Code and file optimization [In progress]
- [ ] TASK: addons feature plugins like: 
  * [ ] genric plugin/addons builder, 
  * [ ] advanced indentation engine for markups taking extra indent during initial loads, 
  * [ ] `ctrl + /` comment plugin, 
  * [ ] Preview debouncing plugin
- [ ] TASK: Create custom theme by extracting all colors from `edify.css` and check for other prism theme
- [ ] TASK: Provide support for other languages apart from `HTML`, `JS` and `CSS`.

# Contribution
  - I would love to welcome more contributors to make it even richer than it is today.
  - Contribution is so simple. First take a fork, go through the documentation above, work on pending tasks or create issue and at last give a pull request. that's all.
  - Once you take fork then you need to run a server at root folder of the project and access examples/index.html over browser through localhost.
  - Server: `google 200 ok`, `node http` or any server which launch `localhost`. 
  - I am always open for the communication and I would prefer to communicate on github issue chat or on my linked-in chat (https://www.linkedin.com/in/rahul-semwal/).  
  
# References
  - https://prismjs.com/
  - https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/ 
