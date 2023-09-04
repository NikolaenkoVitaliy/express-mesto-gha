const STATUS_OK = 200;
const STATUS_CREATED = 201;

const regexLink = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = {
  STATUS_OK,
  STATUS_CREATED,
  regexLink,
};
