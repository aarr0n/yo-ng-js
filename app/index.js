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
    const requestedOptions = this._getRequestedOptions()

    if (!this._hasValidOptions(requestedOptions)) {
      return
    }

    this._showQuestions(requestedOptions).then(answers =>
      this._evaluateAnswers(answers)
    )
  }

  /**
   * Validates the provided options.
   *
   * @private
   * @method _hasValidOptions
   *
   * @param {Object} requestedOptions
   *
   * @return {Boolean} True if the options are valid, false otherwise.
   */
  _hasValidOptions (requestedOptions) {
    if (
      requestedOptions.choice &&
      !find(CHOICES, { value: requestedOptions.choice })
    ) {
      this.log(`😭  I don’t know about "${requestedOptions.choice}".`)
      return false
    }

    return true
  }

  /**
   * Get the requested options that may of been passed as arguments.
   *
   * @private
   * @method _getRequestedOptions
   *
   * @return {Object} The requested options.
   */
  _getRequestedOptions () {
    return {
      choice: this.arguments[0],
      name: this.arguments[1]
    }
  }
  /**
   * Show the required questions.
   *
   * @private
   * @method _showQuestions
   *
   * @param {Object} requestedOptions
   *        Answers to questions provided by arguments.
   *
   *        @param {String} [requestedOptions.choice]
   *               What to create
   *
   *        @param {String} [requestedOptions.name]
   *               The name of the item to be created.
   *
   * @return {Array} Prompts.
   */
  _showQuestions (requestedOptions) {
    const questions = [
      {
        when: () => !requestedOptions.choice,
        type: 'list',
        name: 'choice',
        message: 'Generate?',
        choices: CHOICES
      },
      {
        when: () => !requestedOptions.name,
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
    ]

    return this.prompt(questions).then(answers =>
      Object.assign({}, requestedOptions, answers)
    )
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

    templates.forEach(template =>
      this._generateFile(template, data, `./${fsName}`)
    )
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
