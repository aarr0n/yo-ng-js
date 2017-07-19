import <%= name.pascal %> from './<%= name.lower %>.<%= choice %>'

angular
  .module('<%= appName %>')
  .<%= choice %>('<%= name.camel %>', <%= name.pascal %>)
