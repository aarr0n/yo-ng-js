import <%= name.pascal %> from './<%= name.lower %>.<%= choice %>'

angular
  .module('<%= moduleName %>')
  .<%= choice %>('<%= name.camel %>', <%= name.pascal %>)
