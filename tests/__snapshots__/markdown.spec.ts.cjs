exports[`Markdown > parse markdown with GFM syntax 1`] = `"<h1 id=\\"gfm\\"><a aria-hidden=true tabindex=-1 href=\\"#gfm\\"><span class=\\"icon icon-link\\"></span></a>GFM</h1>
<h2 id=\\"autolink-literals\\"><a aria-hidden=true tabindex=-1 href=\\"#autolink-literals\\"><span class=\\"icon icon-link\\"></span></a>Autolink literals</h2>
<p><a href=\\"http://www.example.com\\">www.example.com</a>, <a href=\\"https://example.com\\">https://example.com</a>, and <a href=\\"mailto:contact@example.com\\">contact@example.com</a>.</p>
<h2 id=\\"footnote\\"><a aria-hidden=true tabindex=-1 href=\\"#footnote\\"><span class=\\"icon icon-link\\"></span></a>Footnote</h2>
<p>A note<sup><a href=\\"#user-content-fn-1\\" id=\\"user-content-fnref-1\\" data-footnote-ref=\\"undefined\\" aria-describedby=\\"footnote-label\\">1</a></sup></p>
<h2 id=\\"strikethrough\\"><a aria-hidden=true tabindex=-1 href=\\"#strikethrough\\"><span class=\\"icon icon-link\\"></span></a>Strikethrough</h2>
<p><del>one</del> or <del>two</del> tildes.</p>
<h2 id=\\"table\\"><a aria-hidden=true tabindex=-1 href=\\"#table\\"><span class=\\"icon icon-link\\"></span></a>Table</h2>
<table>
<thead>
<tr>
<th>a</th>
<th align=\\"left\\">b</th>
<th align=\\"right\\">c</th>
<th align=\\"center\\">d</th>
</tr>
</thead>
</table>
<h2 id=\\"tasklist\\"><a aria-hidden=true tabindex=-1 href=\\"#tasklist\\"><span class=\\"icon icon-link\\"></span></a>Tasklist</h2>
<ul class=\\"contains-task-list\\">
<li class=\\"task-list-item\\"><input type=\\"checkbox\\" checked=\\"undefined\\" disabled=\\"undefined\\"/> to do</li>
<li class=\\"task-list-item\\"><input type=\\"checkbox\\" checked=\\"undefined\\" disabled=\\"undefined\\"/> done</li>
</ul>
<section data-footnotes=\\"undefined\\" class=\\"footnotes\\"><h2 class=\\"sr-only\\" id=\\"footnote-label\\"><a aria-hidden=true tabindex=-1 href=\\"#footnote-label\\"><span class=\\"icon icon-link\\"></span></a>Footnotes</h2>
<ol>
<li id=\\"user-content-fn-1\\">
<p>Big note. <a href=\\"#user-content-fnref-1\\" data-footnote-backref=\\"\\" aria-label=\\"Back to reference 1\\" class=\\"data-footnote-backref\\">↩</a></p>
</li>
</ol>
</section>"`

exports[`Markdown > parse markdown from raw contents 1`] = `"<h1 id=\\"gfm\\"><a aria-hidden=true tabindex=-1 href=\\"#gfm\\"><span class=\\"icon icon-link\\"></span></a>GFM</h1>
<h2 id=\\"autolink-literals\\"><a aria-hidden=true tabindex=-1 href=\\"#autolink-literals\\"><span class=\\"icon icon-link\\"></span></a>Autolink literals</h2>
<p><a href=\\"http://www.example.com\\">www.example.com</a>, <a href=\\"https://example.com\\">https://example.com</a>, and <a href=\\"mailto:contact@example.com\\">contact@example.com</a>.</p>
<h2 id=\\"footnote\\"><a aria-hidden=true tabindex=-1 href=\\"#footnote\\"><span class=\\"icon icon-link\\"></span></a>Footnote</h2>
<p>A note<sup><a href=\\"#user-content-fn-1\\" id=\\"user-content-fnref-1\\" data-footnote-ref=\\"undefined\\" aria-describedby=\\"footnote-label\\">1</a></sup></p>
<h2 id=\\"strikethrough\\"><a aria-hidden=true tabindex=-1 href=\\"#strikethrough\\"><span class=\\"icon icon-link\\"></span></a>Strikethrough</h2>
<p><del>one</del> or <del>two</del> tildes.</p>
<h2 id=\\"table\\"><a aria-hidden=true tabindex=-1 href=\\"#table\\"><span class=\\"icon icon-link\\"></span></a>Table</h2>
<table>
<thead>
<tr>
<th>a</th>
<th align=\\"left\\">b</th>
<th align=\\"right\\">c</th>
<th align=\\"center\\">d</th>
</tr>
</thead>
</table>
<h2 id=\\"tasklist\\"><a aria-hidden=true tabindex=-1 href=\\"#tasklist\\"><span class=\\"icon icon-link\\"></span></a>Tasklist</h2>
<ul class=\\"contains-task-list\\">
<li class=\\"task-list-item\\"><input type=\\"checkbox\\" checked=\\"undefined\\" disabled=\\"undefined\\"/> to do</li>
<li class=\\"task-list-item\\"><input type=\\"checkbox\\" checked=\\"undefined\\" disabled=\\"undefined\\"/> done</li>
</ul>
<section data-footnotes=\\"undefined\\" class=\\"footnotes\\"><h2 class=\\"sr-only\\" id=\\"footnote-label\\"><a aria-hidden=true tabindex=-1 href=\\"#footnote-label\\"><span class=\\"icon icon-link\\"></span></a>Footnotes</h2>
<ol>
<li id=\\"user-content-fn-1\\">
<p>Big note. <a href=\\"#user-content-fnref-1\\" data-footnote-backref=\\"\\" aria-label=\\"Back to reference 1\\" class=\\"data-footnote-backref\\">↩</a></p>
</li>
</ol>
</section>"`

exports[`Markdown > parse markdown with MDC syntax 1`] = `"<h1 id=\\"mdc-document\\"><a aria-hidden=true tabindex=-1 href=\\"#mdc-document\\"><span class=\\"icon icon-link\\"></span></a>MDC document</h1>
<p>A simple <span class=\\"inline-component\\"></span></p>
<p>How to say <span class=\\"hello\\">Hello</span>-world in Markdown</p>
<div class=\\"card\\"><p>The content of the card</p></div>
<p>Hello <span class=\\"bg-blue-500\\">World</span>!</p>
<select>    <option value=\\"Nuxt\\">
      Nuxt
    </option>    <option value=\\"Vue\\">
      Vue
    </option>    <option value=\\"React\\">
      React
    </option></select>
<div class=\\"card\\">
  <div>
    <span class=\\"iconify-IconNuxt\\"></span>
    <h1>
      Nuxt Architecture.
    </h1>
  </div>
  <p>
    Harness the full power of Nuxt and the Nuxt ecosystem.
  </p>
</div>"`

exports[`Markdown > parse markdown components with slots 1`] = `"<section>
  <h1 class=\\"text-4xl\\"><p>My Page Title</p>  </h1><p>This will be rendered inside the <code>description</code> slot.</p></section>"`

exports[`Markdown > parse yaml frontmatter 1`] = `"<p>
Hello world</p>
<select>    <option value=\\"AdonisJS\\">
      AdonisJS
    </option>    <option value=\\"Lucid\\">
      Lucid
    </option>    <option value=\\"VineJS\\">
      VineJS
    </option></select>"`

exports[`Markdown > parse codeblocks for line highlights, title, and diff markers 1`] = `"<h2 id=\\"codeblocks\\"><a aria-hidden=true tabindex=-1 href=\\"#codeblocks\\"><span class=\\"icon icon-link\\"></span></a>Codeblocks</h2>
<pre class=\\"shiki material-theme-palenight has-diff has-highlighted\\" style=\\"background-color:#292D3E;color:#babed8\\" tabindex=0 title=\\"start/routes.ts\\"><code><span class=\\"line\\"><span style=\\"color:#89DDFF;font-style:italic\\">import</span><span style=\\"color:#BABED8\\"> router </span><span style=\\"color:#89DDFF;font-style:italic\\">from</span><span style=\\"color:#89DDFF\\"> &#x27;</span><span style=\\"color:#C3E88D\\">@adonisjs/core/services/router</span><span style=\\"color:#89DDFF\\">&#x27;</span></span>
<span class=\\"line\\"><span style=\\"color:#89DDFF;font-style:italic\\">import</span><span style=\\"color:#89DDFF\\"> {</span><span style=\\"color:#BABED8\\"> middleware</span><span style=\\"color:#89DDFF\\"> }</span><span style=\\"color:#89DDFF;font-style:italic\\"> from</span><span style=\\"color:#89DDFF\\"> &#x27;</span><span style=\\"color:#C3E88D\\">#start/kernel</span><span style=\\"color:#89DDFF\\">&#x27;</span></span>
<span class=\\"line diff add\\"><span style=\\"color:#C792EA\\">const</span><span style=\\"color:#BABED8\\"> SessionController </span><span style=\\"color:#89DDFF\\">=</span><span style=\\"color:#89DDFF\\"> ()</span><span style=\\"color:#C792EA\\"> =&gt;</span><span style=\\"color:#89DDFF\\"> import</span><span style=\\"color:#BABED8\\">(</span><span style=\\"color:#89DDFF\\">&#x27;</span><span style=\\"color:#C3E88D\\">#controllers/session_controller</span><span style=\\"color:#89DDFF\\">&#x27;</span><span style=\\"color:#BABED8\\">) </span></span>
<span class=\\"line\\"></span>
<span class=\\"line\\"><span style=\\"color:#BABED8\\">router</span></span>
<span class=\\"line\\"><span style=\\"color:#89DDFF\\">  .</span><span style=\\"color:#82AAFF\\">group</span><span style=\\"color:#BABED8\\">(</span><span style=\\"color:#89DDFF\\">()</span><span style=\\"color:#C792EA\\"> =&gt;</span><span style=\\"color:#89DDFF\\"> {</span></span>
<span class=\\"line highlighted\\"><span style=\\"color:#BABED8\\">    router</span><span style=\\"color:#89DDFF\\">.</span><span style=\\"color:#82AAFF\\">get</span><span style=\\"color:#F07178\\">(</span><span style=\\"color:#89DDFF\\">&#x27;</span><span style=\\"color:#C3E88D\\">/login</span><span style=\\"color:#89DDFF\\">&#x27;</span><span style=\\"color:#89DDFF\\">,</span><span style=\\"color:#F07178\\"> [</span><span style=\\"color:#BABED8\\">SessionController</span><span style=\\"color:#89DDFF\\">,</span><span style=\\"color:#89DDFF\\"> &#x27;</span><span style=\\"color:#C3E88D\\">store</span><span style=\\"color:#89DDFF\\">&#x27;</span><span style=\\"color:#F07178\\">]) </span></span>
<span class=\\"line\\"><span style=\\"color:#89DDFF\\">  }</span><span style=\\"color:#BABED8\\">)</span></span>
<span class=\\"line diff remove\\"><span style=\\"color:#89DDFF\\">  .</span><span style=\\"color:#82AAFF\\">use</span><span style=\\"color:#BABED8\\">(middleware</span><span style=\\"color:#89DDFF\\">.</span><span style=\\"color:#82AAFF\\">auth</span><span style=\\"color:#BABED8\\">()) </span></span></code></pre>"`

exports[`Markdown > generate toc 1`] = `"<ul>
<li><a href=\\"#autolink-literals\\">Autolink literals</a></li>
<li><a href=\\"#footnote\\">Footnote</a></li>
<li><a href=\\"#strikethrough\\">Strikethrough</a></li>
<li><a href=\\"#table\\">Table</a></li>
<li><a href=\\"#tasklist\\">Tasklist</a></li>
</ul>"`

exports[`Markdown > parse markdown with HTML 1`] = `"<table>
  <thead>
      <tr>
          <th width=40px>Rank</th>
          <th width=220px>Filename</th>
          <th>Notes</th>
      </tr>
  </thead>
  <tbody>
      <tr>
          <td>1st</td>
          <td><code>.env.[NODE_ENV].local</code></td>
          <td>
          Loaded for the current <code>NODE_ENV</code>. For example, if the <code>NODE_ENV</code> is set to <code>development</code>, then the <code>.env.development.local</code> file will be loaded.
          </td>
      </tr>
      <tr>
          <td>2nd</td>
          <td><code>.env.local</code></td>
          <td>Loaded in all the environments except the <code>test</code> and <code>testing</code> environments</td>
      </tr>
      <tr>
          <td>3rd</td>
          <td><code>.env.[NODE_ENV]</code></td>
          <td>
          Loaded for the current <code>NODE_ENV</code>. For example, if the <code>NODE_ENV</code> is set to <code>development</code>, then the <code>.env.development</code> file will be loaded.
          </td>
      </tr>
      <tr>
          <td>4th</td>
          <td><code>.env</code></td>
          <td>Loaded in all the environments. You should add this file to <code>.gitignore</code> when storing secrets inside it.</td>
      </tr>
  </tbody>
</table>"`

