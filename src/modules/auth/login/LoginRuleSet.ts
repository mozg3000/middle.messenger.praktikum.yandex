import { LengthRule, RegExRule, RequireRule } from '../../../lib/validators';

const ruleSet = {
  login: [
    new RequireRule(),
    new LengthRule(3, { min: 'Слишком короткое имя', max: '' }),
    new RegExRule(/^[A-Za-zА-Яа-я]/, {
      contain: 'Должен начинаться с букв',
      max: '',
      min: '',
      notContain: ''
    }, true),
    new RegExRule(/^\w*([&%$~^\[\]{}?#@\*\(\)=!\/\/]*)\w*$/, {
      notContain: 'Содержит недопустимые символы',
      max: '',
      min: '',
      contain: '',
    }) // eslint-disable-line
  ],
  password: [
    new RequireRule(),
    new LengthRule(8, {
      min: 'Слишком короткий пароль',
      max: ''
    })
  ]
}
export { ruleSet }
