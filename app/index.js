const changeCase = require('change-case')
const Generator = require('yeoman-generator')
const fs = require('fs')
const find = require('lodash.find')

const CHOICES = [
  {
    name: 'Component',
    value: 'component',
    templates: ['component', 'controller', 'view']
  },
  {
    name: 'Directive',
    value: 'directive',
    templates: ['directive', 'controller', 'view']
  },
  { name: 'Controller', value: 'controller', templates: ['controller'] },
  { name: 'Service', value: 'service', templates: ['service'] },
  { name: 'Filter', value: 'filter', templates: ['filter'] }
]

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)
  }

  /**
   * Yeoman prompting.
   *
   * @method prompting
   */
  prompting () {
    this._showQuestions().then(answers => this._evaluateAnswers(answers))
  }

  /**
   * Show the required questions.
   *
   * @private
   * @method _showQuestions
   *
   * @return {Array} Prompts
   */
  _showQuestions () {
    return this.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Generate?',
        choices: CHOICES
      },
      {
        type: 'input',
        name: 'name',
        message: 'Name?'
      },
      {
        type: 'confirm',
        name: 'addModule',
        message: 'Add Module?',
        default: true
      },
      {
        when: ({ addModule }) => addModule,
        type: 'input',
        name: 'appName',
        message: 'Angular App Name?',
        store: true
      }
    ])
  }

  /**
   * Evaluate the responses.
   *
   * @private
   * @method _evaluateAnswers
   *
   * @param {Object} answers
   *
   *        @param {String} choice
   *                The chosen item, component, directive etc.
   *
   *        @param {String} name
   *               The name to give the chosen item.
   *
   *        @param {Boolean} addModule
   *               Whether or not to add an Angular module.
   *
   *        @param {String} [appName]
   *              The Angular application name to use with the Angular module
   */
  _evaluateAnswers ({ choice, name, addModule, appName }) {
    const data = {
      name: {
        pascal: changeCase.pascalCase(name),
        lower: changeCase.lowerCase(name),
        ucFirst: changeCase.upperCaseFirst(name),
        camel: changeCase.camel(name)
      },
      choice,
      appName
    }

    const fsName = data.name.lower

    if (!fs.existsSync(fsName)) {
      fs.mkdirSync(fsName)
    }

    let templates = find(CHOICES, { value: choice }).templates
    if (addModule) {
      templates = templates.concat('module')
    }

    templates.forEach(template => this._generateFile(template, data, `./${fsName}`))
  }

  /**
   * Copy the template file with the required data.
   *
   * @private
   * @method _generateFile
   *
   * @param {String} template
   *        The required template
   *
   * @param {Object} data
   *        Data to pass to the template
   *
   * @param {String} path
   *        The path for the created item
   */
  _generateFile (template, data, path = './') {
    const ext = template === 'view' ? 'html' : 'js'
    const templateFilename = `${template}.${ext}`
    let dest = `${path}/${data.name.lower}`

    if (template !== 'module' && template !== 'view') {
      dest = `${dest}.${templateFilename}`
    } else {
      dest = `${dest}.${ext}`
    }

    this.fs.copyTpl(
      this.templatePath(templateFilename),
      this.destinationPath(dest),
      data
    )
  }
}
