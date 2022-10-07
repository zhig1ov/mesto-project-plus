const DEFAULT_USER_NAME = 'Жак-Ив Кусто';
const DEFAULT_USER_ABOUT = 'Исследователь';
const DEFAULT_USER_AVATAR = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

const SECRET_KEY = 'secret-key';

// eslint-disable-next-line no-useless-escape
const linkRegex = /https?:\/\/(www\.)?([\w\-]{1,}\.)([\w\.~:\/\?#\[\]@!\$&'\(\)\*\+,;=\-]{2,})#?/;

export {
  DEFAULT_USER_NAME, DEFAULT_USER_ABOUT, DEFAULT_USER_AVATAR, SECRET_KEY, linkRegex
};
