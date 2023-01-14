import { LengthRule, RegExRule, RequireRule } from '../../../lib/validators';

const ruleSet = {
  email: [
    new RequireRule(),
    new RegExRule(/^[A-Za-zА-Яа-я]/, {contain: 'Не валидный почтовый адрес'}, true),
    new RegExRule(/^\w*@\w*\.\w/, {contain: 'Не валидный почтовый адрес'}, true),
    new RegExRule(/^\w*([&%$~^\[\]{}?#\*\(\)=!\/\/]*)\w*$/, {notContain: 'Не валидный почтовый адрес'}) // eslint-disable-line
  ],
  login: [
    new RequireRule(),
    new LengthRule(3, {min: 'Слишком короткое имя'}),
    new RegExRule(/^[A-Za-zА-Яа-я]/, {contain: 'Должен начинаться с букв'}, true),
    new RegExRule(/^\w*([&%$~^\[\]{}?#@\*\(\)=!\/\/]*)\w*$/, {notContain: 'Содержит недопустимые символы'}) // eslint-disable-line
  ],
  first_name: [
    new RequireRule(),
    new RegExRule(/^[A-ZА-Я]/, {contain: 'Должен начинаться с заглавных букв'}, true),
    new RegExRule(/^\w*([&%$~^\[\]{}?#@\*\(\)=!\/\/]*)\w*$/, {notContain: 'Содержит недопустимые символы'}) // eslint-disable-line
  ],
  second_name: [
    new RequireRule(),
    new RegExRule(/^[A-ZА-Я]/, {contain: 'Должен начинаться с заглавных букв'}, true),
    new RegExRule(/^\w*([&%$~^\[\]{}?#@\*\(\)=!\/\/]*)\w*$/, {notContain: 'Содержит недопустимые символы'}) // eslint-disable-line
  ],
  phone: [
    new RequireRule(),
    new RegExRule(/^\+?7[0-9]*/, {contain: 'Должен содержать только цифры и начинаться с +7'}, true),
    new RegExRule(/^\+?7[0-9]*([\w\.&%$~^\[\]{}?#@\*\(\)=!\/\/]*)[0-9]*$/, {notContain: 'Должен содержать только цифры'}), // eslint-disable-line
    new LengthRule(10, {min: 'Должен быть не меньше 11 цифр', max: 'Должен быть не больше 15 цифр'}, 15)
  ],
  password: [
    new RequireRule(),
    new LengthRule(8, {min: 'Слишком короткий пароль', max: 'Слишком длинный пароль'}, 40)
  ],
  password_repeat: [
    new RequireRule(),
    new LengthRule(8, {min: 'Слишком короткий пароль', max: 'Слишком длинный пароль'}, 40)
  ]
}
export { ruleSet }
