const buildResponse = (code, message, data) => {
  let res = {
    code: code,
    message: message,
    data: data,
  };

  return res;
};

module.exports = { buildResponse };
