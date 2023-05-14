const { celebrate, Joi } = require('celebrate')
const { BAD_REQUEST, StatusCodeError } = require('../utils/errors')

const reIsUrl =
  /^(https?:\/\/)(www\.)?(?!-)[-a-zA-Z0-9@:%._~#=]{1,249}(?<!-)\.[A-Za-z]{2,6}([-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]*)#?$/

const validationUrl = (url) => {
  if (reIsUrl.test(url)) {
    return url
  }
  throw new StatusCodeError(BAD_REQUEST)
}

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('Поле email должно быть заполнено'),
    password: Joi.string()
      .required()
      .min(8)
      .message('Поле пароль должно быть заполнено'),
  }),
})

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validationUrl),
    email: Joi.string()
      .required()
      .email()
      .message('Поле email должно быть заполнено'),
    password: Joi.string()
      .required()
      .min(8)
      .message('Поле пароль должно быть заполнено'),
  }),
})

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .message(
        'Имя пользователя должно быть заполнено и содержать не менее 2 и не более 30 миволов'
      ),
    about: Joi.string()
      .required()
      .min(2)
      .max(30)
      .message(
        'Информация о пользователе должна быть заполнена и содержать не менее 2 и не более 30 миволов'
      ),
  }),
})

const validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .custom(validationUrl)
      .message('Введите корректный URL картинки'),
  }),
})

const validationId = (schema = 'cardId') =>
  celebrate({
    params: Joi.object().keys({
      [schema]: Joi.string().required().hex().length(24),
    }),
  })

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validationUrl),
  }),
})

module.exports = {
  validationLogin,
  validationCreateUser,
  validationUpdateUser,
  validationUpdateAvatar,
  validationId,
  validationCreateCard,
  reIsUrl,
}
