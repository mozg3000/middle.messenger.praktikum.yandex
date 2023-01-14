import { LengthRule, RegExRule, RequireRule } from '../../../lib/validators';

const ruleSet = {
  login: [
    new RequireRule(),
    new LengthRule(3, {min: 'Слишком короткое имя'}),
    new RegExRule(/^[A-Za-zА-Яа-я]/, {contain: 'Должен начинаться с букв'}, true),
    new RegExRule(/^\w*([&%$~^\[\]{}?#@\*\(\)=!\/\/]*)\w*$/, {notContain: 'Содержит недопустимые символы'}) // eslint-disable-line
  ],
  password: [
    new RequireRule(),
    new LengthRule(8, {min: 'Слишком короткий пароль'})
  ]
}
export { ruleSet }
