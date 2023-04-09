//@Note: Indentation problem coming with prism.css but style2.css works fine with indentation (done by webCoder) - [FIXED]
//@Note: Let's make it as generic plugin which can be used multiple times in any website and later on fix bugs - [FIXED]
//@BUG: changing #highlighting to .highlighting is changes format of editor, weird bug, need for generic - [FIXED]
//@BUG: when using multiple .live-boards all overrides previous one on browser due to absolute positioning. - [FIXED]
//@BUG: Written css under Edify is not scoped to preview block other wise it is applying to outside HTML - [FIXED iframe introduced]
//@BUG: External resorces line script, link, img etc are not loading inside iframe - [FiXED with Iframe after giving correct target according to the server root]  
//[ACTIVE]//@BUG: optimize added css and think to use css as plugin, should be flexible for users, font family of Edify - [IN PROGRESS]
//@TASK: Let's create Editor's language as HTML/javacript/css in live board to make Editor available for all type of format - [DONE] 
//@TASK: Let's write generic and extensible (from outside) css for .live-board - [PENDING, take it in last]
//@TASK: let's create <Edify><Edify> custom tag which can further replaced by .live-board element. - [DONE]
//@TASK: Error handling of <edify> element with different attribute combinations - [Done] 
//[Active]@TASK: Manage height issue while preview is not available of top edify element [In Progress] 
//@TASK: Code and file optimization
//@TASK: Setup git repo and put all the past task either in readme or Task.txt file upload to git
//@Note: <Edify language="html" preview="true" execution="file-markup" target="../../index.html"/> will be replaced by <div class="live-board"> [DONE]
//@Note: Load external resources synchronously withing editor or create a Edify.loader or use single html file to do it.



/*@DOCS: Edify currently supports HTML, JS, CSS language type
@Abriviation
@(D) = Default
@Tag <edify language="" preview="" execution="" target=""></edify> 
@Params[*] language as languageType  = html (D) | js | css
@Params preview as isPreview  = false (D) | true 
@Params execution as execution  = file-markup | markup | script-markup | default = ""  
@Params target as target  =  'filename with path' [*] mandatory in case of execution == file-markup
@Params target as target  =  'id of an element' [*] mandatory in case of execution == markup | script-markup
@Params style  as style   =  any valid css styles which will apply to parent's element of the editor
@Params */
(function(){
  function Edify(element){
    /*  Input: <edify language="js" preview="true" execution="file-markup" target="../../js/main.js" style=""></edify>
        Input: <edify language="html" preview="true" execution="file-markup" target="../../index.html"></edify>
        Input: <edify language="html" preview="true" execution="markup" target="markup1"></edify>
        Input: <edify language="html" preview="true" execution="script-markup" target="markup2""></edify>
        Input: <edify language="html" preview="true">
    */
  
    // inheritance
    LiveBoard.call(this, element); 
  
    // public 
    const vm = this;
    
    //@Exposed or Public Methods
    vm.run = run;
    
    //private 
    const pm = new Object();
    const el = vm.liveBoard;// .live-board[i] element
  
    //@Private Methods
    pm.update = update;
    pm.sync_scroll = sync_scroll;
    pm.check_tab = check_tab;
    pm.loadFile = loadFile;
    pm.push = push;
    pm.previewResult = previewResult;
    pm.isValid = isValid;
    pm.taskManager = taskManager;
  
    //init
    (function init(){
      if(vm.attrs.errorResponse.status) return false;
      pm.editing = el.getElementsByTagName("textArea")[0]; // TextArea
      pm.highlighting = el.getElementsByTagName("pre")[0]; // Pre
      pm.highlighting_content = el.getElementsByTagName("code")[0]; // Code
      pm.preview = el.getElementsByClassName('preview')[0]; // div.preview 
      //@Attach Events
      pm.editing.addEventListener('input', function(event) { pm.update(pm.editing.value); pm.sync_scroll(); }, false);
      pm.editing.addEventListener('scroll', function(event) { pm.sync_scroll(); }, false);
      pm.editing.addEventListener('keydown', function(event) { pm.check_tab(event); }, false);
    })();
  
    function update(text) {
      let result_element = pm.highlighting_content;
      // Handle final newlines (see article)
      if(text[text.length-1] == "\n") {
        text += " ";
      }
      // Update code
      result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
      // Syntax Highlight
      Prism.highlightElement(result_element);
      pm.taskManager({task:'update', status:'done'}); // added by Rahul
    }
    
    function sync_scroll() {
      /* Scroll result to scroll coords of event - sync with textarea */
      let result_element = pm.highlighting;
      // Get and set x and y
      result_element.scrollTop = pm.editing.scrollTop;
      result_element.scrollLeft = pm.editing.scrollLeft;
    }
    
    function check_tab(event) {
      let code = pm.editing.value;
      if(event.key == "Tab") {
        /* Tab key pressed */
        event.preventDefault(); // stop normal
        let before_tab = code.slice(0, pm.editing.selectionStart); // text before tab
        let after_tab = code.slice(pm.editing.selectionEnd, pm.editing.value.length); // text after tab
        let cursor_pos = pm.editing.selectionStart + 1; // where cursor moves after tab - moving forward by 1 char to after tab
        pm.editing.value = before_tab + "\t" + after_tab; // add tab char
        // move cursor
        pm.editing.selectionStart = cursor_pos;
        pm.editing.selectionEnd = cursor_pos;
        pm.update(pm.editing.value); // Update text to include indent
      }
    }
    
    function loadFile(fileName){
      return fetch(fileName)
      .then(response=> response.text())
      .then(text=> {
        return text;
      });
    }
  
    function run(){
      if(!pm.isValid()){
        return false;
      }  
      pm.push();
    }
    
    function push(){
      const onInputEvent = new Event('input', { bubbles: true });
      const onScrollEvent = new Event('scroll', { bubbles: true });
      const onKeyDownEvent = new Event('keydown', { bubbles: true });
      switch(vm.attrs.execution){
        case 'file-markup':
          pm.loadFile(vm.attrs.target).then(function(text){
            pm.editing.value = text;
            pm.editing.dispatchEvent(onInputEvent);
            pm.editing.dispatchEvent(onScrollEvent);
            pm.editing.dispatchEvent(onKeyDownEvent);
          });
        break;
        case 'markup':
          pm.editing.value = document.getElementById(vm.attrs.target).innerHTML;// @Error: tab problem
          pm.editing.dispatchEvent(onInputEvent);
          pm.editing.dispatchEvent(onScrollEvent);
          pm.editing.dispatchEvent(onKeyDownEvent); 
        break;  
        case 'script-markup':
          pm.editing.value = document.getElementById(vm.attrs.target).innerHTML;// @Error: tab problem
          pm.editing.dispatchEvent(onInputEvent);
          pm.editing.dispatchEvent(onScrollEvent);
          pm.editing.dispatchEvent(onKeyDownEvent);
        break;
        default:
          // highlight code present inside <pre><code> 
          pm.editing.value = vm.attrs.innerContent;
          pm.editing.dispatchEvent(onInputEvent);
          pm.editing.dispatchEvent(onScrollEvent);
          pm.editing.dispatchEvent(onKeyDownEvent);
        break;
      };
    }
  
    function previewResult(){
      const right = el.getElementsByClassName('right')[0];
      var previewText = pm.editing.value;
      if(vm.attrs.languageType === 'js'){
        previewText = "<html><head></head><body id='root'><script>"+pm.editing.value+"</script></body></html>";
      } else if(vm.attrs.languageType === 'css'){
        previewText = "<html><head></head><body id='root'><style>"+pm.editing.value+"</style></body></html>";
      }  
      // pm.preview.innerHTML = pm.editing.value; replacing this with iFrame for acheiving scoping of js and css - rahul
      var ifr = document.createElement("iframe");
      ifr.setAttribute("frameborder", "0");
      ifr.setAttribute("id", "iframeResult");
      ifr.setAttribute("name", "iframeResult");  
      ifr.setAttribute("allowfullscreen", "true");  
  
      pm.preview.innerHTML = "";
      pm.preview.appendChild(ifr);
  
      var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
      ifrw.document.open();
      ifrw.document.write(previewText);
      ifrw.onerror = function (msg, url, lineNo, columnNo, error) { 
        vm.attrs.errorResponse.status = true;
        vm.attrs.errorResponse.type = "error";
        vm.attrs.errorResponse.msg = {msg, url, lineNo, columnNo, error};
        pm.isValid(); 
      }  
      ifrw.document.close();
      //23.02.2016: contentEditable is set to true, to fix text-selection (bug) in firefox.
      //(and back to false to prevent the content from being editable)
      //(To reproduce the error: Select text in the result window with, and without, the contentEditable statements below.)  
      if (ifrw.document.body && !ifrw.document.body.isContentEditable) {
        ifrw.document.body.contentEditable = true;
        ifrw.document.body.contentEditable = false;
      }
      right.classList.remove('hidden');
    }
  
    function isValid(){
      if(vm.attrs.errorResponse.status){
        pm.taskManager({task:'errorhandler', status:'done'}); // added by Rahul
        return false;
      } else if(vm.attrs.errorResponse.type === "warn"){
        pm.taskManager({task:'errorhandler', status:'done'});
      }
      return true;
    }
  
    function taskManager(thread){
      //rahul think later to make it conditionless (function curry so that one line can execute multiple true/false condition) and flexible
      if(thread.task === "update"){
        if(vm.attrs.isPreview  === "true"){
          pm.previewResult();
        }
      }
      if(thread.task === "errorhandler"){
        if(vm.attrs.errorResponse.type === "error"){
          console.error(vm.attrs.errorResponse.msg);
        }
        if(vm.attrs.errorResponse.type === "warn"){
          console.warn(vm.attrs.errorResponse.msg);
        }
      }
    }
  }
  function LiveBoard(element){
    // public
    const vm = this;
  
    // private
    const el = element;
    
    (function init(){
      vm.attrs = new Object();
      vm.attrs.languageType = el.getAttribute('language');// mandatory for language-<languageType> in code for look n feel as well as preview
      vm.attrs.isPreview = el.getAttribute('preview');// not mandatory
      vm.attrs.execution = el.getAttribute('execution');// mandatory file-markup | markup | script-markup
      vm.attrs.target = el.getAttribute('target');// mandatory in case of execution == file-markup
      vm.attrs.style = el.getAttribute('style');// not mandatory
      vm.attrs.innerContent = el.innerHTML;
      vm.attrs.errorResponse = {status: false, type: "", msg: ""}; //@Format: {status: true/false, type: "warn/error", msg: ""}; 
      //Error handling regarding edify attributes
      if(!validateEdifyParameters(el)){
        buildBlankLiveBoardModule();
        return false;
      } 
      buildLiveBoardModule();
    })();
  
    function validateEdifyParameters(el){
      //Validate for empty and undefined parameters
      const attrs = vm.attrs;
      if(!attrs.languageType){
        attrs.errorResponse.status = true;
        attrs.errorResponse.type = "error";
        attrs.errorResponse.msg = '<edify language="language attribute is empty or undefined! assign HTML/JS/CSS as language" ...></edify> ' + '\n @Read Edify documentation for further information';
        return false;
      }
      if(attrs.execution){
        if(!attrs.target){
          attrs.errorResponse.status = true;
          attrs.errorResponse.type = "error";
          attrs.errorResponse.msg = '<edify language="target attribute is empty or undefined! assign file path or markup id as per the execution given" ...></edify>' + '\n @Read Edify documentation for further information';
          return false;
        }
      }
      if(!attrs.execution){
        if(!attrs.innerContent){
          attrs.errorResponse.status = true;
          attrs.errorResponse.type = "error";
          attrs.errorResponse.msg = '<edify execution="if execution is empty or undefined! there should be some content inside edify element" ...></edify>' + '\n @Read Edify documentation for further information';
          return false;
        }
      }
      if(!attrs.isPreview){
        attrs.errorResponse.type = "warn";
        attrs.errorResponse.msg = '<edify preview="preview is empty or undefined! try setting it upto true for seeing preview of editor" ...></edify>' + '\n @Read Edify documentation for further information';
      }
      return true;
    }
  
    function buildBlankLiveBoardModule(){
      const liveboard_el = document.createElement('div');
      liveboard_el.setAttribute('class', 'live-board');
      el.replaceWith(liveboard_el);
      vm.liveBoard = liveboard_el;
    }
  
    function buildLiveBoardModule(){
      /*Template:
      <div class="live-board">
        <div class="left">
          <header>
            <div class="cell1" rahul="dynamic on the basis of language type">js</div>
            <div class="cell2">@Edify</div>
          </header>
          <!-- <textarea placeholder="Enter HTML Source Code" id="editing" spellcheck="false" oninput="update(this.value, event); sync_scroll(this);" onscroll="sync_scroll(this);" onkeydown="check_tab(this, event);"></textarea> -->
          <div class="editor">
            <textarea placeholder="Enter HTML Source Code" class="editing" spellcheck="false"></textarea>
            <pre class="highlighting" aria-hidden="true">
            <code class="language-html highlighting-content">
            </code>
            </pre>
          </div>
        </div>
        <div class="right hidden">
          <header>Result</header>
          <div class="preview"></div>
        </div>
      </div> 
      */
      const liveBoard = buildLiveBoardElement();
      el.replaceWith(liveBoard);
      vm.liveBoard = liveBoard;
  
    }
  
    function buildLiveBoardElement(){
      // <div class="live-board"></div>
      const liveboard_el = document.createElement('div');
      liveboard_el.setAttribute('class', 'live-board');
      if(vm.attrs.style){
        liveboard_el.setAttribute('style', vm.attrs.style);
      }
      liveboard_el.appendChild(buildLeftElement());
      liveboard_el.appendChild(buildRightElement());
      return liveboard_el;
    }
  
    function buildLeftElement(){
      //<div class="left">
      const left_el = document.createElement('div');
      left_el.setAttribute('class','left');
      left_el.appendChild(buildHeaderElement());
      left_el.appendChild(buildEditorElement());
      return left_el;
    }
  
    function buildHeaderElement(){
      /*<header>
          <div class="cell1">JS/HTML/CSS</div>
          <div class="cell2">@Edify</div>
        </header> */
      const header_el = document.createElement('header');
      const cell1_el = document.createElement('div');
      const cell2_el = document.createElement('div');
      cell1_el.setAttribute('class','cell1');
      cell1_el.innerText = vm.attrs.languageType;
      cell2_el.setAttribute('class','cell2');
      cell2_el.innerText = "@Edify";
      header_el.appendChild(cell1_el);
      header_el.appendChild(cell2_el);
      return header_el;    
    }
  
    function buildEditorElement(){
      /*<div class="editor">
          <textarea placeholder="Enter HTML Source Code" class="editing" spellcheck="false"></textarea>
          <pre class="highlighting" aria-hidden="true">
            <code class="language-html highlighting-content">
            </code>
          </pre>
        </div> 
      */
      const editor_el = document.createElement('div');
      const editing_el = document.createElement('textarea');
      const highlighting_el = document.createElement('pre');
      const highlightingContent_el = document.createElement('code');
      editor_el.setAttribute('class', 'editor');
      editing_el.setAttribute('class', 'editing');
      editing_el.setAttribute('placeholder', 'Write source code HTML | JS | CSS');
      editing_el.setAttribute('spellcheck', 'false');
      highlighting_el.setAttribute('class', 'highlighting');
      highlighting_el.setAttribute('aria-hidden', 'true');
      highlightingContent_el.setAttribute('class', 'highlighting-content language-' + vm.attrs.languageType);
      highlighting_el.appendChild(highlightingContent_el);
      editor_el.appendChild(editing_el);
      editor_el.appendChild(highlighting_el);
      return editor_el;
    }
  
    function buildRightElement(){
      /*<div class="right hidden">
        <header>Result</header>
        <div class="preview"></div>
      </div> */
      const right_el = document.createElement('div');
      const header_el = document.createElement('header');
      const preview_el = document.createElement('div');
      right_el.setAttribute('class','right hidden');
      header_el.innerText = "Result";
      preview_el.setAttribute('class','preview');
      right_el.appendChild(header_el);
      right_el.appendChild(preview_el);
      return right_el;
    }
  }
  
  (function init(){   
    const edifys = document.getElementsByTagName('edify');
    const liveBoards = [];
    let i = 0;
    while(edifys.length) {
      liveBoards[i] = {};
      liveBoards[i].edify = new Edify(edifys[i]);
      liveBoards[i].edify.run();
    }
  })();
})()
